export const dummyData = {
  basicInfo: {
    firstName: "John",
    lastName: "Doe",
    title: "Full Stack Developer",
    contact: {
      email: "john.doe@example.com",
      phone: "+1 123-456-7890",
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe",
      location: "New York, USA",
      portfolio: "johnDoe.com",
    },
    summary:
      "Passionate and detail-oriented Full Stack Developer with 5+ years of experience designing and implementing scalable web applications. Skilled in JavaScript, React, Node.js, and database management.",
  },
  skills: {
    languages: ["JavaScript", "Java", "C++", "TypeScript"],
    frameworks: ["React", "Node.js", "Express"],
    developerTools: ["Git, Github, Google Cloud Platform"],
  },
  experience: [
    {
      company: "Tech Innovators Inc.",
      location: "San Francisco, CA",
      position: "Senior Full Stack Developer",
      startDate: "Jan 2022",
      endDate: "Present",
      responsibilities: `Developed and maintained web applications using React, Node.js, and PostgreSQL, enhancing platform performance by 30%.,
      Led a team of 5 developers to implement CI/CD pipelines, reducing deployment times by 40%.
      Collaborated with product and design teams to create new features, resulting in a 20% increase in user engagement.`,
    },
    {
      company: "Creative Solutions Ltd.",
      location: "New York, NY",
      position: "Full Stack Developer",
      startDate: "May 2018",
      endDate: "Dec 2021",
      responsibilities: `Designed REST APIs and integrated them with front-end components, achieving a seamless user experience.,
        Optimized SQL queries and database schemas, improving data retrieval speeds by 25%,
        Implemented user authentication and authorization using JWT, improving application security.`,
    },
  ],
  education: [
    {
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
      graduationYear: "2018",
      location: "Berkeley, CA",
    },
    {
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
      graduationYear: "2018",
      location: "Berkeley, CA",
    },
  ],
  projects: [
    {
      title: "E-Commerce Platform",
      description: [
        "Developed a full-stack e-commerce platform using React, Node.js, and MongoDB. Implemented features like user authentication, product listings, and a shopping cart, serving over 10,000 users.",
      ],
      techStack: `React, Node.js, MongoDB, Express`,
      startDate: "Jan 2024",
      endDate: "Feb 2024",
    },
    {
      title: "Real-Time Chat Application",
      description: [
        "Built a real-time chat application using WebSockets and Node.js. Integrated user presence and typing indicators for an enhanced user experience.",
      ],
      techStack: `WebSockets, Node.js, MongoDB, Next.js`,
      startDate: "Jan 2024",
      endDate: "Feb 2024",
    },
  ],
  certifications: [
    {
      title: "AWS Certified Solutions Architect",
      issuedBy: "Amazon Web Services",
      issueDate: "March 2022",
    },
    {
      title: "Certified Kubernetes Administrator",
      issuedBy: "Cloud Native Computing Foundation",
      issueDate: "July 2021",
    },
  ],
  languages: [
    {
      language: "English",
      proficiency: "Native",
    },
    {
      language: "Spanish",
      proficiency: "Professional Working Proficiency",
    },
  ],
  volunteering: [
    {
      organization: "Code for Good",
      role: "Volunteer Web Developer",
      duration: "2020 - 2021",
      responsibilities: [
        "Developed web applications for non-profit organizations, improving accessibility and user engagement.",
        "Trained junior developers in JavaScript and React, contributing to the organization's capacity-building efforts.",
      ],
    },
  ],
  references: "Available upon request",
};

export interface ResumeData {
  basicInfo: {
    firstName: string;
    lastName: string;
    contact: {
      email: string;
      phone: string;
      linkedin: string;
      github: string;
      portfolio: string;
    };
  };
  skills: {
    languages: [];
    frameworks: [];
    developerTools: [];
  };
  experience: {
    company: string;
    location: string;
    position: string;
    startDate: string;
    endDate: string;
    responsibilities: string;
  }[];
  education: {
    institution: string;
    degree: string;
    graduationYear: string;
    location: string;
  }[];
  projects: {
    title: string;
    description: string;
    techStack: string;
    startDate: string;
    endDate: string;
  }[];
  certifications: {
    title: string;
    issuedBy: string;
    issueDate: string;
  }[];
  languages: {
    language: string;
    proficiency: string;
  }[];
  volunteering: {
    organization: string;
    role: string;
    duration: string;
    responsibilities: string[];
  }[];
  references: string;
}
