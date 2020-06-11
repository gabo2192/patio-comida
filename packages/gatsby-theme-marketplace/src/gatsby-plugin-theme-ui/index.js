export default {
  colors: {
    primary: '#F2271F',
    secondary: '#F9C40A',
    muted: '#ccc',
    text: '#000',
    background: '#FAF7F6',
    brown: '#46210C',
    green: '#B2CB2D',
  },
  fonts: {
    body: '"San Francisco", sans-serif',
    heading: 'McLaren, sans-serif',
  },

  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      color: 'brown',
      textTransform: 'uppercase',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
    },
    h1: {
      variant: 'text.heading',
      fontSize: 5,
    },
    h2: {
      variant: 'text.heading',
      fontSize: 4,
    },
    h3: {
      variant: 'text.heading',
      fontSize: 3,
    },
    h4: {
      variant: 'text.heading',
      fontSize: 2,
    },
    h5: {
      variant: 'text.heading',
      fontSize: 1,
    },
    h6: {
      variant: 'text.heading',
      fontSize: 0,
    },
  },
  button: {
    primary: {
      bg: 'primary',
      p: '8px',
      border: (t) => `2px solid ${t.colors.primary}`,
      borderRadius: 6,
      color: 'background',
      cursor: 'pointer',
      fontSize: 17,
      fontWeight: 300,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      transition: '250ms all linear',
      ':focus, :hover': {
        borderColor: 'text',
      },
    },
    secondary: {
      bg: 'secondary',
      p: '8px',
      border: (t) => `2px solid ${t.colors.secondary}`,
      borderRadius: 6,
      color: 'black',
      cursor: 'pointer',
      fontSize: 13,
      fontWeight: 300,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      transition: '250ms all linear',
      ':focus, :hover': {
        borderColor: 'text',
      },
    },
    header: {
      bg: 'transparent',
      border: 'transparent',
      color: 'background',
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 300,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      transition: '250ms all linear',
      p: 0,

      ':focus, :hover': {
        color: 'secondary',
      },
    },
    link: {
      bg: 'primary',
      p: '8px',
      border: (t) => `2px solid ${t.colors.primary}`,
      borderRadius: 6,
      color: 'background',
      cursor: 'pointer',
      fontSize: 17,
      fontWeight: 300,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      transition: '250ms all linear',
      textDecoration: 'none',
      ':focus, :hover': {
        borderColor: 'text',
      },
    },
  },
  card: {
    primary: {
      borderRadius: 6,
      mb: '16px',
      bg: 'white',
      display: 'flex',
      flexDirection: 'column',
      color: 'text',
      boxShadow: 'rgba(223, 223, 223, 0.5) 0px 1px 2px',
      ':focus': {
        border: (t) => `1px solid ${t.colors.brown}`,
      },
      ':hover': {
        boxShadow: 'rgba(83, 83, 83, 0.5) 0px 10px 90px',
      },
    },
    shadow: {
      boxShadow: 'rgba(223, 223, 223, 0.5) 0px 1px 2px',
    },
  },
  container: {
    primary: {
      width: '90vw',
      maxWidth: 1200,
      mx: 'auto',
      height: '100%',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr'],
      mt: '16px',
      gap: '8px',
      /*  '@media screen and (min-width: 768px)': {
        gridTemplateColumns: '1fr 1fr',
      }, */
    },
  },
  form: {
    primary: {
      maxWidth: '450px',
      height: '100%',
      px: '8px',
      mx: 'auto',
      width: '100%',
      border: '1px solid rgba(0,0,0,0.1)',
      bg: 'white',
      boxShadow: '0 0 15px 1px rgba(0, 0, 0, 0.1)',
      display: 'grid',
      gridTemplateRows: 'max-content 1fr 67px',
    },
  },
};
