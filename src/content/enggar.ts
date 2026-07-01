export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location?: string;
  highlights: string[];
  skills?: string[];
};

export type CertificationItem = {
  name: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
  credentialId?: string;
  skills?: string[];
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export const enggarProfile: {
  name: string;
  headline: string;
  contact: {
    email: string;
    linkedInUrl: string;
    githubUrl?: string;
    gitlabUrl?: string;
    mediumUrl?: string;
  };
  experience: ExperienceItem[];
  certifications: CertificationItem[];
  skillGroups: SkillGroup[];
} = {
  name: "Enggar",
  headline: "Site Reliability Engineer (ex-DBA)",
  contact: {
    email: "enggar.ranu@gmail.com",
    linkedInUrl: "https://www.linkedin.com/in/enggarranu/",
    githubUrl: "https://github.com/enggarranu",
    gitlabUrl: "",
    mediumUrl: "https://medium.com/@enggar.ranu",
  },
  experience: [
    {
      role: "Site Reliability Engineer",
      company: "ByteDance · Full-time",
      period: "Apr 2025 – Present · 1 yr 1 mo",
      location: "Greater Jakarta, Indonesia · On-site",
      highlights: [
        "Developing automation scripts using Python, Bash, and SQL to automate repetitive database management tasks.",
        "Integrating and configuring database automation tools for provisioning, scaling, and patching.",
        "Automating data migration processes between different database environments.",
        "Envisioning database engineering roadmap aligned with organizational vision.",
        "Setting up automated monitoring to identify bottlenecks and implementing optimization strategies.",
        "Automating backup and recovery processes for data integrity and disaster recovery.",
        "Implementing security automation to control access and protect sensitive data.",
        "Ensuring compliance through automated checks and operational standards.",
        "Troubleshooting issues related to automated database processes.",
      ],
      skills: ["Python", "Go", "Bash", "SQL"],
    },
    {
      role: "Database Administrator",
      company: "Tokopedia · Full-time",
      period: "Dec 2018 – Present · 7 yrs 5 mos",
      location: "Greater Jakarta Area, Indonesia",
      highlights: [
        "Maintain and monitor the usage, performance, integrity, and security of database servers.",
        "Root cause analysis, tuning, and troubleshooting during incidents or performance degradation.",
        "Routine performance assessments, health checks, and reporting based on evaluation results.",
        "Maintenance and migrations to improve database performance.",
        "Provide data and/or access for audit, fraud investigation, bug fixing, reporting, and approved requests.",
        "Build alerting systems to monitor database activity and failures in collaboration with dedicated teams.",
        "Build mechanisms to support database performance (replication methods, connection pooling, load balancers).",
        "Develop, manage, and test backup and recovery plans; assess existing plans regularly.",
        "Research and PoC technologies to improve existing database systems.",
        "Create and update database inventory documentation.",
        "Determine and enforce database policies, procedures, and standards.",
        "Provide weekly reporting on assignments to team lead.",
      ],
      skills: ["Go", "Bash"],
    },
    {
      role: "Core Engineer",
      company: "Digiasia Bios",
      period: "Feb 2018 – Dec 2018 · 11 mos",
      location: "Greater Jakarta Area, Indonesia",
      highlights: ["Worked on backend engineering and operational tooling."],
      skills: ["Go", "Bash"],
    },
    {
      role: "Financial Reporting and Database",
      company: "PT. Witami Tunai Mandiri",
      period: "Jan 2017 – Jan 2018 · 1 yr 1 mo",
      location: "Generali Tower fl 19, Gran Rubina Business Park, Epicentrum",
      highlights: [
        "Developed reporting data pipelines and maintained reporting servers.",
        "Set up Jenkins and Bitbucket integration.",
        "Implemented bi-directional replication for PostgreSQL (Postgres-BDR).",
        "Built APIs using Python Flask.",
        "Created EDW workflows using Python Pandas.",
        "Built CLT (Customer Loyalty) apps using Python and HTML5.",
        "Managed and provided data for user needs by request.",
      ],
      skills: ["Python", "PostgreSQL", "Bash"],
    },
    {
      role: "Backend Developer",
      company: "PT. Witami Tunai Mandiri",
      period: "May 2016 – Jan 2017 · 9 mos",
      highlights: [
        "Handled finance complaints and operational issues.",
        "Built batch programs (robots) for reporting and data integrity.",
        "Contributed to financial fraud investigation.",
        "Built APIs for partner (3rd-party) integrations.",
      ],
      skills: ["Bash"],
    },
    {
      role: "Java Developer",
      company: "PT. Witami Tunai Mandiri",
      period: "Nov 2015 – Feb 2016 · 4 mos",
      highlights: [
        "Built transaction websites using ZKoss.",
        "Built APIs for Truemoney website.",
        "Designed databases and implemented server-side logic.",
        "Created functions, stored procedures, triggers, views, and sequences in PostgreSQL.",
        "Database optimization: analyze, indexing, archiving, vacuum, and backups.",
      ],
      skills: ["Java", "PostgreSQL"],
    },
    {
      role: "Full Stack Developer",
      company: "PT. CNAIndo Teknologi",
      period: "Oct 2014 – Nov 2015 · 1 yr 2 mos",
      highlights: [
        "Built BOFIS and IDX standardisation for NH Korindo Securities using C, VB-Script, and Oracle.",
        "Maintained backoffice tools and reporting systems for Clemont Finance using JSP, JBoss, and Oracle.",
        "Maintained BEST trading application for BCA Sekuritas; Python/C backend with PHP/JS frontend.",
        "Helped develop Proban-POS for POS/cash machines using Unicenta and MySQL.",
      ],
      skills: ["Python", "Oracle", "MySQL", "JavaScript"],
    },
    {
      role: "Laboratory Assistant",
      company: "Universitas Gunadarma",
      period: "2012 – 2014 · 2 yrs",
      highlights: [
        "Laboratory Assistant of Informatics Engineering.",
        "Laboratory Assistant of Computer Development Division.",
      ],
    },
  ],
  certifications: [
    {
      name: "GCP: Complete Google Data Engineer and Cloud Architect Guide",
      issuer: "Udemy",
      date: "Issued Jul 2025",
      credentialId: "UC-070feefb-64ec-471d-bd4f-da649ebd21fc",
      credentialUrl: "https://www.udemy.com/certificate/UC-070feefb-64ec-471d-bd4f-da649ebd21fc/",
      skills: ["Google Cloud Platform (GCP)", "Google Cloud Professional Data Engineer"],
    },
    {
      name: "SQL (Intermediate) Certificate",
      issuer: "HackerRank",
      date: "Issued Jul 2025",
      credentialId: "eba731858833",
      credentialUrl: "https://www.hackerrank.com/certificates/eba731858833",
      skills: ["MySQL"],
    },
    {
      name: "SQL (Advanced) Certificate",
      issuer: "HackerRank",
      date: "Issued Jul 2025",
      credentialId: "161ae3bf8c2f",
      credentialUrl: "https://www.hackerrank.com/certificates/161ae3bf8c2f",
      skills: ["MySQL", "Databases"],
    },
  ],
  skillGroups: [
    {
      title: "SRE & Operations",
      items: [
        "Monitoring",
        "Alerting",
        "Incident response",
        "On-call operations",
        "Problem solving",
        "Runbooks",
      ],
    },
    {
      title: "Database",
      items: [
        "MySQL",
        "Postgres",
        "Performance tuning",
        "Query optimization",
        "Indexing strategy",
        "Slow query analysis",
        "Replication",
        "Migrations",
      ],
    },
    {
      title: "Reliability & Performance",
      items: ["Capacity planning", "Bottleneck analysis", "Reliability improvements", "Troubleshooting"],
    },
  ],
};
