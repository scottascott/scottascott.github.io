export const profile = {
  name: "Scott Wang",
  title: "Senior Frontend Developer",
  tagline: "Next.js · React · TypeScript · Tailwind",
  location: "Ottawa, Ontario, Canada",
  email: "scottwangg@gmail.com",
  linkedin: "https://www.linkedin.com/in/scott-wang-a1b129210",
  github: "https://github.com/ScottWangVirgoCX",
  summary:
    "Frontend developer with 6+ years of experience building responsive, production web apps with React, Next.js, and TypeScript, plus backend services in Java, Node, and SQL/NoSQL databases. Comfortable owning a feature end-to-end, from interface design and SEO to typesafe APIs and deployment.",
};

export const skills = {
  "Front-End": [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "HTML5 / CSS3",
    "Bootstrap",
    "Redux",
    "Zustand",
  ],
  "Back-End & APIs": [
    "Node.js",
    "tRPC",
    "GraphQL",
    "RESTful APIs",
    "Java",
    "Spring Boot",
    "Prisma",
    "MySQL",
    "SQL Server",
    "MongoDB",
  ],
  "Tools & DevOps": [
    "AWS (EC2)",
    "Vercel",
    "Netlify",
    "Postman",
    "Git",
    "Chrome DevTools",
    "CI/CD",
  ],
};

export const experience = [
  {
    company: "VirgoCX",
    role: "Senior Frontend Developer",
    period: "December 2021 – Present",
    location: "Toronto, Ontario, Canada",
    bullets: [
      "Led a team building responsive websites for cryptocurrency exchanges using React.",
      "Rebuilt marketing pages with Next.js, improving animation effects, interface design, and SEO.",
      "Built a system for managing SSR SEO pages, using Prisma for coin data storage and tRPC for typesafe end-to-end APIs.",
      "Contributed to the exchanges' mobile apps using React Native.",
      "Maintained WordPress-based learn sites covering crypto news, guides, and trading strategies.",
      "Integrated identity verification, address, push notification, and secure payment APIs.",
      "Identified and resolved issues via static code analysis; contributed to a successful SOC audit.",
    ],
  },
  {
    company: "Quasi Group",
    role: "Frontend Developer",
    period: "June 2021 – October 2021",
    location: "Ottawa, Ontario, Canada",
    bullets: [
      "Built an online email survey system with React on the front end and Express on the back end.",
      "Implemented Google OAuth for secure customer login.",
      "Used SendGrid for group emails and feedback collection via RESTful API.",
      "Connected MongoDB to store customer account and survey data.",
      "Integrated Redux with thunk middleware for asynchronous state management.",
    ],
  },
  {
    company: "Wuhan Duofen Art School",
    role: "Frontend Developer",
    period: "January 2016 – May 2017",
    location: "Wuhan, Hubei, China",
    bullets: [
      "Built the school's WordPress website: news, forums, online courses, and a tutoring schedule.",
      "Built a companion Android app with PhoneGap, including a tuning helper and study notes.",
      "Used Yoast SEO, Hotjar, WP Mail SMTP, and Contact Form 7 to extend site functionality.",
      "Connected the WordPress API to a Java Spring Boot RESTful API for data exchange.",
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
  },
  {
    name: "concentration",
    description:
      "A concentration-style memory matching card game built as a fun side project.",
    url: "https://concentration-puce.vercel.app/",
    tags: ["React"],
  },
];
