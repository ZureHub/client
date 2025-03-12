"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Fade, Flex, Line, ToggleButton, Text, Button } from "@/once-ui/components";
import styles from "@/components/Header.module.scss";

import { routes, display } from "@/app/resources";
import { person, home, about, blog, work, gallery } from "@/app/resources/content";
import { useAuth } from "@/context/AuthContext";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

interface User {
  name: string;
  email: string;
}


const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};



export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";
  const { user, logout } = useAuth();

  return (
    <>
      <Fade hide="s" fillWidth position="fixed" height="80" zIndex={9} />
      <Fade show="s" fillWidth position="fixed" bottom="0" to="top" height="80" zIndex={9} />
      <Flex
        fitHeight
        className={styles.position}
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
      >
        <Flex paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s">
          {display.location && <Flex hide="s">{person.location}</Flex>}
        </Flex>
        <Flex fillWidth horizontal="center">
          <Flex
            background="surface"
            border="neutral-medium"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
          >
            <Flex gap="4" vertical="center" textVariant="body-default-s">
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} />
              )}
              <Line vert maxHeight="24" />
              {routes["/about"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="person"
                    href="/about"
                    label={about.label}
                    selected={pathname === "/about"}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="person"
                    href="/about"
                    selected={pathname === "/about"}
                  />
                </>
              )}
              {routes["/work"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="grid"
                    href="/work"
                    label={work.label}
                    selected={pathname.startsWith("/work")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="grid"
                    href="/work"
                    selected={pathname.startsWith("/work")}
                  />
                </>
              )}
              {routes["/blog"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="book"
                    href="/blog"
                    label={blog.label}
                    selected={pathname.startsWith("/blog")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="book"
                    href="/blog"
                    selected={pathname.startsWith("/blog")}
                  />
                </>
              )}
              {routes["/gallery"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="gallery"
                    href="/gallery"
                    label={gallery.label}
                    selected={pathname.startsWith("/gallery")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="gallery"
                    href="/gallery"
                    selected={pathname.startsWith("/gallery")}
                  />
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
        

      

<Flex fillWidth horizontal="end" vertical="center">
  {user ? (
    <Flex gap="m" vertical="center">
      <Flex 
        direction="column" 
        align="end"
        gap="1"
        className="s-flex-hide"
        style={{
          background: "rgba(30, 75, 50, 0.3)",
          padding: "6px 12px",
          borderRadius: "8px",
          border: "1px solid rgba(76, 244, 123, 0.15)"
        }}
      >
        <Text 
          variant="body-strong-s" 
          style={{ 
            color: "rgba(76, 244, 123, 1)",
            fontWeight: "600",
            letterSpacing: "0.02em"
          }}
        >
          {user.name}
        </Text>
        <Text 
          variant="body-default-xs" 
          style={{ 
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "0.8rem"
          }}
        >
          {user.email}
        </Text>
      </Flex>
      <Button
        prefixIcon="logout"
        variant="tertiary"
        size="l"
        onClick={logout}
        style={{
          background: "rgba(76, 244, 123, 0.15)",
          backdropFilter: "blur(8px)",
          color: "#fff",
          border: "1px solid rgba(76, 244, 123, 0.3)",
          borderRadius: "8px",
          padding: "8px 16px",
          transition: "all 0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(76, 244, 123, 0.25)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(76, 244, 123, 0.15)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <span className="s-flex-hide">Logout</span>
      </Button>
    </Flex>
  ) : (
    <>
     <Button
      className="s-flex-hide"
      prefixIcon="login"
      href="/login"
      variant="tertiary"
      size="l"
      style={{
        background: "rgba(76, 244, 123, 0.15)",
        backdropFilter: "blur(8px)",
        color: "#fff",
        border: "1px solid rgba(76, 244, 123, 0.3)",
        borderRadius: "8px",
        padding: "8px 16px",
        transition: "all 0.2s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(76, 244, 123, 0.25)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(76, 244, 123, 0.15)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      Login
    </Button>
    
    <Button
      className="s-flex-show"
      prefixIcon="login"
      href="/login"
      variant="tertiary"
      size="l"
      style={{
        background: "rgba(76, 244, 123, 0.15)",
        backdropFilter: "blur(8px)",
        color: "#fff",
        border: "1px solid rgba(76, 244, 123, 0.3)",
        borderRadius: "8px",
        padding: "8px 16px",
        transition: "all 0.2s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(76, 244, 123, 0.25)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(76, 244, 123, 0.15)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    />

    </>
  )}
  
  <Flex
    paddingRight="12"
    horizontal="end"
    vertical="center"
    textVariant="body-default-s"
    gap="20"
    marginLeft="8"
  >
    <Flex hide="s">{display.time && <TimeDisplay timeZone={person.location} />}</Flex>
  </Flex>
</Flex>
      </Flex>
    </>
  );
};
