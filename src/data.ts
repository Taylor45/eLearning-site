import { Course, ConsultationType, CaseStudy, PortfolioProject } from './types';

export const COURSES: Course[] = [
  {
    id: 'lms-admin-mastery',
    title: 'LMS Administration & Ecosystem Architecture',
    code: 'ELC-101',
    description: 'Learn to design, deploy, and administer scalable Moodle, Canvas, and custom LMS setups with seamless external integrations.',
    duration: '6 Weeks (Self-Paced + Live Q&As)',
    price: 349,
    level: 'Intermediate',
    category: 'LMS',
    modules: [
      'LMS Paradigm Selection (Moodle vs Canvas vs Custom)',
      'User Authentication & SIS Integration (SAML, OAuth)',
      'Database Scaling and Media Streaming optimization',
      'SCORM, xAPI, LTI Integrations and Hooking',
      'Advanced Reporting, Gradebooks, and Learning Analytics',
      'Compliance, Security, and GDPR Data Policies'
    ],
    outcomes: [
      'Ability to provision and configure high-performance LMS instances.',
      'Integration of external third-party software using LTI 1.3 standard.',
      'Comprehensive data queries to track student/employee learning success.'
    ],
    popular: true
  },
  {
    id: 'ai-prompt-edu',
    title: 'Generative AI Prompt Engineering for Modern Educators',
    code: 'ELC-205',
    description: 'Integrate Gemini and OpenAI model chains into your content creation workflow to build custom interactive quizzes, slide scripts, and personalized student guides.',
    duration: '4 Weeks (Highly Interactive)',
    price: 199,
    level: 'Beginner',
    category: 'AI EdTech',
    modules: [
      'Foundations of Generative Models in Education',
      'Contextual Prompting Patterns for Lesson Design',
      'Automated Quiz, Assessment, and Rubric Synthesizers',
      'Designing Adaptive AI Tutors and Chatbots',
      'Handling AI Hallucinations and Academic Integrity Policy',
      'Automating Voice-Over Scripts and AI Avatars'
    ],
    outcomes: [
      'Save up to 15 hours per week of course content development time.',
      'Develop custom GPTs / Prompt chains tailored to specific course rubrics.',
      'Enhance individual student tutoring through custom AI guidelines.'
    ]
  },
  {
    id: 'adv-storyline-xapi',
    title: 'Advanced Articulate Storyline & xAPI (Tin Can) Engineering',
    code: 'ELC-312',
    description: 'Go beyond simple slide-clicking. Master JavaScript triggers, variable states, and custom xAPI statements to send rich tracking data to Learning Record Stores (LRS).',
    duration: '8 Weeks (Developer Track)',
    price: 499,
    level: 'Advanced',
    category: 'Instructional Design',
    modules: [
      'Advanced Variable Workflows & Conditionals in Storyline 360',
      'Integrating Javascript Triggers for Canvas/Web Controls',
      'Introduction to LRS (Learning Record Store) and Veracity/Yet Analytics',
      'Writing and Formatting Custom xAPI Actor-Verb-Object Statements',
      'State-Machine Tracking for Complex Interactive Simulators',
      'Publishing for SCORM 2004 vs. xAPI Web Deployments'
    ],
    outcomes: [
      'Build fully gamified, stateful interactive eLearning modules.',
      'Capture granular learning actions (e.g. video pause times, scroll depth).',
      'Design analytics dashboards that pull directly from LRS servers.'
    ],
    popular: false
  },
  {
    id: 'corp-pathway-architect',
    title: 'Corporate Upskilling Pathways & Training ROI',
    code: 'ELC-403',
    description: 'A strategic blueprint for Chief Learning Officers and HR leaders to map competencies, implement microlearning, and measure fiscal ROI on employee upskilling.',
    duration: '5 Weeks (Executive Track)',
    price: 399,
    level: 'Intermediate',
    category: 'Corporate',
    modules: [
      'Competency Framework Design and Skill Gap Auditing',
      'Microlearning Design (Designing Bite-Sized Content)',
      'Designing Metrics for Learning Transfer and On-the-job Action',
      'Calculating Fiscal ROI on Specialized Technical Upskilling',
      'Gamification, Badges, and Corporate Micro-Credentials',
      'Creating High-Adoption Peer Mentorship Ecosystems'
    ],
    outcomes: [
      'Create a formal, compliant upskilling framework ready for enterprise launch.',
      'Design an Excel/web dashboard model for tracking training-to-revenue ROI.',
      'Structure high-engagement microlearning blocks that yield 90%+ completion rates.'
    ],
    popular: true
  },
  {
    id: 'hybrid-k12-strategy',
    title: 'K-12 Digital Transformation & Blended Course Design',
    code: 'ELC-180',
    description: 'Transform traditional paper and blackboard curriculums into highly interactive, mobile-friendly blended lessons matching state and global standards.',
    duration: '6 Weeks (Academic Focus)',
    price: 249,
    level: 'Beginner',
    category: 'Academic',
    modules: [
      'Universal Design for Learning (UDL) in Virtual Classrooms',
      'Coordinating Synchronous (Zoom/Meet) vs. Asynchronous Workflows',
      'Gamifying Primary/Secondary Education with Web Tools',
      'Creating Safe, COPPA-Compliant Student Interaction Spaces',
      'Parent Portals and Continuous Progress Communications',
      'Assessing Practical Skills through Portfolio-Based eLearning'
    ],
    outcomes: [
      'Reposition fully asynchronous school subjects into high-retention hybrid formats.',
      'Adopt interactive software tools (Edpuzzle, Nearpod) with direct LMS grading.',
      'Draft safe COPPA-compliant online interaction and safety charters.'
    ]
  }
];

export const CONSULTATION_TYPES: ConsultationType[] = [
  {
    id: 'discovery-call',
    title: 'Free eLearning Strategy Discovery',
    duration: '30 Minutes',
    price: 0,
    description: 'A high-level introductory call to map out your organization’s current learning gaps, assess system scalability, and outline a custom roadmap.',
    features: [
      'Current LMS / Curriculum Audit overview',
      'High-level technology compatibility analysis',
      'eLearning ROI feasibility discussion',
      'No-obligation custom action proposal'
    ]
  },
  {
    id: 'lms-architecture-audit',
    title: 'Premium LMS Architecture Audit',
    duration: '60 Minutes',
    price: 180,
    description: 'A deep-dive technical diagnostic session targeting your existing LMS, security bottlenecks, authentication workflows, or custom integration bugs.',
    features: [
      'Hands-on system configuration analysis',
      'Database / Media streaming troubleshooting advice',
      'API, LTI & xAPI integration diagnostics',
      'Written PDF Diagnostic & Optimizations Report'
    ]
  },
  {
    id: 'storyboard-scoping',
    title: 'Curriculum & Interactive Storyboard Scoping',
    duration: '90 Minutes',
    price: 299,
    description: 'Collaborate face-to-face to sketch your core learning syllabus, establish user personas, outline gamification rules, and write a full storyboarding scoping outline.',
    features: [
      'Interactive Figma / Miro visual mapping session',
      'Pedagogical framework selection (ADDIE vs SAM)',
      'Interactive Javascript / Storyline feasibility check',
      'Detailed Content Development Timeline & Resource Matrix'
    ]
  },
  {
    id: 'corp-roi-roadmap',
    title: 'Enterprise Upskilling Roadmap & ROI Blueprint',
    duration: '2 Hours',
    price: 450,
    description: 'An executive strategy intensive for business leaders looking to roll out continuous learning, micro-credentials, and calculate fiscal training return.',
    features: [
      'Employee competency mapping framework setup',
      'Microlearning & badge ecosystem design strategy',
      'Comprehensive ROI financial formula calculator model',
      'Full delivery roadmap presentation for board approval'
    ]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'tech-academy',
    title: 'Migrating 25,000 Engineers to an AI-Augmented Academy',
    client: 'Global Tech Corp',
    sector: 'Technology & Enterprise',
    challenge: 'Inefficient onboarding cycles, stale technical slide decks, and zero tracking on deep practical developer capability.',
    solution: 'Engineered a highly available Canvas LMS environment connected with custom LLM-powered sandbox coding environments. Built xAPI reporting models that feed a centralized Learning Record Store.',
    results: [
      'Reduced average engineering onboarding time by 34% (from 45 days to 29.7 days).',
      'Achieved a 96% employee course completion and satisfaction rating.',
      'Collected 120,000+ custom xAPI event statements tracking exact student code solutions.'
    ],
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    metrics: [
      { label: 'Learners Integrated', value: '25,000+' },
      { label: 'Onboarding Reduction', value: '-34%' },
      { label: 'xAPI Statements Logs', value: '120k+' }
    ]
  },
  {
    id: 'health-credentials',
    title: 'Custom Gamified Compliance & Clinical Simulation Training',
    client: 'Centurion Medical Group',
    sector: 'Healthcare & Clinical Services',
    challenge: 'Critical compliance violations during fast-paced clinical scenarios, combined with low staff engagement on mandatory video learning.',
    solution: 'Designed and engineered 8 stateful Articulate Storyline modules depicting high-pressure emergency room decision trees. Simulated patient vital fluctuations based on user drug dose selection.',
    results: [
      'Zero compliance critical violations in audit cycles post-implementation.',
      '100% compliance rate achieved ahead of state regulatory deadlines.',
      'Interactive modules received "9.4/10" engagement index from clinical nursing staff.'
    ],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    metrics: [
      { label: 'Audit Infractions', value: '0' },
      { label: 'Compliance Index', value: '100%' },
      { label: 'Staff Engagement', value: '9.4/10' }
    ]
  },
  {
    id: 'blended-academic',
    title: 'Accrediting the Blended K-12 Stem Curriculum Framework',
    client: 'St. Jude Educational Group',
    sector: 'K-12 & Higher Education',
    challenge: 'Sudden demand to support fully remote and blended students while maintaining state physical-learning accreditation rules.',
    solution: 'Coordinated a comprehensive digital transformation plan. Restructured secondary school biology and physics curriculums into gamified interactive assignments synced to Canvas LMS.',
    results: [
      'Successfully certified and accredited by the Regional Board of Education.',
      'Blended students outperformed traditional classroom control groups by 11.4% on exams.',
      'Delivered training and certifications to 120 teachers on blended pedagogical models.'
    ],
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800',
    metrics: [
      { label: 'Accreditation Status', value: 'Approved' },
      { label: 'Exam Performance Lift', value: '+11.4%' },
      { label: 'Teachers Certified', value: '120' }
    ]
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'onboarding-course',
    title: 'Gamified Employee Onboarding Program',
    category: 'Storyline Courses',
    description: 'An interactive corporate onboarding simulator built in Articulate Storyline, guiding new hires through company culture, standard protocols, and custom workplace scenarios.',
    courseUrl: 'https://taylor45.github.io/Onboarding-Course/',
    processUrl: 'https://taylor45.github.io/Onboarding-Course-Storyboard/',
    tags: ['Articulate Storyline 360', 'Gamified Learning', 'Instructional Design', 'Corporate Training'],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
    achievements: [
      '100% responsive storyline container scaling',
      'Custom JavaScript variables to track player score state',
      'Comprehensive storyboard & instructional design plan documentation'
    ]
  },
  {
    id: 'stakeholder-communication',
    title: 'Mastering Stakeholder Communication',
    category: 'Storyline Courses',
    description: 'A professional executive development course guiding learners on stakeholder mapping, key conversation models, conflict resolution, and leadership briefing.',
    courseUrl: 'https://taylor45.github.io/Mastering-Stakeholder-Communication/',
    processUrl: 'https://docs.google.com/document/d/e/2PACX-1vT18WKrDAI5QlDL8mlbBsp1d7QRWx-3HFtpYJj77ywhimQOxvelYeWN6nhbtrnrEg/pub',
    tags: ['Articulate Storyline', 'Executive Coaching', 'Scenario-Based Branching'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    achievements: [
      'State-machine branching choices driving user-specific endings',
      'Accompanying 30-page published educational design document',
      'Interactive conflict simulation panels with real-time feedback'
    ]
  },
  {
    id: 'storyline-color-muse',
    title: 'Storyline Color Muse Web App',
    category: 'ID Tools & AI',
    description: 'A dynamic utility designed specifically for eLearning developers. Simplifies color palette mapping, contrast checks, and instant theme export for Articulate Storyline.',
    courseUrl: 'https://storyline-color-muse.lovable.app',
    tags: ['EdTech SaaS', 'React', 'UX/UI Design Tool', 'Vibe Coding'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    achievements: [
      'Instant CSS, HEX, and XML theme configuration builder',
      'Live WCAG AAA contrast safety grading',
      'Acclaimed utility among active Articulate Storyline designers'
    ]
  },
  {
    id: 'ld-chatgpt-assistant',
    title: 'L&D Assistant & Curriculum Synthesizer',
    category: 'ID Tools & AI',
    description: 'A custom generative AI model pre-prompted with validated ADDIE and SAM systems to compile high-quality lesson outlines, script storyboards, and design rubrics.',
    courseUrl: 'https://chatgpt.com/g/g-69f30834c8a08191a5c67318fd39e2f9-learning-development-assistant',
    tags: ['Custom GPT', 'AI Prompt Engineering', 'ADDIE System'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=800',
    achievements: [
      'Pre-prompted with professional curriculum taxonomies',
      'Outputs direct storyboarding tables ready for import',
      'Reduces lesson outline scoping times by up to 80%'
    ]
  },
  {
    id: 'ai-literacy-ebook',
    title: 'AI Literacy for Educators (Interactive eBook & Slides)',
    category: 'eBooks & OER',
    description: 'An interactive publication and slide deck detailing the core competencies of artificial intelligence in K-12 and higher education, prompt designs, and AI safety.',
    courseUrl: 'https://read.bookcreator.com/QPcUKyNvDVPMQ5RGGKJAjxWhTP12/JDaqxZtXT6mXbh1IHZoWkQ',
    processUrl: 'https://taylor45.github.io/Interactive-Slides/',
    tags: ['Interactive Publication', 'AI Literacy', 'OER Release'],
    image: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=800',
    achievements: [
      'Multi-platform interactive reader integration',
      'Accompanying presentation slides for active teaching delivery',
      'Fully downloadable curriculum worksheets & matrices'
    ]
  },
  {
    id: 'ai-literacy-oer-hub',
    title: 'OER AI Literacy Learning Hub',
    category: 'eBooks & OER',
    description: 'A comprehensive Open Educational Resources repository hosting open-access lesson plans, downloadable guides, and digital worksheets for K-12 AI integration.',
    courseUrl: 'https://ailiteracybybrucemabasa.weebly.com/',
    tags: ['OER Hub', 'Weebly Site', 'Academic Community'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    achievements: [
      'Open-source repository licensed under Creative Commons',
      'Includes structured guides reviewed by curriculum experts',
      'Highly intuitive visual organization and searchability'
    ]
  },
  {
    id: 'storyline-interactive-sim',
    title: 'Articulate Storyline Interactive Simulator',
    category: 'Storyline Courses',
    description: 'An interactive course deployment testing custom variables, dial controls, and states in a package fully compliant with SCORM 1.2 & 2004 standards.',
    courseUrl: 'https://taylor45.github.io/Storyline/',
    tags: ['Articulate Storyline', 'SCORM 2004', 'LMS Compliance'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    achievements: [
      'Dynamic sliders, drag & drop elements, and multi-state dials',
      'Comprehensive LRS/LMS data logging tests',
      'Optimized asset loading and caching parameters'
    ]
  }
];
