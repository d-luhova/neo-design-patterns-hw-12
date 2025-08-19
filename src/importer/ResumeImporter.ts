import { AbstractImporter } from "./AbstractImporter";
import { ResumeModel } from "../models/ResumeModel";
import { BlockFactory } from "../blocks/BlockFactory";

export class ResumeImporter extends AbstractImporter<ResumeModel> {
  protected validate(): void {
    const raw = this.raw as any;

    if (typeof raw !== "object" || raw === null) {
      throw new Error("Неприпустимий формат JSON: очікується об'єкт");
    }

    const requiredFields = ["header", "summary", "experience", "education", "skills"];
    for (const field of requiredFields) {
      if (!(field in raw)) {
        throw new Error(`Відсутній обов'язковий блок: ${field}`);
      }
    }

    if (!raw.header.contacts) {
      throw new Error("Відсутній блок 'contacts' у заголовку");
    }
  }

  protected map(): ResumeModel {
    const raw = this.raw as any;

    return {
      header: {
        fullName: raw.header.fullName,
        title: raw.header.title,
        contacts: raw.header.contacts ?? {},
      },
      summary: raw.summary,
      experience: raw.experience,
      education: raw.education,
      skills: raw.skills,
    };
  }

  protected render(model: ResumeModel): void {
    const root = document.getElementById("resume-content");
    if (!root) {
      throw new Error("Контейнер #resume-content не знайдено");
    }

    root.innerHTML = "";

    const factory = new BlockFactory();

    root.appendChild(factory.createBlock("header", model).render());
    root.appendChild(factory.createBlock("summary", model).render());

    const experienceSection = document.createElement("section");
    experienceSection.className = "section experience";

    const experienceHeading = document.createElement("h2");
    experienceHeading.textContent = "Experience";
    experienceSection.appendChild(experienceHeading);

    model.experience.forEach(exp => {
      const block = factory.createBlock("experience", { experience: exp });
      experienceSection.appendChild(block.render());
    });

    root.appendChild(experienceSection);

    const educationSection = document.createElement("section");
    educationSection.className = "section education";

    const educationHeading = document.createElement("h2");
    educationHeading.textContent = "Education";
    educationSection.appendChild(educationHeading);

    model.education.forEach(edu => {
      const block = factory.createBlock("education", { education: edu });
      educationSection.appendChild(block.render());
    });

    root.appendChild(educationSection);
    root.appendChild(factory.createBlock("skills", model).render());
  }
}