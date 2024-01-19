import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface EmailProps {
  name: string;
}

export const NESEmail = ({ name }: EmailProps) => (
  <Html>
    <Head />
    <Preview>Application details</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Img
            src="./public/logo.svg"
            alt="NES Logo"
            width="49"
            height="21"
          />
          <Hr style={hr} />
          <Text style={paragraph}>
            Dear {name}, thank you for submitting your application. You're now ready to
            join the NES team!
          </Text>
          <Hr style={hr} />
          <Text style={paragraph}>
            Here are a few improvements to your resume as recommended by our expert team of recruiters.
          </Text>
          <Text style={paragraph}>
            Formatting issues:
          </Text>
          <Text style={paragraph}>
            1. The resume is too short
            2. The resume is poorly spaced
          </Text>
          <Text style={paragraph}>
            Qualification issues:
          </Text>
          <Text style={paragraph}>
           None, good job!
          </Text>
          <Hr style={hr} />
          <Text style={paragraph}>— The NES team</Text>
          <Hr style={hr} />
          <Text style={footer}>
            NES team, Summer Hackathon CISSA
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default NESEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
