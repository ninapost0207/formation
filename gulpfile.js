const gulp            = require('gulp'),
      del             = require('del'),
      path            = require('path'),
      sass            = require('gulp-sass'),
      twig            = require('gulp-twig'),
      yargs           = require('yargs'),
      watch           = require('gulp-watch'),
      merge           = require('merge-stream'),
      gulpif          = require('gulp-if'),
      concat          = require('gulp-concat'),
      uglify          = require('gulp-uglify'),
      rename          = require('gulp-rename'),
      cached          = require('gulp-cached'),
      filter          = require('gulp-filter'),
      postcss         = require('gulp-postcss'),
      csscomb         = require('gulp-csscomb'),
      cssnano         = require('gulp-cssnano'),
      purgecss        = require('gulp-purgecss'),
      imagemin        = require('gulp-imagemin'),
      tailwindcss     = require('tailwindcss'),
      runSequence     = require('run-sequence'),
      browserSync     = require('browser-sync').create(),
      autoprefixer    = require('gulp-autoprefixer'),
      sassInheritance = require('gulp-sass-inheritance');

// SETUP
// ---------------------------------------------------------------------

const DEVELOPMENT = !!(yargs.argv.development);

// change folder structure here
const PATHS = {};
PATHS.ROOT       = '.';
PATHS.SRC        = path.join(PATHS.ROOT, 'src/');
PATHS.ASSET_DIR  = path.join(PATHS.SRC, 'assets/');

// Set source paths
const src = {
    configFolder: PATHS.ASSET_DIR + '/js/config/',
    scriptsFolder: PATHS.ASSET_DIR + '/js/',
    scripts: PATHS.ASSET_DIR + 'js/**/*.js',

    images: PATHS.ASSET_DIR + 'img/**/*',
    fonts: PATHS.ASSET_DIR + 'fonts/**/*',

    sass: PATHS.ASSET_DIR + 'scss/**/*.scss',
    sassIncludePaths: PATHS.ASSET_DIR + 'scss/includes/**/*.scss',

    templates: PATHS.SRC + 'templates/!(_)*.{html,twig}',
    templatesAndIncludes: PATHS.SRC + 'templates/**/*.{html,twig}'
};

// Set distribution paths
const dist = {
    path: 'web',
    htmlDir: 'web/frontend/',
    assetsDir: 'web/assets',
    scriptsDir: 'web/assets/js',
    imagesDir: 'web/assets/img/',
    cssDir: 'web/assets/css',
    fontsDir: 'web/assets/fonts'
};

// Task runners
gulp.task('default', (cb) => {
    runSequence('build', 'serve', 'watch', cb);
});

// Task builders
gulp.task('build', (cb) => {
    runSequence(['clean', 'sass', 'templates', 'scripts', 'vendors', 'images'], cb);
});

// TASKS
// ---------------------------------------------------------------------

// Copy fonts
gulp.task('copy-assets', (done) => {
    return gulp.src(src.fonts)
        .pipe(gulp.dest(dist.fontsDir));
});

gulp.task('style-vendors', () => {
    gulp.src([
        './node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
        './node_modules/normalize.css/normalize.css',
        './node_modules/animate.css/animate.min.css'
    ])
    .pipe(concat('vendors.css'))
    .pipe(cssnano({
        safe: true
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(cached(dist.cssDir))
    .pipe(gulp.dest(dist.cssDir));
});

gulp.task('script-vendors', (done) => {
    gulp.src([
        './node_modules/owl.carousel/dist/owl.carousel.min.js',
        './src/js/jquery.sticky.js',
    ])
    .pipe(concat('vendors.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(cached(dist.scriptsDir))
    .pipe(gulp.dest(dist.scriptsDir));
});

//Compile JS
gulp.task('scripts', () => {
    gulp.src(src.scripts)
        //.pipe(gulpif(!DEVELOPMENT, uglify()).on('error', (e) => {
        //    console.log(e);
        //}))
        .pipe(rename({suffix: '.min'}))
        .pipe(cached(dist.scriptsDir))
        .pipe(gulp.dest(dist.scriptsDir))
        .pipe(browserSync.stream());
});

//Compile Sass into css and auto-inject into browsers
gulp.task('sass', () => {
    const sassIncludeFolders = 'src/assets/scss/';

    gulp.src(src.sass)
        //filter out unchanged scss files, only works when watching
        .pipe(gulpif(global.isWatching, cached('sass')))
        //find files that depend on the files that have changed
        .pipe(sassInheritance({dir: sassIncludeFolders}))
        //filter out internal imports (folders and files starting with "_" )
        .pipe(filter(function (file) {
            return !/\/_/.test(file.path) || !/^_/.test(file.relative);
        }))
        .pipe(sass({
            includePaths: src.sassIncludePaths,
            outputStyle: 'expanded',
            errLogToConsole: true
        }).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 2 versions', 'ie >= 10'] }))
        .pipe(csscomb())
        .pipe(gulpif(!DEVELOPMENT, cssnano()))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dist.cssDir))
        .pipe(browserSync.stream());
});

//Optimize Images
gulp.task('images', () => {
    gulp.src(src.images)
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(cached(dist.imagesDir))
        .pipe(gulp.dest(dist.imagesDir));
});

//Compile HTML Templates
gulp.task('templates', () => {
    gulp.src(src.templates)
        .pipe(twig())
        .pipe(cached(dist.htmlDir))
        .pipe(gulp.dest(dist.htmlDir))
        .pipe(browserSync.stream());
});

gulp.task('serve', () => {
    browserSync.init({
        server: {
            proxy: 'local.foundation',
            reloadOnRestart: true,
            baseDir: "./web/",
            index: 'index.html',
            directory: true,
            reloadDelay: 0,
            port: 3000,
            open: true,
            notify: true

        }
    });
});


gulp.task('setWatch', () => {
    global.isWatching = true;
});

// Watch files and run tasks
gulp.task('watch', () => {
    gulp.watch(src.sass, ['setWatch', 'sass']);
    gulp.watch(src.images, ['images']);
    gulp.watch(src.templatesAndIncludes, ['templates']);
    gulp.watch(src.scripts, ['scripts']);
});

gulp.task('clean', () => {
    del.sync(dist.imagesDir);
});

gulp.task('vendors', () => {
    gulp.start('copy-assets', 'style-vendors', 'script-vendors');
});
