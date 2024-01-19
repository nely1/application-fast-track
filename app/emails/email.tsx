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
  formatting: Array<{label: string, value:string}>,
  qualifications: Array<{label: string, value:string}>,
  posting: string,
}

export const NESEmail = ({ formatting, qualifications, posting }: EmailProps) => (
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
            Dear applicant, 
            <br/>We want to express our appreciation for your interest in the {posting}. 
            <br/><br/>We carefully reviewed all applications, including yours, and we were genuinely impressed with the skills and experiences you bring to the table. 
            It was a highly competitive process, and we regret to inform you that we have chosen to move forward with another candidate whose qualifications more closely align with our current needs.
            
          </Text>
          <Hr style={hr} />
          <Text style={paragraph}>
            Here are a few improvements to your resume as recommended by our expert team of recruiters.
          </Text>
          <Text style={paragraph}>
            Formatting issues:
          </Text>
          <Text style={paragraph}>             
    
            {formatting.length > 0 ? (
              formatting.map((item, index) => (
                <Text key={index} style={paragraph}>
                  {index + 1}. {item.label}
                </Text>
              ))
            ) : (
              <Text style={paragraph}>
                No issues detected
              </Text>
            )}
  
          </Text>
          <Text style={paragraph}>
            Qualification issues:
          </Text>
          <Text style={paragraph}>
            {qualifications.length > 0 ? (
              qualifications.map((item, index) => (
                <Text key={index} style={paragraph}>
                  {index + 1}. {item.label}
                </Text>
              ))
            ) : (
              <Text style={paragraph}>
                No issues detected
              </Text>
            )}
          </Text>
          <Text style={footer}>
            NES team, SummerHack CISSA 2024 Ltd
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
  backgroundColor: "#FFB6C1",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#ffffff",
  margin: "20px 0",
};

const paragraph = {
  color: "#000000",

  fontSize: "18px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const footer = {
  color: "#36454F",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "right" as const,
};
