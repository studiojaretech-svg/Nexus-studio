export interface ProjectSpec {
  engine: string;
  architecture: string;
  settlement: string;
  tickRate: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  genre: string;
  category: "Flagship" | "Core Network" | "Incubator";
  releaseStatus: "Mainnet Live" | "Testnet Phase 3" | "Alpha Staging" | "Devnet";
  releaseYear: string;
  engine: string;
  description: string;
  image: string;
  heroImage: string;
  thumbnail: string;
  contractStandard: string;
  specs: ProjectSpec;
  tags: string[];
  metrics: {
    tpsPeak: string;
    activeNodes: string;
    volume24h: string;
  };
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: "neo-kyoto-2088",
    title: "Neo-Kyoto: 2088",
    subtitle: "Open-World Narrative RPG",
    genre: "Open-World / Cyberpunk",
    category: "Flagship",
    releaseStatus: "Mainnet Live",
    releaseYear: "2026",
    engine: "Unreal Engine 5.4",
    description:
      "Explore a vibrant neon metropolis featuring persistent player economies, customizable safehouses, and token-bound character progression.",
    image: "/games/neo-kyoto.jpg",
    heroImage: "/games/neo-kyoto.jpg",
    thumbnail: "/games/neo-kyoto.jpg",
    contractStandard: "ERC-6551 / ERC-721C",
    specs: {
      engine: "Unreal Engine 5.4",
      architecture: "Layer 3 Gaming Rollup",
      settlement: "Sub-Second Finality",
      tickRate: "128 Hz Server Mesh",
    },
    tags: ["Persistent World", "Player Economy", "Character Ownership"],
    metrics: {
      tpsPeak: "4,820 TPS",
      activeNodes: "1,240",
      volume24h: "$1.4M",
    },
  },
  {
    id: 2,
    slug: "valkyries-bane",
    title: "Valkyrie's Bane",
    subtitle: "Nordic Action Adventure",
    genre: "Action / Dark Fantasy",
    category: "Flagship",
    releaseStatus: "Testnet Phase 3",
    releaseYear: "2026",
    engine: "Custom C++ Core",
    description:
      "A third-person tactical combat adventure through Norse mythology where crafted weapons carry verifiable in-game history and achievements.",
    image: "/games/valkyries-bane.jpg",
    heroImage: "/games/valkyries-bane.jpg",
    thumbnail: "/games/valkyries-bane.jpg",
    contractStandard: "Dynamic Metadata ERC-1155",
    specs: {
      engine: "Custom C++ Core",
      architecture: "Modular Data Availability",
      settlement: "Instant Validation",
      tickRate: "64 Hz Deterministic",
    },
    tags: ["Progression", "Crafting", "Skill-Based Combat"],
    metrics: {
      tpsPeak: "1,940 TPS",
      activeNodes: "890",
      volume24h: "$860K",
    },
  },
  {
    id: 3,
    slug: "eclipse-horizon",
    title: "Eclipse Horizon",
    subtitle: "Multiplayer Sci-Fi Strategy",
    genre: "Space Simulator / Strategy",
    category: "Core Network",
    releaseStatus: "Alpha Staging",
    releaseYear: "2026",
    engine: "Spatial Network Grid",
    description:
      "Command fleets, claim territory, and trade natural resources across player-built space stations in an evolving galactic sandbox.",
    image: "/games/eclipse-horizon.jpg",
    heroImage: "/games/eclipse-horizon.jpg",
    thumbnail: "/games/eclipse-horizon.jpg",
    contractStandard: "Diamond Standard (ERC-2535)",
    specs: {
      engine: "Spatial Network Grid",
      architecture: "Distributed Ledger",
      settlement: "Cross-Rollup Sync",
      tickRate: "30 Hz State Sync",
    },
    tags: ["Fleet Management", "Alliance Battles", "Resource Trading"],
    metrics: {
      tpsPeak: "12,400 TPS",
      activeNodes: "3,400",
      volume24h: "$3.1M",
    },
  },
  {
    id: 4,
    slug: "sector-zero",
    title: "Sector Zero",
    subtitle: "Tactical Extraction Game",
    genre: "Shooter / Tactical Extraction",
    category: "Core Network",
    releaseStatus: "Mainnet Live",
    releaseYear: "2025",
    engine: "Unreal Engine 5.3",
    description:
      "Squad-based survival across abandoned research zones. Complete contracts, collect specialized gear, and store rare items in secure player vaults.",
    image: "/games/sector-zero.webp",
    heroImage: "/games/sector-zero.webp",
    thumbnail: "/games/sector-zero.webp",
    contractStandard: "ERC-721 Collection",
    specs: {
      engine: "Unreal Engine 5.3",
      architecture: "Low-Latency Rollback",
      settlement: "Session Confirmation",
      tickRate: "128 Hz Competitive",
    },
    tags: ["Competitive", "Squad Play", "Secure Inventory"],
    metrics: {
      tpsPeak: "6,100 TPS",
      activeNodes: "1,550",
      volume24h: "$1.9M",
    },
  },
  {
    id: 5,
    slug: "abyssal-trench",
    title: "Abyssal Trench",
    subtitle: "Atmospheric Survival Simulator",
    genre: "Survival / Exploration",
    category: "Incubator",
    releaseStatus: "Devnet",
    releaseYear: "2027",
    engine: "UE5 Lumen Core",
    description:
      "Construct underwater habitats, manage energy production, and trade specialized tools in a community-driven ocean world.",
    image: "/games/abyssal-trench.jpg",
    heroImage: "/games/abyssal-trench.jpg",
    thumbnail: "/games/abyssal-trench.jpg",
    contractStandard: "ERC-4337 Account Abstraction",
    specs: {
      engine: "UE5 Lumen Core",
      architecture: "Decentralized File Storage",
      settlement: "Gasless Transactions",
      tickRate: "60 Hz Dynamic",
    },
    tags: ["Base Building", "Seamless Wallets", "Co-Op"],
    metrics: {
      tpsPeak: "850 TPS",
      activeNodes: "420",
      volume24h: "$210K",
    },
  },
  {
    id: 6,
    slug: "paradox-shift",
    title: "Paradox Shift",
    subtitle: "Precision Time-Loop Platformer",
    genre: "Platformer / Time Manipulation",
    category: "Incubator",
    releaseStatus: "Testnet Phase 3",
    releaseYear: "2026",
    engine: "Deterministic WebAssembly",
    description:
      "A fast-paced puzzle platformer featuring verifiable leaderboards, community track creation, and competitive speedrun seasons.",
    image: "/games/paradox-shift.jpg",
    heroImage: "/games/paradox-shift.jpg",
    thumbnail: "/games/paradox-shift.jpg",
    contractStandard: "Zero-Knowledge Verifier",
    specs: {
      engine: "Deterministic WebAssembly",
      architecture: "Proof-Based Validation",
      settlement: "Instant Confirmation",
      tickRate: "240 Hz Client",
    },
    tags: ["Speedruns", "Leaderboards", "Community Levels"],
    metrics: {
      tpsPeak: "3,200 TPS",
      activeNodes: "780",
      volume24h: "$540K",
    },
  },
];