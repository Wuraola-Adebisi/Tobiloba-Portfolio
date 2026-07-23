import Hero from "../components/Hero";
import ProjectsBento from "../components/ProjectsBento";
import SkillsBento from "../components/SkillsBento";
import Certifications from "../components/Certifications";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function DataLayout() {
  useDocumentTitle(
    "Tobiloba Adebisi, Data Engineer",
    "Data engineer designing serverless pipelines and streaming systems that turn raw data into decisions.",
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
