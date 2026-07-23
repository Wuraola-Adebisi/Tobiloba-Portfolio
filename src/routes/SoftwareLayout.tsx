import Hero from "../components/Hero";
import ProjectsBento from "../components/ProjectsBento";
import SkillsBento from "../components/SkillsBento";
import Certifications from "../components/Certifications";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function SoftwareLayout() {
  useDocumentTitle(
    "Tobiloba Adebisi, Software Engineer",
    "Software engineer building fast, reliable web applications, from real time collaboration tools to production backend systems.",
  );

  return (
    <>
      <Hero />
      <ProjectsBento />
      <SkillsBento />
      <Certifications />
    </>
  );
}
