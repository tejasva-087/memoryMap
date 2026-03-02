import Main from "../components/main";
import TableRow from "../components/TableRow";
import Divider from "../components/Divider";
import EmailActionSection from "../components/MainVerificationContent";
import VerificationFallback from "../components/VerificationFallback";
import Footer from "../components/footer";
import { theme } from "../styles";

interface ResetPasswordProps {
  userName: string;
  resetUrl: string;
}

export function ResetPassword({ userName, resetUrl }: ResetPasswordProps) {
  return (
    <Main>
      <>
        <TableRow padding={`0 ${theme.spacing.sm} ${theme.spacing.md}`}>
          <EmailActionSection
            userName={userName}
            verificationUrl={resetUrl}
            heading="Password reset"
            message="tap the button below to reset your account password."
            linkPlaceholder="Reset Password"
          />
        </TableRow>

        <TableRow padding="0">
          <Divider />
        </TableRow>

        <TableRow padding={`${theme.spacing.md} ${theme.spacing.sm}`}>
          <VerificationFallback verificationUrl={resetUrl} />
        </TableRow>

        <TableRow padding="0">
          <Divider />
        </TableRow>

        <TableRow padding={`${theme.spacing.md} ${theme.spacing.sm} 0`}>
          <Footer />
        </TableRow>
      </>
    </Main>
  );
}

export default ResetPassword;
