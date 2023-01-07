export default {
  config: {
    initialColorModeName: "light",
  },
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: "1px solid",
      borderColor: "muted",
    },
  },
  colors: {
    cardBgColor: "#f3f3fb",
    error: "#ba1a1a",
    errorHsl: "0deg 75% 42%",
    errorContainer: "#ffdad6",
    errorContainerHsl: "6deg 100% 92%",
    text: "#333",
    onPrimary: "#ffffff",
    background: "#fbfcff",
    onBackground: "#191c1e", // 메인 텍스트 색
    surface: "#fbfcff",
    onSurface: "#191c1e",
    outline: "#71787e",
    surfaceVariant: "#dde3ea",
    onSurfaceVariant: "#41484d",
    primary: "#00668a",
    primaryContainer: "#c4e7ff",
    secondary: "#605B71",
    shadow: "#000000",
    surfaceTint: "#00668a",
    tertiary: "#615a7d",
    tertiaryHsl: "252deg 16% 42%",
    tertiaryContainer: "#e6deff",
    onTertiaryContainer: "#1d1736",
    outlineVariant: "#c0c7cd",
    modes: {
      dark: {
        cardBgColor: "#1e1f24",
        error: "#ffb4ab",
        errorHsl: "6deg 100% 84%",
        errorContainer: "#93000a",
        errorContainerHsl: "356deg 100% 29%",
        onPrimary: "#00344a",
        background: "#191c1e",
        onBackground: "#e1e2e5", // 메인 텍스트 색
        surface: "#191c1e",
        onSurface: "#e1e2e5",
        outline: "#8b9297",
        surfaceVariant: "#41484d",
        onSurfaceVariant: "#c0c7cd",
        primary: "#000000",
        primaryContainer: "#004c69",
        shadow: "#000000",
        surfaceTint: "#7cd0ff",
        tertiary: "#cac1e9",
        tertiaryHsl: "253deg 48% 84%",
        tertiaryContainer: "#494264",
        onTertiaryContainer: "#e6deff",
        outlineVariant: "#41484d",
      },
    },
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
    // a: {
    //   color: "primary",
    //   ":hover, :focus": {
    //     color: "secondary",
    //   },
    // },
    // more styles can be added as needed
  },
};
