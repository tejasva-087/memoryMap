import { theme } from "../styles";

interface VerificationFallbackProp {
  verificationUrl: string;
}
function VerificationFallback({ verificationUrl }: VerificationFallbackProp) {
  return (
    <>
      <p
        style={{
          color: theme.colors.black2,
          marginBottom: theme.spacing.xs,
        }}
      >
        Button not working? Copy this link into your browser:
      </p>

      <a
        href={verificationUrl}
        style={{
          display: "block",
          wordBreak: "break-all",
          color: theme.colors.primary,
          marginBottom: theme.spacing.sm,
        }}
      >
        {verificationUrl}
      </a>

      <p
        style={{
          color: theme.colors.black2,
        }}
      >
        ⏱ Link expires in 10 minutes, If you didn't sign up, you can safely
        ignore this email.
      </p>
    </>
  );
}

export default VerificationFallback;
