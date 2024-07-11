import { generateTemplateFiles } from "generate-template-files";
import { exec } from "child_process";

generateTemplateFiles([
  {
    option: "Crud",
    defaultCase: "(pascalCase)",
    entry: {
      folderPath: "./generator/basic-crud",
    },
    stringReplacers: [
      {
        question: "Escriba el nombre del modulo en PascalCase",
        slot: "__name__",
      },
    ],
    output: {
      path: "./src/modules/__name__(kebabCase)",
      pathAndFileNameDefaultCase: "(kebabCase)",
      overwrite: false,
    },
  },
]);
