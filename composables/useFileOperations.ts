import type { ITask } from "~/store";
import { v4 as uuidv4 } from "uuid";

const SEPARATOR = " !@###@! "

export function useFileOperations() {
  const downloadTxtFile = (array: ITask[]) => {
    const content = array.map(({isDone, text}) => `[${isDone ? "X" : " "}]${SEPARATOR}${text}`).join("\n");
    const blob = new Blob([content], { type: 'text/plain' });
    const fileUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = 'tasks.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const importTxtFile = async (): Promise<ITask[]> => {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.txt';

      input.addEventListener('change', (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];

        if (file) {
          const reader = new FileReader();

          reader.onload = (event) => {
            const content = event.target?.result as string;
            const array = content.split('\n');
            const data = array.map(str => {
              const [isDoneText, text] = str.split(SEPARATOR);

              const isDone = isDoneText === "[X]"

              return {
                id: uuidv4(),
                text,
                isDone
              }
            })
            resolve(data);
          };

          reader.onerror = () => {
            reject(new Error('Failed to read the file.'));
          };

          reader.readAsText(file);
        }
      });

      input.click();
    });
  };

  return { downloadTxtFile, importTxtFile };
}