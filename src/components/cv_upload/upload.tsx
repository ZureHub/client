'use client';

import React, { useState, useRef, useCallback } from 'react';
import { 
  Flex, 
  Text, 
  Button, 
  Column, 
  Heading,
  RevealFx,
  Toast
} from '@/once-ui/components';
import { useRouter } from 'next/navigation';

// File type validation
const ACCEPTED_FILE_TYPES = ['application/pdf'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function CVUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = (selectedFile: File | null) => {
    setError(null);
    if (!selectedFile) return;
    
    if (!ACCEPTED_FILE_TYPES.includes(selectedFile.type)) {
      setError('Please upload a PDF file only.');
      return;
    }
    
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('File size must be less than 5MB.');
      return;
    }
    
    setFile(selectedFile);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  }, []);

  const uploadFile = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/login');
        return;
      }

      const formData = new FormData();
      formData.append('cv', file);

      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const next = prev + 10;
          return next > 90 ? 90 : next;
        });
      }, 300);

      const response = await fetch('http://localhost:3001/api/cvs/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      clearInterval(progressInterval);
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload CV');
      }

      setUploadProgress(100);
      setSuccess(true);
      
      setTimeout(() => {
        setFile(null);
        setUploadProgress(0);
        router.push('/dashboard');
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'An error occurred while uploading your CV');
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Column 
      maxWidth="m" 
      gap="m"
      horizontal="center" 
      style={{ 
        height: "100vh", 
        width: "100%", 
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
        justifyContent: "center"
      }}
    >
      <RevealFx translateY="4">
        <Heading variant="display-strong-m" wrap="balance" style={{ 
          textAlign: "center", 
          color: "#fff",
          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          marginBottom: "0.5rem"
        }}>
          Upload Your CV
        </Heading>
      </RevealFx>
      
      <RevealFx translateY="8" delay={0.2}>
        <Text variant="body-default-m" style={{ 
          textAlign: "center",
          color: "rgba(255, 255, 255, 0.8)",
          maxWidth: "700px"
        }}>
          Upload your CV to get personalized career advice and job recommendations
        </Text>
      </RevealFx>

      <RevealFx translateY="12" delay={0.3}>
        <Flex 
          direction="column" 
          gap="m" 
          style={{
            background: "rgba(30, 75, 50, 0.7)",
            backdropFilter: "blur(12px)",
            borderRadius: "16px",
            padding: "clamp(1rem, 5vw, 1.5rem)",
            maxWidth: "min(90%, 550px)",
            width: "100%",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(76, 244, 123, 0.2)",
            border: "1px solid rgba(76, 244, 123, 0.15)",
            marginTop: "1rem"
          }}
        >
          {/* Drag and drop area */}
          <Flex 
            direction="column"
            gap="m"
            horizontal="center"
            vertical="center"
            style={{
              border: `2px dashed ${isDragging ? 'rgba(76, 244, 123, 0.8)' : 'rgba(76, 244, 123, 0.4)'}`,
              borderRadius: "12px",
              padding: "1.5rem 1rem",
              minHeight: "150px",
              background: isDragging ? 'rgba(76, 244, 123, 0.15)' : 'rgba(30, 75, 50, 0.3)',
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={onFileInputChange}
              accept=".pdf"
              style={{ display: "none" }}
            />
            
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{ opacity: 0.8 }}
            >
              <path 
                d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 16.2091 19.2091 18 17 18H7C4.79086 18 3 16.2091 3 14C3 11.7909 4.79086 10 7 10Z" 
                stroke="rgba(76, 244, 123, 0.8)" 
                strokeWidth="2"
              />
              <path 
                d="M12 12V15M12 15L14 13M12 15L10 13" 
                stroke="rgba(76, 244, 123, 0.8)" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>

            <Text
              variant="body-strong-m"
              style={{ color: "#fff", textAlign: "center" }}
            >
              {isDragging ? 'Drop your CV here' : 'Drag & drop your CV here'}
            </Text>

            <Text
              variant="body-default-s"
              style={{ color: "rgba(255, 255, 255, 0.7)", textAlign: "center" }}
            >
              or click to browse (PDF only, max 5MB)
            </Text>

            {file && (
              <Flex
                gap="s"
                style={{
                  marginTop: "0.5rem",
                  background: "rgba(76, 244, 123, 0.1)",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "8px",
                  border: "1px solid rgba(76, 244, 123, 0.2)"
                }}
              >
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9M13 2L20 9M13 2V9H20" 
                    stroke="rgba(76, 244, 123, 0.8)" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                <Text style={{ color: "#fff" }}>{file.name}</Text>
              </Flex>
            )}
          </Flex>

          {/* Error message */}
          {error && (
            <Text style={{ 
              color: "rgba(255, 100, 100, 0.9)",
              textAlign: "center",
              padding: "0.5rem",
              background: "rgba(255, 0, 0, 0.1)",
              borderRadius: "6px"
            }}>
              {error}
            </Text>
          )}

          {/* Upload progress */}
          {isUploading && (
            <Flex direction="column" gap="xs">
              <Text variant="body-default-s" style={{ color: "#fff" }}>
                Uploading: {uploadProgress}%
              </Text>
              <div style={{ 
                width: "100%", 
                height: "4px", 
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "2px",
                overflow: "hidden"
              }}>
                <div style={{
                  width: `${uploadProgress}%`,
                  height: "100%",
                  background: "rgba(76, 244, 123, 0.8)",
                  borderRadius: "2px",
                  transition: "width 0.3s ease-in-out"
                }} />
              </div>
            </Flex>
          )}

          {/* Upload button */}
          <Button
            variant="primary"
            size="l"
            onClick={uploadFile}
            disabled={!file || isUploading}
            fillWidth
            style={{
              background: "rgba(76, 244, 123, 0.8)",
              marginTop: "0.5rem",
              color: "#000",
              fontWeight: "600",
              boxShadow: "0 4px 12px rgba(76, 244, 123, 0.4)",
              opacity: (!file || isUploading) ? 0.6 : 1
            }}
          >
            {isUploading ? "Uploading..." : "Upload CV"}
          </Button>
        </Flex>
      </RevealFx>

      {/* Success toast */}
      {success && (
        <Toast
          variant="success"
          title="CV Uploaded Successfully"
          description="Your CV has been uploaded and is being processed."
          onClose={() => setSuccess(false)}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px"
          }}
        />
      )}
    </Column>
  );
}