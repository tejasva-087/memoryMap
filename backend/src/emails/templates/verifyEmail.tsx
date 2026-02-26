import React from "react";
import { Html, Body, Container, Text, Button } from "@react-email/components";

interface VerifyEmailProps {
  name: string;
  verificationUrl: string;
}

const VerifyEmail = ({ name, verificationUrl }: VerifyEmailProps) => {
  return (
    <Html>
      <Body style={{ backgroundColor: "#f4f4f4" }}>
        <Container style={{ padding: "20px", backgroundColor: "#fff" }}>
          <Text>Hi {name},</Text>
          <Text>Please verify your email by clicking below:</Text>
          <Button href={verificationUrl}>Verify Email</Button>
        </Container>
      </Body>
    </Html>
  );
};

export default VerifyEmail;
