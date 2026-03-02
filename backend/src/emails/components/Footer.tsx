import { theme } from "../styles";

function Footer() {
  return (
    <table width="100%" style={{ color: theme.colors.black2 }}>
      <tbody>
        <tr>
          <td>© {new Date().getFullYear()} Memory Map</td>
          <td style={{ textAlign: "right" }}>
            Created by{" "}
            <a
              href="https://www.linkedin.com/in/tejasavkhandelwal/"
              style={{ color: theme.colors.primary }}
            >
              Tejasva Khandelwal
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Footer;
