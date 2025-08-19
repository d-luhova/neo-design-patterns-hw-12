import { Skills } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class SkillsBlock implements IBlock {
  constructor(private d: Skills) {}

  render(): HTMLElement {
    const sec = document.createElement("section");
    sec.className = "section skills";

    const heading = document.createElement("h2");
    heading.textContent = "Skills";
    sec.appendChild(heading);

    const list = document.createElement("ul");
    list.className = "skills-list";

    Object.entries(this.d).forEach(([category, items]) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${category}:</strong> ${items.join(", ")}`;
      list.appendChild(li);
    });

    sec.appendChild(list);
    return sec;
  }
}
