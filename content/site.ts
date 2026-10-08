export type DomainId = "technology" | "business" | "law" | "capital" | "ai" | "engineering" | "products" | "experiments";
export type WorldKind = "network" | "commerce" | "protocol" | "architecture" | "civic" | "ai" | "core";
export type Project = {
  id: string; name: string; category: string; status: string; year: string; color: string;
  world: WorldKind; domains: DomainId[]; summary: string; headline: string;
  idea: string; system: string; build: string; challenge: string; next: string;
  href?: string; linkLabel?: string; featured?: boolean;
};

export const profile = {
  name: "Syed Hasan Kuddos Sahib",
  brand: "HAJIHAZ",
  signature: "Building the unbuilt.",
  location: "Tamil Nadu, India",
  role: "Founder. Product builder. Law student.",
  // Business email verified on the AllBee public website. Personal socials remain unconfigured.
  email: "contact@allbeesolutions.com" as string | null,
  github: "https://github.com/hajihaz",
  repository: "https://github.com/hajihaz/Hajihaz",
  updated: "October 2026",
};

export const projects: Project[] = [
  {
    id: "allbee", name: "AllBee Solutions", category: "Business / digital systems", status: "Active business", year: "Ongoing",
    color: "#e0b568", world: "network", domains: ["business", "technology", "ai", "engineering"], featured: true,
    headline: "Connecting ambition to infrastructure.",
    summary: "A business built around digital experiences, software and the systems that connect them.",
    idea: "Help businesses bring their ideas into useful digital products and services.",
    system: "An ecosystem of websites, business tools and product experiments. I serve as Co-Founder & CFO of AllBee Solutions.",
    build: "Web experiences and application work, with ongoing attention to interface design, operational workflows and AI.",
    challenge: "Making many moving parts feel like one understandable experience.",
    next: "Keep improving the products and the systems behind the business.",
    href: "https://allbeesolutions.com", linkLabel: "Visit AllBee",
  },
  {
    id: "suplaykart", name: "Suplaykart", category: "Commerce / retail infrastructure", status: "In development", year: "Ongoing",
    color: "#a7bd9c", world: "commerce", domains: ["business", "products", "engineering"], featured: true,
    headline: "The local world. Connected.",
    summary: "A commerce project exploring the connection between local retail, inventory and delivery.",
    idea: "Build a more useful digital layer for local commerce.",
    system: "A storefront and operational foundation for products, suppliers, inventory and order workflows.",
    build: "A Next.js commerce codebase with a PostgreSQL data foundation and a modular application structure.",
    challenge: "The interface is only one piece. Reliable inventory and operational workflows matter just as much.",
    next: "Continue product development and validate the complete commerce journey.",
  },
  {
    id: "network", name: "HajiHaz Network", category: "Protocol / distributed infrastructure", status: "Experimental", year: "Ongoing",
    color: "#b4c4d8", world: "protocol", domains: ["technology", "engineering", "experiments"], featured: true,
    headline: "What holds a network together?",
    summary: "An experimental blockchain project investigating protocols, consensus and distributed systems.",
    idea: "Understand how a distributed system coordinates trust and agreement.",
    system: "A codebase covering networking, consensus, storage, wallet and protocol components.",
    build: "Go-based infrastructure with peer-to-peer networking and documented architecture.",
    challenge: "Correctness and security across many independent nodes, including failure cases.",
    next: "Continue research, verification and development. This is experimental infrastructure.",
  },
  {
    id: "rkn", name: "RKN Associates", category: "Client work / craftsmanship", status: "Website project", year: "2026",
    color: "#cab896", world: "architecture", domains: ["technology", "products"], featured: true,
    headline: "Craft deserves a crafted presence.",
    summary: "A digital presence for a stainless steel craftsmanship and fabrication business.",
    idea: "Translate a physical craft into a clear, considered digital experience.",
    system: "A multi-page website presenting the business, services and project work.",
    build: "HTML, CSS and JavaScript, with bilingual content and visual project storytelling.",
    challenge: "Bringing material quality and architectural detail into a responsive website.",
    next: "Maintain and refine the site as the business's portfolio evolves.",
    // RKN site link is withheld while its HTTPS endpoint returns a TLS error.
    // Verified source URL: https://rknassociates.com
  },
  {
    id: "namma", name: "Namma Road", category: "Civic technology / concept", status: "Concept", year: "Exploring",
    color: "#9bac93", world: "civic", domains: ["products", "experiments"], featured: true,
    headline: "Better systems. Better everyday lives.",
    summary: "A civic technology idea exploring how local infrastructure problems could become more visible.",
    idea: "Explore how technology could help surface everyday road and infrastructure issues.",
    system: "A proposed connection between local observations, structured information and public problem-solving.",
    build: "Concept-stage exploration. A deployed reporting product is not being claimed.",
    challenge: "Useful civic information needs context, participation and a route to real action.",
    next: "Define the scope and test whether the idea serves a real community need.",
  },
  {
    id: "hajihaz-ai", name: "HajiHaz AI", category: "AI / conversational products", status: "Active project", year: "Ongoing",
    color: "#b4c4d8", world: "ai", domains: ["ai", "technology", "products"],
    headline: "A space to think with AI.",
    summary: "An AI chat product exploring conversational experiences and useful creative tools.",
    idea: "Make AI assistance feel more accessible and personal.",
    system: "A conversational interface with evolving product features.",
    build: "Web application development, model integration and interface iteration.",
    challenge: "A useful AI product depends on reliability and interaction quality as much as model capability.",
    next: "Continue refining the experience and its creative capabilities.",
    href: "https://hajihazai.allbeesolutions.com", linkLabel: "Explore HajiHaz AI",
  },
  {
    id: "jarvis", name: "JARVIS", category: "Private / personal command center", status: "Private project", year: "Ongoing",
    color: "#e0b568", world: "core", domains: ["ai", "products", "engineering"],
    headline: "One place for the bigger picture.",
    summary: "A private personal command center connecting goals, planning and everyday execution.",
    idea: "Bring personal planning into one coherent workspace.",
    system: "An owner-only application bringing together goals, tasks and business planning.",
    build: "An evolving web application with durable data and cross-device interface work.",
    challenge: "Personal systems must stay reliable while the product keeps changing.",
    next: "Keep improving the private tool. Public access is not offered here.",
  },
  {
    id: "hajipay", name: "HajiPay", category: "Payments / infrastructure planning", status: "Planned", year: "Planning",
    color: "#a7bd9c", world: "protocol", domains: ["business", "engineering", "experiments"],
    headline: "A shared foundation for payments.",
    summary: "A planned internal payment orchestration layer for connected applications.",
    idea: "Give multiple products a consistent way to handle payment workflows.",
    system: "A planned modular service for payment intents, provider integration and reconciliation.",
    build: "Architecture and sandbox-first planning. A live payment service is not being claimed.",
    challenge: "Payment workflows need clear state, reliable records and careful verification.",
    next: "Validate the architecture and build a verified sandbox implementation.",
  },
];

export const domains: { id: DomainId; label: string; note: string; description: string }[] = [
  { id: "technology", label: "Technology", note: "The possibility layer", description: "Digital experiences, connected products and tools that make ideas tangible." },
  { id: "business", label: "Business", note: "The purpose layer", description: "Building ventures around real needs, workable operations and sustainable models." },
  { id: "law", label: "Law", note: "The responsibility layer", description: "LL.B. (Hons) studies with a focus on corporate law, structure and accountability." },
  { id: "capital", label: "Capital", note: "The decision layer", description: "An interest in financial markets, context, disciplined analysis and risk." },
  { id: "ai", label: "AI", note: "The intelligence layer", description: "Exploring useful AI experiences, conversational products and business automation." },
  { id: "engineering", label: "Engineering", note: "The foundation layer", description: "Thinking through interfaces, data, APIs, deployment and the details between them." },
  { id: "products", label: "Products", note: "The experience layer", description: "Turning a promising idea into something understandable and useful." },
  { id: "experiments", label: "Experiments", note: "The discovery layer", description: "Prototypes, protocol research and small tests that ask better questions." },
];

export const layers = [
  { label: "Interface", tech: "React / Next.js", title: "Where complexity becomes clear.", copy: "Navigation, interaction and visual design turn a system into something people can use." },
  { label: "Application", tech: "TypeScript / workflows", title: "The logic behind the experience.", copy: "User journeys, permissions and useful behavior connect the visible interface to the work underneath." },
  { label: "Services", tech: "APIs / integrations", title: "Systems that speak to each other.", copy: "Well-defined boundaries connect products, automate routine work and handle failures deliberately." },
  { label: "Data", tech: "PostgreSQL / persistence", title: "Memory that the product can trust.", copy: "Clear data models and durable records keep products consistent as they grow." },
  { label: "Infrastructure", tech: "Git / Vercel", title: "A repeatable path to production.", copy: "Versioned changes, verification and deployment bring an idea safely into the real world." },
];

export const timeline = [
  { year: "2021—24", title: "Understanding business.", copy: "BBA in Financial Services. A foundation in business and financial thinking.", tag: "Foundation" },
  { year: "2025", title: "Adding another lens.", copy: "Began LL.B. (Hons) studies, with a growing focus on corporate law.", tag: "Perspective" },
  { year: "Now", title: "Turning ideas into systems.", copy: "Building AllBee, developing Suplaykart and exploring connected software products.", tag: "Execution" },
  { year: "Next", title: "Building the unbuilt.", copy: "Keep learning, refine the products and let the work earn its place.", tag: "Ambition" },
];

export const currentFocus = [
  { label: "AllBee Solutions", note: "Digital products & business systems", project: "allbee" },
  { label: "Suplaykart", note: "Commerce development", project: "suplaykart" },
  { label: "Personal tools & AI", note: "JARVIS / HajiHaz AI", project: "jarvis" },
  { label: "Corporate law", note: "LL.B. (Hons) / ongoing studies", project: null },
];
