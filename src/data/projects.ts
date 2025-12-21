import codecraftImg from '@/assets/project-codecraft.jpg';
import splitrImg from '@/assets/project-splitr.jpg';
import agentImg from '@/assets/project-agent.jpg';


export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  techStack: string[];
  problem: string;
  solution: string;
  features: string[];
  challenges: string[];
  impressive: string;
  liveDemo?: string;
  sourceCode?: string;
}

export const projects: Project[] = [
  

  /* ================= SPLITR ================= */
  {
    id: 'splitr',
    title: 'Splitr- AI-Powered Expense Sharing App',
    tagline: 'AI-Powered Expense Splitting Platform',
    description:
      'A smart expense-sharing application that simplifies group finances by automatically categorizing expenses and suggesting fair splits.',
    image: splitrImg,
    techStack: [
      'Next.js',
      'JavaScript',
      'Convex',
      'Clerk',
      'Inngest',
      'GeminiAI API',
      'ShadCN UI',
      'Tailwind CSS'
    ],
    problem:
      'Manual expense tracking is time-consuming and often leads to disagreements over how shared costs should be split.',
    solution:
      'Developed an AI-driven system that categorizes expenses and suggests fair splits based on spending patterns.',
    features: [
      'Automatic expense categorization using AI',
      'Group-based expense tracking',
      'Smart split suggestions',
      'Settlement reminders and notifications',
      'Secure authentication and data storage',
    ],
    challenges: [
      'Ensuring accurate AI categorization with limited data',
      'Designing fair split logic for varied group scenarios',
      'Maintaining data consistency across users',
    ],
    impressive:
      'Achieved ~90% categorization accuracy during testing on real-world expense data.',
    liveDemo: 'https://splitr-q9gg.vercel.app/',
    sourceCode: 'https://github.com/dhruvbajaj13/Splitr',
  },

  /* ================= SMART AI AGENT ================= */
  {
    id: 'smart-agent',
    title: 'RAG-Based AI Agent with Web Search',
    tagline: 'RAG + Web Search + LangGraph',
    description:
      'An autonomous AI agent capable of reasoning, retrieving knowledge, and performing multi-step tasks using agentic workflows.',
    image: agentImg,
    techStack: [
      'Python',
      'LangChain',
      'LangGraph',
      'Pinecone',
      'Groq Llama 3',
      'FastAPI',
      'HuggingFace',
    ],
    problem:
      'Standard chatbots fail at complex reasoning, real-time research, and executing chained actions reliably.',
    solution:
      'Built an agentic system using LangGraph for workflow control, RAG for knowledge retrieval, and tool calling for real-world actions.',
    features: [
      'Multi-step reasoning using LangGraph',
      'Retrieval-Augmented Generation (RAG)',
      'Live web search integration',
      'Tool calling for APIs and services',
      'Conversation memory management',
    ],
    challenges: [
      'Preventing infinite agent loops',
      'Optimizing vector search performance',
      'Ensuring reliable tool execution',
    ],
    impressive:
      'Improved answer accuracy by 35% using LLM-powered RAG sufficiency checker and hybrid routing and reduced hallucations by 40% using context reranking and multi-source validation and decreased agent debugging/trace review time by 25% via transparent agent-trace pipeline',
    liveDemo: '#',
    sourceCode: 'https://github.com/dhruvbajaj13/RAG-Based-AI-Document-Agent',
  },
  /* ================= CODECRAFT ================= */
  {
    id: 'codecraft',
    title: 'CodeCraft- SaaS Code Editor and IDE',
    tagline: 'SaaS Code Editor and IDE',
    description:
      'A SaaS Code editor and IDE designed to streamline development by combining intelligent code assistance, real-time collaboration, and a modern web IDE experience.',
    image: codecraftImg,
    techStack: [
      'Next.js',
      'TypeScript',
      'Convex',
      'Clerk',
      'WebSockets',
      'LemonSqueezy',
      'ShadCN UI',
      'Tailwind CSS'
    ],
    problem:
      'Developers frequently rely on multiple disconnected tools for coding, AI help, collaboration, and reviews, which disrupts workflow and slows productivity.',
    solution:
      'Built a unified SaaS IDE that integrates AI-assisted coding, collaborative editing, and project management into a single platform.',
    features: [
      'AI-assisted code completion and refactoring',
      'Real-time collaborative editing with cursor sync',
      'Multi-language syntax highlighting via Monaco Editor',
      'Integrated terminal and file explorer',
      'Inline comments and review system',
      'Authentication and role-based access',
    ],
    challenges: [
      'Maintaining low-latency collaboration using WebSockets',
      'Handling concurrent edits without conflicts',
      'Optimizing AI responses for smooth editor experience',
    ],
    impressive:
      'Supports 20+ concurrent collaborators per workspace with sub-150ms editor sync latency during testing.',
    liveDemo: 'https://code-craft-two-livid.vercel.app/',
    sourceCode: 'https://github.com/dhruvbajaj13/CodeCraft',
  },

  /* ================= SYNTHEX ================= */
  {
    id: 'synthex',
    title: 'Synthex - AI Chrome Extension',
    tagline: 'AI Chrome Extension for Developers',
    description:
      'A Chrome extension that enhances developer productivity by providing instant AI-powered explanations, refactoring suggestions, and syntax help directly in the browser.',
    image: agentImg,
    techStack: [
      'JavaScript',
      'Chrome Extensions API',
      'GeminiAI API',
      'HTML',
      'CSS',
    ],
    problem:
      'Developers frequently switch tabs to understand unfamiliar code, errors, or syntax, breaking focus and workflow.',
    solution:
      'Built a lightweight Chrome extension that delivers contextual AI explanations and suggestions directly on selected code.',
    features: [
      'Instant AI explanation of selected code',
      'Context-aware refactoring suggestions',
      'Lightweight popup UI',
      'Works across documentation and code platforms',
      'Minimal permissions for security',
    ],
    challenges: [
      'Handling Chrome extension context isolation',
      'Optimizing API calls to reduce latency',
      'Designing a distraction-free UI',
    ],
    impressive:
      'Provides AI responses in under 1.5 seconds on average with minimal impact on browser performance.',
    sourceCode: 'https://github.com/dhruvbajaj13/Synthex',
  },
];
