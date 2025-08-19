import { ResumeModel } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class HeaderBlock implements IBlock {
  constructor(private d: ResumeModel["header"]) {}

  render(): HTMLElement {
    const header = document.createElement("header");
    header.className = "section header";

    const nameEl = document.createElement("h1");
    nameEl.textContent = this.d.fullName;
    header.appendChild(nameEl);

    const titleEl = document.createElement("p");
      titleEl.innerHTML = `<i>${this.d.title}<i>`;
    header.appendChild(titleEl);

    const { email, phone, location } = this.d.contacts ?? {};
    const contactParts = [email, phone, location].filter(Boolean);

    if (contactParts.length > 0) {
      const contactsEl = document.createElement("p");
      contactsEl.textContent = contactParts.join(" ");
      header.appendChild(contactsEl);
    }

    return header;
  }
}
