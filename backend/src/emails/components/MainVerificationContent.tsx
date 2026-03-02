import { theme } from "../styles";

interface EmailActionSectionProps {
  userName: string;
  verificationUrl: string;
  heading: string;
  message: string;
  linkPlaceholder: string;
}

function EmailActionSection({
  userName,
  verificationUrl,
  heading,
  message,
  linkPlaceholder,
}: EmailActionSectionProps) {
  return (
    <>
      <h1
        style={{
          fontSize: theme.typography.fontSizeLg,
          marginBottom: theme.spacing.sm,
        }}
      >
        {heading}
      </h1>

      <p style={{ marginBottom: theme.spacing.md }}>
        Hi <strong>{userName}</strong>, {message}
      </p>

      <a
        href={verificationUrl}
        style={{
          display: "inline-block",
          textDecoration: "none",
          backgroundColor: theme.colors.primary,
          color: theme.colors.white1,
          padding: `${theme.spacing.sm} ${theme.spacing.md}`,
          borderRadius: theme.radius.sm,
          fontWeight: 600,
        }}
      >
        {linkPlaceholder}
      </a>
    </>
  );
}

export default EmailActionSection;
