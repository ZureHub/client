'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Heading, 
  Flex, 
  Text, 
  Button, 
  Column, 
  Input, 
  RevealFx 
} from "@/once-ui/components";
import Waves from "@/components/Waves";
import { baseURL } from "@/app/resources";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  
  // New states for signup form
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isSignup) {
        // Signup logic
        if (password !== confirmPassword) {
          throw new Error("Passwords don't match");
        }
        
        const response = await fetch('http://localhost:3001/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
        }

        // Automatically switch to login after successful registration
        setIsSignup(false);
        setError("");
        setPassword("");
        // Show success message
        alert("Account created successfully! Please sign in.");
      } else {
        // Login logic
        const response = await fetch('http://localhost:3001/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }

        // Store token in localStorage or cookies
        localStorage.setItem('token', data.token);
        
        // Redirect to dashboard or homepage
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message || (isSignup ? 'Registration failed.' : 'Login failed. Please check your credentials.'));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setError("");
  };

  return (
    <Column maxWidth="m" gap="xl" horizontal="center" style={{ minHeight: "100vh", width: "100%" }}>
      <Flex 
        fillWidth 
        style={{ 
          position: "relative",
          width: "100%", 
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(1rem, 5%, 3rem)",
          flex: 1
        }}
        
      >
        <Button
          variant="tertiary"
          href="/"
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#fff",
            background: "rgba(76, 244, 123, 0.15)",
            backdropFilter: "blur(8px)",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid rgba(76, 244, 123, 0.3)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
            fontSize: "2rem",
            fontWeight: "500",
            animation: "fadeIn 0.5s ease-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateX(-5px)";
            e.currentTarget.style.background = "rgba(76, 244, 123, 0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(0)";
            e.currentTarget.style.background = "rgba(76, 244, 123, 0.15)";
          }}
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ 
              strokeWidth: 2,
              transition: "transform 0.3s ease",
              animation: "arrowPulse 1.5s infinite alternate" 
            }}
          >
            <style jsx>{`
              @keyframes arrowPulse {
          from { transform: translateX(0); }
          to { transform: translateX(-3px); }
              }
              @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
              }
            `}</style>
            <path 
              d="M19 12H5M12 19L5 12L12 5" 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
          Home
        </Button>
        <div style={{ 
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%", 
          height: "100%",
          zIndex: -1
        }}>
         
        </div>
        
        <Flex 
          direction="column"
          gap="xl"
          style={{
            background: "rgba(18, 21, 19, 0.5)",
            backdropFilter: "blur(12px)",
            borderRadius: "16px",
            padding: "clamp(1.5rem, 6vw, 2.5rem)",
            maxWidth: "min(90%, 420px)",
            width: "100%",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(76, 123, 244, 0.2)",
            border: "1px solid rgba(76, 244, 123, 0.15)"
          }}
        >
          <RevealFx translateY="4">
            <Heading variant="display-strong-m" wrap="balance" style={{ 
              textAlign: "center", 
              color: "#fff",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)"
            }}>
              {isSignup ? "Create Account" : "Welcome to ZureHub"}
            </Heading>
          </RevealFx>
          
          <RevealFx translateY="8" delay={0.2}>
            <Text variant="body-default-m" style={{ 
              textAlign: "center",
              color: "rgba(255, 255, 255, 0.8)"
            }}>
              {isSignup 
                ? "Join our AI career assistant platform" 
                : "Sign in to continue to your AI career assistant"}
            </Text>
          </RevealFx>
          
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <RevealFx translateY="12" delay={0.3} fillWidth>
              <Column gap="m" fillWidth>
                {isSignup && (
                  <Input
                    id="name"
                    type="text"
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ 
                      width: '100%',
                      
                      color: "#fff",
                     
                    }}
                  />
                )}
                
                <Input
                  id="email"
                  type="email"
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ 
                    width: '100%',
                   
                    color: "#fff",
             
                  }}
                />
                
                <Input
                  id="password"
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ 
                    width: '100%',
                  
                    color: "#fff",
                   
                  }}
                />
                
                {isSignup && (
                  <Input
                    id="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{ 
                      width: '100%',
                      
                      color: "#fff",
                     
                    }}
                  />
                )}
                
                {error && (
                  <Text variant="body-default-s" style={{ 
                    color: "rgba(255, 100, 100, 0.9)",
                    textAlign: "center",
                    padding: "0.5rem",
                    background: "rgba(255, 0, 0, 0.1)",
                    borderRadius: "6px"
                  }}>
                    {error}
                  </Text>
                )}
                
                <Button
                  type="submit"
                  variant="primary"
                  size="l"
                  disabled={isLoading}
                  fillWidth
                  style={{
                    background: "#4C7BF4",
                    marginTop: "0.5rem",
                    boxShadow: "0 4px 12px rgba(76, 123, 244, 0.4)"
                  }}
                >
                  {isLoading ? (isSignup ? "Creating Account..." : "Signing in...") : (isSignup ? "Sign Up" : "Sign In")}
                </Button>
                
                <Flex 
                  horizontal="space-between" 
                  fillWidth
                  style={{
                    marginTop: "0.5rem",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "0.5rem"
                  }}
                >
                  {!isSignup && (
                    <Button
                      variant="tertiary"
                      size="s"
                      href="/forgot-password"
                      style={{ 
                        color: "rgba(255, 255, 255, 0.7)",
                        textDecoration: "underline" 
                      }}
                    >
                      Forgot Password?
                    </Button>
                  )}
                  
                  <Button
                    variant="tertiary"
                    size="s"
                    onClick={toggleForm}
                    style={{ 
                      color: "#4C7BF4",
                      fontWeight: 600,
                      marginLeft: isSignup ? "auto" : "0"
                    }}
                  >
                    {isSignup ? "Back to Login" : "Create Account"}
                  </Button>
                </Flex>
              </Column>
            </RevealFx>
          </form>
        </Flex>
      </Flex>
    </Column>
  );
}