import "./globals.css";
import "aos/dist/aos.css";

export const metadata = {
  title: "Fajar Rizwan — Full-Stack Developer & Agentic AI Engineer",
  description:
    "Portfolio of Fajar Rizwan — Full-Stack Developer (Next.js, FastAPI), Agentic AI Engineer (CrewAI), and Graphic Designer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
