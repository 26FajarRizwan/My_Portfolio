import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";

export const metadata = { title: "Experience — Fajar Rizwan" };

export default function ExperiencePage() {
  return (
    <>
      <Experience />
      <Education />
      <Certifications />
    </>
  );
}
