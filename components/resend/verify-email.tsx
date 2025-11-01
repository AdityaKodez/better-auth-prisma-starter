
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
} from '@react-email/components';
interface VerificationProps {
    userEmail :string; 
    verificationCode:string;
}
export const AuthenticationEmail = (props:VerificationProps) => {
  const { userEmail, verificationCode } = props;
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Verify your account - Authentication required</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white mx-auto px-[40px] py-[40px] max-w-[600px] rounded-[8px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-black text-[28px] font-bold m-0 mb-[8px]">
                Account Verification
              </Heading>
              <Text className="text-gray-600 text-[16px] m-0">
                Complete your account setup
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="text-center mb-[32px]">
              <Text className="text-gray-800 text-[16px] leading-[24px] mb-[24px]">
                Hello,
              </Text>
              <Text className="text-gray-800 text-[16px] leading-[24px] mb-[24px]">
                We received a request to verify your account for <strong>{userEmail}</strong>. 
                To complete the authentication process, please use the verification code below or click the verification button.
              </Text>
              
              {/* Verification Code */}
              <Section className="bg-gray-50 border border-solid border-gray-200 rounded-[8px] py-[24px] px-[32px] mb-[32px]">
                <Text className="text-gray-600 text-[14px] m-0 mb-[8px]">
                  Your verification code:
                </Text>
                <Text className="text-black text-[32px] font-bold tracking-[8px] m-0 font-mono">
                  {verificationCode}
                </Text>
                <Text className="text-gray-500 text-[12px] m-0 mt-[8px]">
                  This code expires in 10 minutes
                </Text>
              </Section>

            
            </Section>

            <Hr className="border-gray-200 my-[32px]" />

            {/* Security Notice */}
            <Section className="text-center mb-[32px]">
              <Text className="text-gray-600 text-[14px] leading-[20px] mb-[16px]">
                <strong>Security Notice:</strong> If you didn't request this verification, 
                please ignore this email or contact our support team immediately.
              </Text>
            </Section>

            {/* Footer */}
            <Hr className="border-gray-200 my-[32px]" />
            <Section className="text-center">
              <Text className="text-gray-500 text-[12px] leading-[16px] m-0 mb-[8px]">
                Need help? Contact our support team at{' '}
                <Link href="mailto:support@company.com" className="text-black no-underline">
                  support@company.com
                </Link>
              </Text>
              <Text className="text-gray-500 text-[12px] leading-[16px] m-0 mb-[16px]">
                This is an automated message, please do not reply to this email.
              </Text>
              
              <address className="text-gray-400 text-[11px] not-italic leading-[16px] m-0 mb-[8px]">
                Your Company Name<br />
                123 Business Street, Suite 100<br />
                New York, NY 10001, United States
              </address>
              
              <Text className="text-gray-400 text-[11px] m-0">
                © {new Date().getFullYear()} Your Company Name. All rights reserved.{' '}
                <Link href="#" className="text-gray-400 no-underline">
                  Unsubscribe
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};


export default AuthenticationEmail;