export default {
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'muted',
    },
  },
  colors: {
    text: "#333",
    background: "#fff",
    primary: "#639",
    secondary: "#ff6347",
  },
  fonts: {
    body: "system-ui, sans-serif",
    heading: "system-ui, sans-serif",
    monospace: "Menlo, monospace",
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  styles: {
    // the keys used here reference elements in MDX
    h1: {
      // the style object for each element
      // can reference other values in the theme
      fontSize: 32,
      marginTop: 0,
      text: "#fff",
      marginBottom: 33,
    },
    h2: {
      fontSize: 32,
      marginTop: 0,
      text: "#fff",
      marginBottom: 33,

    },
    a: {
      color: "primary",
      ":hover, :focus": {
        color: "secondary",
      },
    },
    // more styles can be added as needed
  },
}