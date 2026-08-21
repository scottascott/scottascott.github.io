export const profile = {
  name: "Scott Wang",
  location: "Ottawa, Ontario, Canada",
  email: "scottwangg@gmail.com",
  linkedin: "https://www.linkedin.com/in/scott-wang-a1b129210",
  githubPersonal: "https://github.com/scottascott",
  githubWork: "https://github.com/ScottWangVirgoCX",
  summary:
    "Senior Software Engineer with 8+ years of experience building modern frontend and full-stack applications. Strong expertise in React, Next.js and TypeScript, with hands-on backend experience in Node.js, API development and relational databases. Experienced in production fintech and cryptocurrency platforms, including real-time trading, payments, digital wallets, KYC/KYB and compliance integrations. Focused on scalable architecture, performance, maintainability and production reliability.",
};

export const experience = [
  {
    company: "VirgoCX",
    role: "Senior Frontend Developer",
    period: "December 2021 – Present",
    location: "Toronto, Ontario, Canada",
    bullets: [
      "Led development of production fintech and cryptocurrency applications across consumer trading, B2B payments, and wealth management platforms using React, Next.js, and TypeScript.",
      "Built real-time trading and asset-management experiences using React, WebSocket, and TradingView, supporting live market data, order books, trading, digital wallets, and portfolio management.",
      "Integrated internal and third-party APIs across authentication, KYC/KYB, payments, notifications, and compliance workflows, including transaction risk monitoring and review processes.",
      "Built data-driven Next.js applications with server-side rendering and SEO optimization, using Prisma and SQLite to manage cryptocurrency content, market data, and structured metadata.",
      "Led frontend architecture across multiple products, establishing reusable components and shared patterns while contributing to backend integrations, Redis caching, CI/CD, and AWS deployment workflows.",
    ],
  },
  {
    company: "Wuhan Duofen Art School",
    role: "Full-Stack Developer",
    period: "January 2016 – May 2017",
    location: "Wuhan, Hubei, China",
    bullets: [
      "Developed and maintained a full-stack education platform supporting news, online courses, forums, tutoring schedules, contact workflows and student-facing services.",
      "Built responsive frontend interfaces and Node.js / Express backend services connected through RESTful APIs.",
      "Developed backend functionality for content management, scheduling, email workflows and application data exchange.",
      "Integrated WordPress as part of the content-management system while extending platform functionality through custom frontend and backend services.",
      "Built a hybrid Android application using PhoneGap and implemented SEO, analytics, email delivery and user-engagement functionality.",
    ],
  },
  {
    company: "PwC",
    role: "Senior Software Engineer",
    period: "November 2013 – November 2015",
    location: "Shanghai, China",
    bullets: [
      "Built a BIDW report generator for West Bend to support data-driven decision-making.",
      "Built a staff management system for Taiping Insurance with a clean front/back-end split.",
      "Designed dimensional data models integrating ERP databases and Excel via Informatica Power Center.",
      "Used Tableau to build a drag-and-combine custom report interface.",
      "Wrote a Java program to extract and process staff data from Excel files.",
    ],
  },
];

export const education = [
  {
    school: "University of Ottawa",
    degree: "Master of Science, Computer Science",
    period: "September 2017 – September 2020",
  },
  {
    school: "Shanghai Jiao Tong University",
    degree: "Bachelor of Engineering, Computer Software Engineering",
    period: "September 2010 – July 2014",
  },
];

export const projects = [
  {
    name: "crypto-view",
    description:
      "A crypto price tracker and dashboard for browsing real-time cryptocurrency prices and market data.",
    url: "https://crypto-view-git-main-scottascotts-projects.vercel.app/",
    tags: ["Next.js", "React", "tRPC", "Prisma"],
    video: "/videos/crypto-view.mp4",
  },
  {
    name: "concentration",
    description:
      "A concentration-style memory matching card game built as a fun side project.",
    url: "https://concentration-puce.vercel.app/",
    tags: ["React"],
    video: "/videos/concentration.mp4",
  },
];
