import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "ZureHub",
  lastName: "AI",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "CV Reviewer & AI Interviewer",
  avatar: "/images/avatar.jpg",
  location: "UTC", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Multiple languages supported"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName} Updates</>,
  description: (
    <>
      Stay informed about new features, interview tips, and career advice to improve your job search success.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/zurehub",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/company/zurehub/",
  },
  {
    name: "X",
    icon: "x",
    link: "https://twitter.com/zurehub",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:support@zurehub.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name} - CV Review & Interview Preparation`,
  description: `AI-powered CV reviewer and interview preparation platform`,
  headline: <>Supercharge your job applications with AI</>,
  subline: (
    <>
      ZureHub uses advanced <InlineCode>AI technology</InlineCode> to enhance your resume 
      <br /> and prepare you for interviews with personalized feedback.
    </>
  ),
};

const about = {
  label: "About",
  title: "About ZureHub",
  description: `Learn about our AI-powered career advancement tools`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com/zurehub",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        ZureHub is an innovative platform that combines AI technology with career expertise to help job seekers improve their resumes and interview skills. We analyze your CV for optimization and conduct realistic mock interviews tailored to your industry and role.
      </>
    ),
  },
  work: {
    display: true, 
    title: "Our Services",
    experiences: [
      {
        company: "CV Review",
        timeframe: "Instant Analysis",
        role: "Resume Optimization",
        achievements: [
          <>
            Get detailed feedback on your resume's content, format, and impact with suggestions for improvement.
          </>,
          <>
            Industry-specific keyword analysis to help your resume pass through Applicant Tracking Systems (ATS).
          </>,
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "CV Review Sample",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "AI Interviewer",
        timeframe: "Practice Anytime",
        role: "Interview Simulation",
        achievements: [
          <>
            Realistic mock interviews with questions tailored to your target role, industry, and experience level.
          </>,
          <>
            Detailed performance analysis with tips on improving your responses and communication skills.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "How It Works",
    institutions: [
      {
        name: "Resume Analysis",
        description: <>Upload your CV, and our AI analyzes it against industry standards and job requirements.</>,
      },
      {
        name: "Interview Preparation",
        description: <>Practice with our AI interviewer that adapts questions based on your resume and target position.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Our Technology",
    skills: [
      {
        title: "AI Resume Analysis",
        description: <>Advanced natural language processing to identify strengths and weaknesses in your CV.</>,
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "AI Resume Analysis",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Resume Feedback",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Interview Simulation",
        description: <>Conversational AI that conducts realistic interviews and provides actionable feedback.</>,
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Interview Simulation",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog = {
  label: "Resources",
  title: "Career Advancement Resources",
  description: `Expert tips and guides for job seekers`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Features",
  title: "Our Platform Features",
  description: `Explore ZureHub's AI-powered career tools`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: "Testimonials",
  title: "Success Stories",
  description: `See how ZureHub has helped job seekers succeed`,
  // Images from https://pexels.com
  images: [
    // ...existing gallery images...
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };