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
      "Led frontend development across production fintech products spanning cryptocurrency trading, payments, digital wallets, and wealth management using React, Next.js, and TypeScript.",
      "Built real-time trading experiences with WebSocket and TradingView, including live market data, order books, interactive charts, trading workflows, and portfolio tracking.",
      "Developed wallet and payment experiences covering deposits, withdrawals, transaction history, address management, and real-time asset valuation.",
      "Integrated internal and third-party services for authentication, KYC/KYB, payments, notifications, and compliance, including transaction risk monitoring and manual review workflows.",
      "Built data-driven Next.js applications with SSR and dynamic SEO, and contributed to shared frontend architecture, backend integrations, caching, CI/CD, and AWS deployment.",
    ],
  },
  {
    company: "Wuhan Duofen Art School",
    role: "Full-Stack Developer",
    period: "January 2016 – May 2017",
    location: "Wuhan, Hubei, China",
    bullets: [
      "Developed a full-stack education platform supporting online courses, school content, tutoring schedules, forums, and student services.",
      "Built responsive web interfaces and Node.js / Express backend services, designing RESTful APIs for content, scheduling, contact, and application workflows.",
      "Integrated WordPress for content management while extending the platform with custom frontend and backend functionality.",
      "Built a hybrid mobile application with PhoneGap and implemented SEO, analytics, email delivery, and user engagement features.",
    ],
  },
  {
    company: "PwC",
    role: "Senior Software Engineer",
    period: "November 2013 – November 2015",
    location: "Shanghai, China",
    bullets: [
      "Developed enterprise reporting and internal business applications for clients in the insurance and financial services sectors.",
      "Built data processing and reporting solutions integrating enterprise databases, Excel-based data sources, and ETL workflows.",
      "Developed internal management and analytics tools using Java, Informatica PowerCenter, and Tableau, supporting operational reporting and business decision-making.",
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
