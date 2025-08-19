import { Experience } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";
import { ProjectBlock } from "./ProjectBlock";
import { HighlightDecorator } from "../decorators/HighlightDecorator";

export class ExperienceBlock implements IBlock {
  constructor(private d: Experience) {}

  render(): HTMLElement {
    const item = document.createElement("div");
    item.className = "experience-item";

    const positionLine = document.createElement("p");
    positionLine.innerHTML = `<strong>${this.d.position}</strong> at <i>${this.d.company}<i> (${this.d.start} – ${this.d.end})`;
    item.appendChild(positionLine);

    this.d.projects.forEach(project => {
      const block: IBlock = new ProjectBlock(project);
      const rendered = project.isRecent
        ? new HighlightDecorator(block).render()
        : block.render();
      item.appendChild(rendered);
    });

    return item;
  }
}

