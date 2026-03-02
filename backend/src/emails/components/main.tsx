import { theme } from "../styles";
import Logo from "./Logo";
import { ReactNode } from "react";

interface MainProp {
  children: ReactNode;
}

function Main({ children }: MainProp) {
  return (
    <html>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: theme.colors.white1,
          maxWidth: "425px",
          border: `1px solid ${theme.colors.white3}`,
          borderTop: `4px solid ${theme.colors.primary}`,
        }}
      >
        <Logo />
        {children}
      </body>
    </html>
  );
}

export default Main;
