import { StaticImage } from "gatsby-plugin-image";
import { useEffect, useState } from "react";
import { Button, useColorMode } from "theme-ui";

export default function DarkModeButton(props: any) {
  const [mode, setMode] = useColorMode();

  const isDarkMode = mode === "dark";
  const Dark = () => (
    <StaticImage
      src="../images/dark-mode.png"
      alt="color mode button"
      width={25}
      height={25}
    />
  );
  const Light = () => (
    <StaticImage
      src="../images/light-mode.png"
      alt="color mode button"
      width={25}
      height={25}
    />
  );
  return (
    <Button
      css={{ backgroundColor: "transparent", padding: 5 }}
      onClick={(e) => {
        const next = isDarkMode ? "light" : "dark";
        setMode(next);
      }}
      {...props}
    >
      {isDarkMode ? <Dark /> : <Light />}
    </Button>
  );
}
