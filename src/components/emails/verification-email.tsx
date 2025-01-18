import * as React from "react";

interface EmailTemplateProps {
  verificationUrl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  verificationUrl,
}) => (
  <div>
    <h1>Welcome, {verificationUrl}!</h1>
  </div>
);
