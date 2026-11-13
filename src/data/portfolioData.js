export const personalInfo = {
  name: "Ankit Kumar",
  title: "Aspiring Software Engineer & Full Stack Developer",
  avatar: "/profile.jpg",
  tagline: "Pre-final year CSE student passionate about C/C++, Java, MERN stack, and Cloud technologies.",
  email: "realankit3@gmail.com",
  phone: "+91-7250977701",
  location: "Mohali, Punjab / Patna, Bihar",
  timezone: "Asia/Kolkata (IST, UTC+5:30)",
  availability: "Actively seeking Software Engineering Internships & 2027 Graduate Roles",
  bio: "Passionate pre-final year Computer Science Engineering student at Chandigarh University skilled in C, C++, Java, Python, and the MERN stack. Proven track record across full-stack internship development, ML predictive models, and telecommunication research. National-level athlete with strong leadership, analytical problem-solving, and adaptability.",
  socials: {
    github: "https://github.com/Ankit372004",
    linkedin: "https://linkedin.com",
    leetcode: "https://leetcode.com",
    codolio: "https://codolio.com",
    email: "mailto:realankit3@gmail.com"
  },
  stats: [
    { label: "Graduation Year", value: "2027", description: "B.E CSE, Chandigarh University" },
    { label: "Academic CGPA", value: "7.08", description: "Out of 10.0 scale" },
    { label: "Core Languages", value: "4+", description: "C, C++, Java, Python" },
    { label: "National Athlete", value: "2x", description: "National Baseball & Softball Player" }
  ]
};

export const categories = [
  { id: "all", label: "All Projects" },
  { id: "fullstack", label: "Full Stack (MERN)" },
  { id: "ml-iot", label: "AI, ML & IoT" },
  { id: "research", label: "Research & Systems" }
];

export const projects = [
  {
    id: "material-management",
    title: "Material Management System",
    subtitle: "End-to-end enterprise inventory & supply management portal (Bhuma Infotech)",
    category: "fullstack",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-blue-600 to-indigo-600",
    featured: true,
    tags: ["React.js", "Node.js", "Express.js", "RESTful APIs", "MySQL", "MongoDB"],
    metrics: "Production Tested • Responsive Across All Devices",
    description: "Developed during internship at Bhuma Infotech Pvt. Ltd. An end-to-end material and inventory management application providing automated stock tracking, procurement pipelines, and role-based operational dashboards.",
    challenges: "Synchronizing high-frequency stock movements while maintaining strict data integrity and responsive loading across mobile and desktop warehouse scanners.",
    solution: "Engineered secure middleware pipelines, normalized relational database schemas in MySQL, and optimized React UI components for instantaneous state re-rendering.",
    liveUrl: "https://github.com/Ankit372004",
    githubUrl: "https://github.com/Ankit372004",
    highlights: [
      "Designed responsive and clean user interface using modern React.js patterns",
      "Architected backend middleware and secure RESTful APIs with Node.js and Express",
      "Implemented role-based authentication and secure database transactions",
      "Delivered end-to-end integration tested on real warehouse workflow scenarios"
    ]
  },
  {
    id: "smart-home-energy",
    title: "Predicting Energy Consumption in Smart Home",
    subtitle: "IoT & Deep Learning system forecasting appliance energy consumption",
    category: "ml-iot",
    image: "https://images.unsplash.com/photo-1558441719-8b489c63f732?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-emerald-500 to-teal-700",
    featured: true,
    tags: ["Python", "LSTM", "Random Forest", "Raspberry Pi", "IoT Sensors", "Gradient Boosting"],
    metrics: "R² = 0.985 • MAPE < 25% • 20-30% Energy Savings",
    description: "Machine Learning and IoT pipeline predicting domestic appliance power usage and forecasting peak demand to automate smart energy conservation.",
    challenges: "Mitigating sensor noise and extreme weather-induced volatility in real-time time-series energy consumption data.",
    solution: "Trained hybrid CNN-LSTM deep learning architectures paired with Random Forest & Gradient Boosting regressors, achieving R²=0.985 and RMSE=0.245.",
    liveUrl: "https://github.com/Ankit372004",
    githubUrl: "https://github.com/Ankit372004",
    highlights: [
      "Developed LSTM models for short-term smart home energy forecasting with MAPE <25% on IoT datasets",
      "Achieved appliance prediction accuracy with R² = 0.985 and RMSE = 0.245",
      "Integrated Raspberry Pi hardware sensors for real-time telemetry and anomaly detection",
      "Applied CNN-LSTM hybrid model to reduce prediction errors by 10% under adverse weather",
      "Created interactive dashboards enabling 20-30% energy savings through automated predictive scheduling"
    ]
  },
  {
    id: "fso-transmission-research",
    title: "Secure Terrestrial Free Space Optics (FSO) Link",
    subtitle: "Research Paper on Design of Secure Terrestrial FSO Transmission Link Using OCDMA Code",
    category: "research",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-purple-600 to-pink-600",
    featured: true,
    tags: ["OFDM / OCDMA", "ICSM Codes", "MATLAB / Simulation", "Optical Communications", "4-QAM"],
    metrics: "BER < 10^-9 up to 12.5 km • ROP -9.19 dBm",
    description: "Rigorous scientific research paper on designing high-throughput, atmospheric-resilient terrestrial Free Space Optics (FSO) links using novel zero cross-correlation optical codes.",
    challenges: "Overcoming atmospheric turbulence, fog attenuation, and phase-induced intensity noise (PIIN) in high-speed optical wireless front-hauls.",
    solution: "Integrated 4-QAM OFDM modulation with zero cross-correlation Inverted Cyclic Shift Matrix (ICSM) OCDMA codes to eliminate PIIN and Multiple Access Interference (MAI).",
    liveUrl: "https://github.com/Ankit372004",
    githubUrl: "https://github.com/Ankit372004",
    highlights: [
      "Designed secure FSO link with OFDM/OCDMA and ICSM codes for next-generation 5G/6G wireless networks",
      "Implemented zero cross-correlation ICSM-OCDMA to completely eliminate PIIN and MAI for eavesdropper immunity",
      "Developed 4-QAM OFDM modulation achieving Bit Error Rate (BER) < 10^-9 up to 12.5 km clear air and 1.9 km low fog",
      "Simulated link performance with real-world meteorological datasets, optimizing Received Optical Power (ROP) to -9.19 dBm",
      "Validated front-haul transmission metrics across extreme weather attenuation curves"
    ]
  }
];

export const skillCategories = [
  {
    category: "Programming Languages",
    description: "Strong foundation in object-oriented and algorithmic programming",
    skills: [
      { name: "C++", level: 90, exp: "DSA & OOPs", icon: "Code2", highlight: true },
      { name: "Java", level: 85, exp: "OOPs & Core", icon: "FileCode2", highlight: true },
      { name: "C Language", level: 88, exp: "Systems & Memory", icon: "Terminal", highlight: true },
      { name: "Python", level: 82, exp: "ML & Scripts", icon: "Cpu" },
      { name: "JavaScript (ES6+)", level: 86, exp: "Full Stack", icon: "Code2", highlight: true }
    ]
  },
  {
    category: "Web & Full Stack (MERN)",
    description: "Building responsive web interfaces and connected backend services",
    skills: [
      { name: "React.js", level: 88, exp: "Frontend UI", icon: "Boxes", highlight: true },
      { name: "Node.js", level: 82, exp: "Backend APIs", icon: "Server", highlight: true },
      { name: "HTML5 & CSS3", level: 90, exp: "Semantic & Responsive", icon: "Palette" },
      { name: "RESTful APIs", level: 85, exp: "Integration", icon: "Network", highlight: true },
      { name: "MERN Stack", level: 84, exp: "Full Lifecycle", icon: "Layers" }
    ]
  },
  {
    category: "Databases, Cloud & Dev Tools",
    description: "Data management, cloud deployment, and developer toolchain",
    skills: [
      { name: "MySQL & Workbench", level: 86, exp: "Relational Queries", icon: "Database", highlight: true },
      { name: "MongoDB", level: 80, exp: "NoSQL Documents", icon: "Database" },
      { name: "Git & GitHub", level: 88, exp: "Version Control", icon: "GitBranch", highlight: true },
      { name: "AWS (S3)", level: 75, exp: "Cloud Storage", icon: "Cloud" },
      { name: "Postman", level: 85, exp: "API Testing", icon: "Wrench" },
      { name: "VS Code & Vercel", level: 90, exp: "Environment & Deploy", icon: "Box" }
    ]
  },
  {
    category: "Core Computer Science Fundamentals",
    description: "Underlying principles tested in technical software engineering interviews",
    skills: [
      { name: "Data Structures & Algorithms", level: 88, exp: "LeetCode / Codolio", icon: "Activity", highlight: true },
      { name: "Object-Oriented Programming (OOPs)", level: 90, exp: "Design Principles", icon: "CheckCircle2", highlight: true },
      { name: "Operating Systems", level: 82, exp: "Processes & Threads", icon: "Cpu" },
      { name: "Computer Networks", level: 80, exp: "Protocols & Sockets", icon: "Network" }
    ]
  }
];

export const experiences = [
  {
    period: "2024",
    role: "Software Engineering Intern",
    company: "Bhuma Infotech Pvt. Ltd.",
    location: "Material Management System",
    badge: "Internship",
    description: "Contributed to end-to-end development of an enterprise Material Management System, engineering frontend UI components and backend communication layers.",
    achievements: [
      "Led end-to-end development, building responsive React.js user interface components and integrating with backend middleware",
      "Architected RESTful APIs with secure database connections using MySQL and MongoDB",
      "Integrated and optimized the system to deliver a seamless, secure, and responsive user experience across devices"
    ],
    tech: ["React.js", "Node.js", "Express", "RESTful APIs", "MySQL", "MongoDB", "Git"]
  },
  {
    period: "2023 - Present",
    role: "Active Member",
    company: "IEEE Student Branch",
    location: "Chandigarh University",
    badge: "Student Society",
    description: "Engaging in collegiate technical symposiums, research discussions, and peer mentoring for computer science fundamentals.",
    achievements: [
      "Collaborated with student developers on open-source initiatives and technical workshops",
      "Organized coding events and participated in algorithmic problem-solving hackathons"
    ],
    tech: ["C++", "Java", "DSA", "Team Collaboration"]
  },
  {
    period: "2023",
    role: "Social Intern",
    company: "Social Internship Program",
    location: "Chandigarh University",
    badge: "Community",
    description: "Completed university-accredited social internship focusing on community outreach, collaborative execution, and social responsibility initiatives.",
    achievements: [
      "Demonstrated problem solving, leadership, and public communication in community-focused projects",
      "Coordinated with diverse cross-functional teams to fulfill social drive objectives"
    ],
    tech: ["Leadership", "Communication", "Project Planning"]
  }
];

export const education = [
  {
    period: "2023 - 2027 (Expected)",
    degree: "Bachelor of Engineering (B.E) in Computer Science & Engineering",
    institution: "Chandigarh University, Mohali, Punjab",
    grade: "CGPA: 7.08 / 10",
    details: "Focusing on Data Structures & Algorithms, Object-Oriented Programming, Operating Systems, Computer Networks, and MERN Stack Web Development."
  },
  {
    period: "",
    degree: "Senior Secondary (Class XII - Science Stream)",
    institution: "S.R Public School, Patna, Bihar",
    grade: "Percentage: 71%",
    details: "Physics, Chemistry, Mathematics with foundation in analytical problem solving and scientific reasoning."
  }
];

export const certifications = [
  {
    title: "Artificial Intelligence (Certificate of Completion)",
    issuer: "Samsung Innovation Campus",
    icon: "Cpu",
    badge: "AI & ML",
    description: "Comprehensive training in core Artificial Intelligence concepts, machine learning algorithms, and real-world data pipelines."
  },
  {
    title: "Certificate of Merit: Solidity Smart Contract Programming for Ethereum Blockchain",
    issuer: "Infosys Springboard",
    icon: "ShieldCheck",
    badge: "Blockchain",
    description: "Awarded Certificate of Merit for developing secure decentralized Ethereum smart contracts using Solidity."
  },
  {
    title: "Certificate of Merit in Design Thinking",
    issuer: "LinkedIn Learning",
    icon: "Palette",
    badge: "Design & UX",
    description: "User-centric problem solving, empathy-driven product discovery, and rapid prototyping principles."
  }
];

export const sportsAchievements = [
  {
    title: "National-Level Baseball Player",
    organization: "National Baseball Federation",
    representation: "Represented Bihar at National-Level Competitions",
    icon: "Trophy",
    details: "Demonstrated peak physical discipline, strategic on-field decision making, and elite team collaboration representing the state of Bihar."
  },
  {
    title: "National-Level Softball Player",
    organization: "National Softball Association",
    representation: "Represented Bihar at National-Level Competitions",
    icon: "Trophy",
    details: "Competed at the highest national inter-state level, honing quick reflexes, strategic resilience, and leadership under pressure."
  },
  {
    title: "District-Level Cricketer",
    organization: "District Cricket Association",
    representation: "Represented Sheikhpura, Bihar in District Cricket Competitions",
    icon: "Medal",
    details: "Competitive district tournament cricket showcasing tactical game awareness, endurance, and sporting spirit."
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Engineering Lead",
    role: "Mentor & Project Supervisor",
    company: "Bhuma Infotech Pvt. Ltd.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
    quote: "During his internship, Ankit demonstrated remarkable diligence and quick grasp of both frontend React components and backend APIs in our Material Management System. He is an eager learner with a strong work ethic."
  },
  {
    id: 2,
    name: "Faculty Guide",
    role: "Department of Computer Science & Engineering",
    company: "Chandigarh University",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
    quote: "Ankit balances academic research in Free Space Optics and deep learning models with commendable dedication. His national sports background reflects in his discipline, team spirit, and tenacity to solve difficult problems."
  }
];

export const contactConfig = {
  // Provider: 'formspree' or 'emailjs'
  // Formspree Form ID (e.g., 'mzzpkybw' or 'xpwzqabk' from https://formspree.io)
  formspreeId: import.meta.env.VITE_FORMSPREE_ID || "",

  // EmailJS credentials (if preferred over Formspree)
  emailjsServiceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
  emailjsTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
  emailjsPublicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "",

  // Direct recipient email
  recipientEmail: "realankit3@gmail.com"
};

