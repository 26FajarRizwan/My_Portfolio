import {
  Code2,
  Server,
  Database,
  Bot,
  Cpu,
  Cloud,
  GitBranch,
  Terminal,
  Layers,
  Palette,
  PenTool,
  Smartphone,
  Globe,
  Shield,
  Zap,
  Braces,
  Boxes,
  Rocket,
  Sparkles,
  Settings,
  Monitor,
  BarChart3,
} from "lucide-react";

// The fixed, professional icon set used across Abilities & Services.
// Admin picks one of these from a dropdown instead of typing free-text emoji.
export const ICON_MAP = {
  code: Code2,
  server: Server,
  database: Database,
  bot: Bot,
  cpu: Cpu,
  cloud: Cloud,
  git: GitBranch,
  terminal: Terminal,
  layers: Layers,
  palette: Palette,
  pen: PenTool,
  mobile: Smartphone,
  globe: Globe,
  shield: Shield,
  zap: Zap,
  braces: Braces,
  boxes: Boxes,
  rocket: Rocket,
  sparkles: Sparkles,
  settings: Settings,
  monitor: Monitor,
  chart: BarChart3,
};

export const ICON_OPTIONS = [
  { value: "monitor", label: "Monitor — Frontend / UI" },
  { value: "code", label: "Code — Development" },
  { value: "server", label: "Server — Backend" },
  { value: "database", label: "Database" },
  { value: "bot", label: "Bot — AI / Automation" },
  { value: "cpu", label: "CPU — Processing / Logic" },
  { value: "cloud", label: "Cloud — Deployment" },
  { value: "git", label: "Git — Version Control" },
  { value: "terminal", label: "Terminal — CLI" },
  { value: "layers", label: "Layers — Stack / Architecture" },
  { value: "palette", label: "Palette — Design" },
  { value: "pen", label: "Pen Tool — Graphic Design" },
  { value: "mobile", label: "Mobile — Responsive" },
  { value: "globe", label: "Globe — Web" },
  { value: "shield", label: "Shield — Security" },
  { value: "zap", label: "Zap — Performance" },
  { value: "braces", label: "Braces — Programming" },
  { value: "boxes", label: "Boxes — Modules / Systems" },
  { value: "rocket", label: "Rocket — Growth / Launch" },
  { value: "sparkles", label: "Sparkles — AI / Innovation" },
  { value: "settings", label: "Settings — Configuration" },
  { value: "chart", label: "Chart — Analytics" },
];

/** Renders the SVG icon for a given icon key, with a safe fallback. */
export function AppIcon({ name, ...props }) {
  const Cmp = ICON_MAP[name] || Sparkles;
  return <Cmp {...props} />;
}
