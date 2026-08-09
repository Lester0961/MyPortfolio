import sispImage from "../assets/projects/sisp.png";
import srsImage from "../assets/projects/srs.png";
import lutongImage from "../assets/projects/lutong-pinoy.png";
import systemsEngineImage from "../assets/images/systems-engine.jpg";
import profileImage from "../assets/images/profile.png";
import certificateImage from "../assets/certificates/Screenshot 2026-06-08 213045.png";
import resumeUrl from "../assets/resume/John_Lester_Dematera_Resume.pdf?url";

export const assets = {
  systemsEngineImage,
  profileImage,
  certificateImage,
  resumeUrl,
};

export const featuredProjects = [
  {
    id: "sisp",
    name: "Student Portal and Advisory Bot",
    shortName: "SISP",
    description:
      "A connected academic experience combining a public school site, secure student services, and AI-assisted academic guidance.",
    image: sispImage,
    imageAlt: "SISP homepage for Regis Marie College",
    liveUrl: "https://sisp-theta.vercel.app",
    githubUrl: "https://github.com/Lester0961/sisp",
    stack: ["Next.js", "NestJS", "FastAPI", "pgvector"],
    theme: "#315eac",
    details: {
      context:
        "Students need one clear place for records, requests, school information, and academic guidance.",
      role:
        "Built and refined responsive frontend experiences while connecting portal workflows and the ARIA advisory interface.",
      result:
        "A deployed academic platform that presents school information clearly and provides direct paths into student services and AI-assisted guidance.",
    },
  },
  {
    id: "srs",
    name: "Scholarship Recommendation System",
    shortName: "ScholarMatch PH",
    description:
      "An explainable matching experience that helps students find scholarships through weighted criteria and eligibility gates.",
    image: srsImage,
    imageAlt: "ScholarMatch PH scholarship recommendation homepage",
    liveUrl: "https://srs-frontend-mu.vercel.app",
    githubUrl: "https://github.com/Lester0961/SRS",
    stack: ["Next.js", "Express", "Supabase", "Prisma"],
    theme: "#e2a923",
    details: {
      context:
        "Scholarship discovery is often fragmented and difficult to evaluate, especially when eligibility rules are unclear.",
      role:
        "Designed the student-facing flow and presented weighted recommendation logic through a focused, responsive interface.",
      result:
        "A working application that turns a complex search process into a guided matching journey with clearer qualification signals.",
    },
  },
  {
    id: "lutong-pinoy",
    name: "Lutong Pinoy Ordering App",
    shortName: "Lutong Pinoy",
    description:
      "A responsive local food ordering application with category browsing, authentication, cart persistence, and order flows.",
    image: lutongImage,
    imageAlt: "Lutong Pinoy food ordering homepage",
    liveUrl: "https://foodorder-lester.vercel.app/",
    githubUrl: "https://github.com/Lester0961/foodorder",
    stack: ["React", "Vite", "React Router", "Tailwind"],
    theme: "#b92a2f",
    details: {
      context:
        "A local food business needs an ordering experience that feels immediate on phones and remains clear across menu, cart, and account states.",
      role:
        "Built the responsive frontend, navigation, category experience, authentication screens, and persistent cart behavior.",
      result:
        "A deployed ordering application with a clear customer journey from discovery to account and cart management.",
    },
  },
];

export const secondaryProjects = [
  {
    id: "plwm",
    name: "PLWM Church CMS",
    type: "Production system",
    description:
      "A private administration portal for church records, events, ministry content, giving workflows, and member directories.",
    stack: ["React", "Node.js", "Supabase", "Tailwind"],
    details: {
      context:
        "PLWM Manila Central Church needed a custom system for administrative workflows, member records, events, giving, and content.",
      role:
        "Built responsive frontend pages, role-based interfaces, reusable components, and supported debugging and deployment.",
      result:
        "A working private CMS used for real church administration and ministry workflows.",
    },
  },
  {
    id: "rmc",
    name: "RMC Grade System",
    type: "Desktop application",
    description:
      "A student record and grade management application for registrar workflows, role access, and GWA calculation.",
    githubUrl: "https://github.com/Lester0961/rmcgradesystem",
    stack: ["VB.NET", "WinForms", "SQL Server", "ADO.NET"],
    details: {
      context:
        "Regis Marie College needed a structured way to manage student records, post grades, and calculate GWA.",
      role:
        "Contributed to the schema, grade-management features, Windows Forms UI, and SQL Server integration.",
      result:
        "A functional desktop system with role-based access, grade posting, persistent records, and GWA calculation.",
    },
  },
  {
    id: "aurahub",
    name: "AuraHub Music Player",
    type: "Flutter application",
    description:
      "A mood-based music player whose visual language adapts to the character of the playing track.",
    githubUrl: "https://github.com/Lester0961/AURA-HUB",
    stack: ["Flutter", "Dart", "Firebase", "just_audio"],
    details: {
      context:
        "The project explores how a music interface can feel responsive to mood rather than remaining visually static.",
      role:
        "Built the Flutter interface, playback experience, theme adaptation, and Firebase-connected application structure.",
      result:
        "A mobile application concept that connects playback state with a changing visual atmosphere.",
    },
  },
];

export const skillGroups = [
  {
    id: "frontend",
    title: "Frontend systems",
    summary: "Responsive interfaces, reusable components, interaction states, and accessible application flows.",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind", "Vite"],
  },
  {
    id: "connected",
    title: "Connected products",
    summary: "Frontends that communicate clearly with APIs, databases, authentication, and AI-assisted services.",
    items: ["Node.js", "Express", "NestJS", "FastAPI", "REST APIs", "Supabase", "PostgreSQL", "Prisma", "pgvector"],
  },
  {
    id: "delivery",
    title: "Delivery and foundations",
    summary: "Practical debugging, version control, deployment support, and programming across web and desktop projects.",
    items: ["Git", "GitHub", "Vercel", "Render", "Java", "C++", "VB.NET", "Dart", "Flutter"],
  },
];

export const experience = [
  {
    period: "Jan 2026 - Present",
    title: "Frontend Developer",
    organization: "PLWM Manila Central Church",
    description:
      "Spearheading frontend architecture for a custom church management system and collaborating around REST-based administrative workflows.",
    highlights: [
      "Build responsive, accessible interfaces using modern React patterns.",
      "Collaborate with backend developers on member-directory APIs.",
      "Validate layouts across devices and support production deployment.",
    ],
  },
  {
    period: "2024 - 2025",
    title: "Freelance Web Developer",
    organization: "Independent contract work",
    description:
      "Delivered responsive websites and web applications from interface design through integration and deployment.",
    highlights: [
      "Developed interactive flows with HTML, CSS, JavaScript, and Tailwind.",
      "Connected frontend interfaces to third-party databases and publishing workflows.",
    ],
  },
];

export const socialLinks = [
  { id: "github", label: "GitHub", href: "https://github.com/Lester0961" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/johnlester21/" },
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/itslester.20" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/lestor_1.10.26/" },
  { id: "jobstreet", label: "JobStreet", href: "https://ph.jobstreet.com/profiles/johnlester-dematera-Lp1xH53T9z" },
  { id: "paypal", label: "PayPal", href: "https://paypal.me/itslester09" },
];
