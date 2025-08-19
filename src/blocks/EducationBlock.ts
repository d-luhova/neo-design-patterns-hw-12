import { Education } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class EducationBlock implements IBlock {
  constructor(private d: Education) {}

  render(): HTMLElement {
    const item = document.createElement("div");
    item.className = "education-item";

    const line = document.createElement("p");
    line.textContent = `${this.d.degree} ${this.d.field}, ${this.d.institution} (${this.d.graduation})`;
    item.appendChild(line);

    return item;
  }
}
