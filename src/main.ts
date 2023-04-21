import { parse } from "comment-parser";
import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";
import { Commenter } from "./typings/define";

interface readFilesType {
  path: string;
  content: string;
}

function readAllFile(
  root: string,
  files: readFilesType[] = []
): readFilesType[] {
  const dir = readdirSync(root);
  dir.forEach(item => {
    const fullPath = join(root, item);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      readAllFile(fullPath, files);
    } else {
      const content = readFileSync(fullPath).toString();
      files.push({
        path: fullPath,
        content: content,
      });
    }
  });
  return files;
}

export default function main(options: Commenter.MainOptions) {
  const file = readAllFile(options.root);
  file.forEach(item => {
    const parsed = parse(item.content);
    console.log(`Parsed: ${item.path}`);
  });
}

main({
  root: join("./test"),
});
