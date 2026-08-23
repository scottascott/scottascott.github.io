export const profile = {
  name: "Scott Wang",
  location: "Ottawa, Ontario, Canada",
  email: "scottwangg@gmail.com",
  linkedin: "https://www.linkedin.com/in/scott-wang-a1b129210",
  githubPersonal: "https://github.com/scottascott",
  githubWork: "https://github.com/ScottWangVirgoCX",
  resumeUrl: "/Scott-Wang-Resume.pdf",
  summary:
    "Senior Software Engineer with 8+ years of experience building production web applications. I specialize in React, Next.js and TypeScript, with a strong focus on complex frontend systems and full-stack product development. ",
  summary2: "From real-time trading and digital wallets to payments and compliance platforms, I build software that is fast, reliable and designed to scale.",
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

export const projects: {
  name: string;
  url: string;
  video: string;
  poster: string;
  ratio: number;
  tile: "wide" | "tall" | "standard";
}[] = [
    {
      name: "VirgoCX Retail Platform",
      url: "https://virgocx.ca/page#/",
      video: "/videos/virgoxc.mp4",
      poster: "/videos/posters/virgoxc.jpg",
      ratio: 1264 / 720,
      tile: "wide",
    },
    {
      name: "VirgoCX Static Page",
      url: "https://virgocx.ca",
      video: "/videos/virgocx-static.mp4",
      poster: "/videos/posters/virgocx-static.jpg",
      ratio: 720 / 1278,
      tile: "tall",
    },
    {
      name: "VirgoPay Portal",
      url: "https://virgopay.co/",
      video: "/videos/virgopay.mp4",
      poster: "/videos/posters/virgopay.jpg",
      ratio: 720 / 1244,
      tile: "tall",
    },
    {
      name: "Virgo Co Learn Page",
      url: "https://learn.virgo.co/",
      video: "/videos/learn-virgo-co.mp4",
      poster: "/videos/posters/learn-virgo-co.jpg",
      ratio: 724 / 720,
      tile: "standard",
    },
    {
      name: "VirgoPay API Doc",
      url: "https://docs.virgopay.co/",
      video: "/videos/virgopay-api-doc.mp4",
      poster: "/videos/posters/virgopay-api-doc.jpg",
      ratio: 732 / 720,
      tile: "standard",
    },
    {
      name: "Virgo Payments Portal",
      url: "https://portal.virgopayments.ca/",
      video: "/videos/virgo-payments.mp4",
      poster: "/videos/posters/virgo-payments.jpg",
      ratio: 720 / 724,
      tile: "standard",
    },
  ];

export const sideProjects = [
  {
    name: "Crypto View",
    description:
      "A crypto price tracker and dashboard for browsing cryptocurrency prices and market data.",
    url: "https://crypto-view-git-main-scottascotts-projects.vercel.app/",
    tags: ["Next.js", "tRPC", "Prisma"],
    video: "/videos/crypto-view.mp4",
  },
  {
    name: "Concentration",
    description:
      "A concentration-style memory matching card game built as a fun side project.",
    url: "https://concentration-puce.vercel.app/",
    tags: ["React"],
    video: "/videos/concentration.mp4",
  },
  {
    name: "Crypto Shiba Run",
    description:
      "A crypto-themed endless runner — dodge candlestick obstacles as a shiba inu to grow your portfolio, Chrome-dino style.",
    url: "https://shiba-run.netlify.app/",
    tags: ["React", "Canvas"],
    video: "/videos/shiba-run.mp4",
    popup: { maxWidth: 800, height: 300 },
  },
];
