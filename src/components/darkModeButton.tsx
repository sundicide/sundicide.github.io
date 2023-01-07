import styled from "@emotion/styled";
import { StaticImage } from "gatsby-plugin-image";
import { useEffect, useState } from "react";
import { Button, useColorMode } from "theme-ui";

export default function DarkModeButton(props: any) {
  const [mode, setMode] = useColorMode();

  useEffect(() => {}, [mode]);

  const isDarkMode = mode === "dark";
  const StyledButton = styled.button({
    cursor: "pointer",
    position: "absolute",
    right: 0,
    marginLeft: 15,
    padding: 0,
    height: 25,
    trasnform: "translate(-100%, 0)",
    border: "none",
  });
  const Dark = () => (
    <img src="/dark-mode.png" alt="color mode button" width={25} height={25} />
  );
  const Light = () => (
    <img src="/light-mode.png" alt="color mode button" width={25} height={25} />
  );
  return (
    <StyledButton
      css={{ backgroundColor: "transparent", padding: 5 }}
      onClick={(e) => {
        const next = isDarkMode ? "light" : "dark";
        setMode(next);
      }}
      {...props}
    >
      {isDarkMode ? <Light /> : <Dark />}
    </StyledButton>
  );
}
