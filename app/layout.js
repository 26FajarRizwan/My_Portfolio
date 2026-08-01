import "./globals.css";
import "aos/dist/aos.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AosInit from "@/components/AosInit";

export const metadata = {
  title: "Fajar Rizwan — Full-Stack Developer & Agentic AI Engineer",
  description:
    "Portfolio of Fajar Rizwan — Full-Stack Developer (Next.js, FastAPI), Agentic AI Engineer (CrewAI), and Graphic Designer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AosInit />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
