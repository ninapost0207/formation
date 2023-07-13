(function ($) {
	$(document).ready(function(){
		$.fn.get_max_height = function() {
	        var heights = [];
	        this.each(function() {
	            $(this).css({ height: 'auto' });
	            heights.push($(this).height());
	        });

	        var maxHeight = Math.max.apply(0, heights);
	        return maxHeight;
	    }

	    $.fn.equalHeights = function(options) {

	        // This is the easiest way to have default options.
	        var heights = [];

	        this.each(function() {
	            $(this).css({ height: 'auto' });
	            heights.push($(this).height());
	        });

	        var maxHeight = Math.max.apply(0, heights);
	        this.height(maxHeight);
	    }

	    $.fn.equalHeights_inrow = function(options) {

	        // This is the easiest way to have default options.
	        var settings = $.extend({
	            // These are the defaults.
	            numItem_inrow: ""
	        }, options);

	        var tep = this.length;
	        for (var i = 0; i <= tep / settings.numItem_inrow; i++) {
	            this.slice(i * settings.numItem_inrow, i * settings.numItem_inrow + settings.numItem_inrow).equalHeights();
	        };
	    }

	    var owl = $('.slider-wrapper .owl-carousel');

		owl.owlCarousel({
			// onInitialized: addTexttoArrows,
			nav: true,
			items: 1,
			loop: false,
			dots: false,
			autoplay: false,
			autoplayTimeout: 10000,
		});

		owl.on('change.owl.carousel', function(el){
			setTimeout(function(){
				var current = document.querySelector('.slider-wrapper .owl-carousel .owl-item.active'),
					currentText = $(current).find('h2').text().toLowerCase(),
					next = $(current).next('.owl-item'),
					nextText = $(next).find('h2').text().toLowerCase(),
					prev = $(current).prev('.owl-item'),
					prevText = $(prev).find('h2').text().toLowerCase();

				$('.slider-wrapper .owl-nav .owl-prev .slide-title').text(prevText);
				$('.slider-wrapper .owl-nav .owl-next .slide-title').text(nextText);
			}, 50);
		});

		function sliderArrowTitles() {
			var secondSlide = $('.slider-wrapper .owl-item:nth-child(2)').find('h2').text().toLowerCase();

			$('.slider-wrapper .owl-nav button').each(function(){
				$(this).prepend( "<span class='slide-title'></span>" )
			});

			$('.slider-wrapper .owl-nav .owl-next .slide-title').text(secondSlide);
		}

		sliderArrowTitles();

		function showInnerSlides() {
			$('.slider-info .person-info').find('a').on('click', function(e){
				e.preventDefault();
				var el = $(this),
					elParent = el.parent(),
					elPerantItem = el.parents('.item'),
					allPersons = elPerantItem.find('.right-block .person-info'),
					dataId = elParent.data('id'),
					allPersonImages = elPerantItem.find('.left-block .person-image-wrapper');

				allPersons.removeClass('active');
				allPersonImages.removeClass('active');

				$('.slider-info .left-block').find("[data-person='" + dataId + "']").addClass('active');
				elParent.addClass('active');
			})
		};

		function tabsChanged() {
			$('.nav-tabs').find('li a').on('click', function(){
				var self = $(this),
				selfHref = self.attr('href'),
				selfParent = self.parents('li'),
				relativeParents = self.parents('.nav-tabs').find('li'),
				destinationParent = $(selfHref).parents('.tabs-info'),
				allRelativeTabs = destinationParent.find('.tab-pane');

				allRelativeTabs.removeClass('active');
				relativeParents.removeClass('active');

				$(selfHref).addClass('active');
				selfParent.addClass('active');

				return false;
			});
		}

		function imageChanges() {
			var imgs = $('.hero-block .changed-images img');
			imgs.first().addClass('show')

			setInterval(function(){
				imgs.each(function(){
					$(this).toggleClass('show');
				});
			}, 5000);
		}

		function tooltipShow() {
			var allTooltips = $('.catalogue-table .tooltip');

			$('.catalogue-table .item .triangle').on('click', function(){
				var self = $(this),
					parent = $(this).parents('.item');
				$('.catalogue-table .item').not(parent).removeClass('active');
				parent.toggleClass('active');
			});
		}

		showInnerSlides();
		tabsChanged();
		imageChanges();
		tooltipShow();

		$('.profitability-slider .owl-carousel').owlCarousel({
			nav: false,
			items: 1,
			dots: false,
			autoplay: true,
			autoplayTimeout: 5000,
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			loop: true
		});

		$('.life-formation__slider .owl-carousel').owlCarousel({
			nav: false,
			items: 1,
			dots: true,
			autoplay: true,
			autoplayTimeout: 5000,
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			loop: true
		});

		$('.employee-spotlight__slider .owl-carousel').owlCarousel({
			nav: false,
			items: 1,
			dots: true,
			autoplay: false,
			autoplayTimeout: 5000,
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			loop: true
		});

		$('.header').sticky({topSpacing:0});

		if(window.innerWidth>767) {
			$('.benefits-wrapper .img-wrap').equalHeights();
		}

        if( $('header .submenu').length) {
        	$('header .submenu').parents('li').addClass('hasChild');
        }


        if( $('header .mobile-menu .submenu').length) {
        	$('header .mobile-menu .submenu').parents('li').addClass('hasChild');
        }

        $('.mobile-menu .hasChild span').on('click', function(){
        	$('.mobile-menu .hasChild').removeClass('open');
        	$(this).parent().toggleClass('open');
        })

		$('.hamburger-menu').on('click', function(){
			$(this).toggleClass('is-active');
			$('.mobile-nav').toggleClass('is-open');
			$('body').toggleClass('blocked');
		});

		window.onresize = function(){

	        if(window.innerWidth>767) {
	            $('.benefits-wrapper .img-wrap').equalHeights();
	        }
	    } // end of onresize
	});
})(jQuery);
