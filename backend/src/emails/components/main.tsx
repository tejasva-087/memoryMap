import { ReactElement } from "react";
import { theme } from "../styles";
import Logo from "./Logo";
import TableRow from "./TableRow";

interface MainProp {
  children: ReactElement;
}

function Main({ children }: MainProp) {
  return (
    <html>
      <body
        style={{
          margin: 0,
          padding: theme.spacing.xs,
          backgroundColor: theme.colors.white1,
          fontSize: theme.typography.fontSizeBase,
          fontWeight: theme.typography.fontWeightBase,
          color: theme.colors.black1,
        }}
      >
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            border: `1px solid ${theme.colors.white3}`,
            borderTop: `4px solid ${theme.colors.primary}`,
            borderRadius: "4px",
            backgroundColor: theme.colors.white1,
            padding: theme.spacing.lg,
          }}
        >
          <tbody>
            <TableRow padding={theme.spacing.md}>
              <Logo />
            </TableRow>

            {children}
          </tbody>
        </table>
      </body>
    </html>
  );
}

export default Main;
