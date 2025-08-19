import { Project } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class ProjectBlock implements IBlock {
  constructor(private d: Project) {}

  render(): HTMLElement {
    const container = document.createElement("div");
    container.className = "project-item";
    container.textContent = `• ${this.d.name} – ${this.d.description}`;
    return container;
  }
}
