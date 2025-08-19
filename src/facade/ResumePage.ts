import { ResumeImporter } from "../importer/ResumeImporter";

export class ResumePage {
  async init(jsonPath: string): Promise<void> {
    try {
      const data = await this.fetchData(jsonPath);
      const importer = new ResumeImporter(data);
      importer.import();
    } catch (error) {
      console.error("Помилка ініціалізації резюме:", error);
    }
  }

  private async fetchData(path: string): Promise<unknown> {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Не вдалося завантажити файл: ${response.statusText}`);
    }
    return await response.json();
  }
}
