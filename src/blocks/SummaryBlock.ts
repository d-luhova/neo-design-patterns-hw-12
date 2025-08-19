import { ResumeModel } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class SummaryBlock implements IBlock {
  constructor(private d: ResumeModel["summary"]) {}

  render(): HTMLElement {
    const el = document.createElement("section");
    el.className = "section summary";

    const heading = document.createElement("h2");
    heading.textContent = "Summary";
    el.appendChild(heading);

    const paragraph = document.createElement("p");
    paragraph.textContent = this.d.text;
    el.appendChild(paragraph);

    return el;
  }
}
