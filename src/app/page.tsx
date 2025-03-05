import React from "react";

import { Heading, Flex, Text, Button, Avatar, RevealFx, Arrow, Column } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";

import { baseURL, routes } from "@/app/resources";
import { home, about, person, newsletter } from "@/app/resources/content";
import { Footer, Mailchimp } from "@/components";
import Waves from "@/components/Waves";
import { Posts } from "@/components/blog/Posts";

export async function generateMetadata() {
  const title = home.title;
  const description = home.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: home.title,
            description: home.description,
            url: `https://${baseURL}`,
            image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
            publisher: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />
      <Column fillWidth paddingY="l" gap="m">
        <Column maxWidth="s">
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="m">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="m">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx translateY="12" delay={0.4} horizontal="start">
            <Button
              id="about"
              data-border="rounded"
              href="/about"
              variant="secondary"
              size="m"
              arrowIcon
            >
              <Flex gap="8" vertical="center">
                {about.avatar.display && (
                  <Avatar
                    style={{ marginLeft: "-0.75rem", marginRight: "0.25rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Flex>
            </Button>
          </RevealFx>
        </Column>
      </Column>
      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 1]} />
      </RevealFx>
      {routes["/blog"] && (
        <Flex fillWidth gap="24" mobileDirection="column">
          <Flex flex={1} paddingLeft="l">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              Latest from the blog
            </Heading>
          </Flex>
          <Flex flex={3} paddingX="20">
            <Posts range={[1, 2]} columns="2" />
          </Flex>
        </Flex>
      )}
      <Projects range={[2]} />
      {newsletter.display && <Mailchimp newsletter={newsletter} />}

      {/* <RevealFx translateY="20" delay={0.8} fillWidth> */}
  <Flex 
    fillWidth 
    style={{ 
      position: "relative",
      width: "100vw", 
      height: "400px", 
      marginLeft: "calc(-50vw + 50%)",
      marginRight: "calc(-50vw + 50%)",
      marginTop: "4rem",
      marginBottom: "0",
      overflow: "hidden", // Add this to contain the waves
      borderRadius: "7% 7% 0 0"
    }}
  >
    <div style={{ 
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%", 
      height: "100%"
    }}>
      <Waves
        lineColor="#4C7BF4"
        backgroundColor="rgba(76, 123, 244, 0.1)"
        waveSpeedX={0.0125}
        waveSpeedY={0.005}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.925}
        tension={0.005}
        maxCursorMove={120}
        xGap={10}
        yGap={32}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0
        }}
        className="" // Empty string instead of Tailwind classes
      />
      <Flex
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        vertical="center"
        horizontal="center"
        direction="column"
        gap="m"
        paddingX="m"
        style={{ zIndex: 1 }}
      >
        <Heading variant="display-strong-s" style={{ color: "#fff", textAlign: "center" }}>
          Ready to improve your career prospects?
        </Heading>
        <Button
          variant="primary"
          size="l"
          href="/features"
          arrowIcon
          style={{ zIndex: 10 }}
        >
          Try ZureHub Now
        </Button>
        
      </Flex>
      
    </div>
  </Flex>
{/* </RevealFx> */}
      <Flex 
        fillWidth 
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 2
        }}
      >
        <Footer />
      </Flex>
    </Column>
  );
}