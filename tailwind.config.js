module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: "#000",
        white: "#fff",
        red: '#D0021B',
        gray: {
          light: '#9B9B9B',
          'light-2': '#BBBBBB',
          lighter: '#D0D0D0',
          dark: '#181818',
        },
        blue: {
          light: '#00AEEF',
          dark: '#4A90E2',
          darker: '#3367C4',

        },
      },
      fontSize: {
        '13': '13px',
        '28': '28px',
        '50': '50px',
        '40': '2.5rem',
      },
      spacing: {
        '7': '1.875rem',
        '9' : '8.75rem',
        '28' : '6.75rem',
        '45': '45px',
        '400': '25rem',
        '500': '32rem',
        '72' : '18rem',
      },
      lineHeight: {
        '45': '45px',
      },
    },
  },
  variants: {},
  plugins: [],
}
