import { alpha } from '@theme-ui/color';

const defaultFontStack = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Raleway',
  'Segoe UI',
  'Roboto',
  'Helvetica',
  'Arial',
  'sans-serif',
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
];

const colors = {
  yellow: [
    '#FFE664',
    '#FFD80C', //Primary
    '#E5C100',
  ],
  light: ['#FFFFFF', '#FCFCFA', '#F5F4F2', '#F0EFEB', '#EBEAE3'],
  dark: ['#D9D6C7', '#A6A28E', '#706C55', '#3D3A28', '#000000'],
};

export default {
  breakpoints: ['600px', '768px', '1024px'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  colors: {
    ...colors,
    text: colors.dark[4],
    background: colors.light[3],
    primary: colors.yellow[1],
    muted: colors.dark[0],
  },
  fonts: {
    body: defaultFontStack.join(),
    heading: 'Raleway',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 40, 64],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  letterSpacings: {
    body: 'normal',
    caps: '0.2em',
  },

  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  radii: [0, 2, 5, 10],
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    h1: {
      variant: 'text.heading',
      fontSize: 7,
      m: 0,
    },
    h2: {
      variant: 'text.heading',
      fontSize: 6,
      m: 0,
      mb: 4,
    },
    h3: {
      variant: 'text.heading',
      fontSize: 5,
      m: 0,
      mb: 3,
    },
    h4: {
      variant: 'text.heading',
      fontSize: 4,
    },
    h5: {
      variant: 'text.heading',
      fontSize: 3,
    },
    h6: {
      variant: 'text.heading',
      fontSize: 2,
    },
    a: {
      variant: 'text.heading',
      fontSize: 1,
      textTransform: 'uppercase',
      p: '4px 16px ',
      textDecoration: 'none',
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
  },
  button: {
    primary: {
      bg: 'primary',
      color: 'text',
      borderRadius: 8,
      height: 48,
      fontWeight: 700,
      fontSize: 2,
      textTransform: 'uppercase',
      border: 'transparent',
      boxShadow: `0px 2px 4px rgba(96, 97, 112, 0.16), 0px 0px 1px rgba(40, 41, 61, 0.04)`,
      '&:disabled': {
        bg: (t) => t.colors.yellow[0],
        boxShadow: (t) => `inset 0px 0.5px 4px ${t.colors.dark[1]}`,
      },
    },
  },
  // namespace variants under the theme name
  marketplace: {
    layout: {
      root: {
        color: 'text',
        lineHeight: 'body',
      },
      'h1,h2,h3,h4,h5,h6': {
        fontFamily: 'heading',
        lineHeight: 'heading',
        m: 0,
        mt: 4,
        mb: 5,
      },
    },
    table: {
      tableLayout: 'fixed',
      width: '100%',
      borderCollapse: 'collapse',
      border: '1px solid',
      borderColor: 'primary',
    },
    th: {
      backgroundColor: 'text',
      color: 'background',
    },
    'th, td': {
      border: '1px solid',
      borderColor: 'text',
      p: 3,
    },
    'tbody tr': {
      '&:nth-of-type(even)': {
        bg: alpha('primary', 0.25),
      },
    },
    code: {
      fontSize: 2,
    },
    a: {
      color: 'text',
      textDecoration: 'underline',
      textDecorationColor: 'primary',
    },
  },
};
