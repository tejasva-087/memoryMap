import { theme } from "../styles";

function Divider() {
  return (
    <hr
      style={{
        border: `1px solid ${theme.colors.white3}`,
        margin: `${theme.spacing.md} 0`,
      }}
    />
  );
}

export default Divider;
