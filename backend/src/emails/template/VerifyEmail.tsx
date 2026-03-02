import Main from "../components/main";
import TableRow from "../components/TableRow";
import Divider from "../components/Divider";
import EmailActionSection from "../components/MainVerificationContent";
import VerificationFallback from "../components/VerificationFallback";
import Footer from "../components/Footer";
import { theme } from "../styles";

interface VerifyEmailProps {
  userName: string;
  verificationUrl: string;
}

function VerifyEmail({ userName, verificationUrl }: VerifyEmailProps) {
  return (
    <Main>
      <>
        <TableRow padding={`0 ${theme.spacing.sm} ${theme.spacing.md}`}>
          <EmailActionSection
            userName={userName}
            verificationUrl={verificationUrl}
            heading="Confirm your email address"
            message="thanks for signing up. Click the button below to verify your email and activate your account."
            linkPlaceholder="Verify Email"
          />
        </TableRow>

        <TableRow padding="0">
          <Divider />
        </TableRow>

        <TableRow padding={`${theme.spacing.md} ${theme.spacing.sm}`}>
          <VerificationFallback verificationUrl={verificationUrl} />
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

export default VerifyEmail;
