const fs = require("fs");
const path = require("path");

// criar uma pasta
fs.mkdir(path.join(__dirname, "newFolder"), () => {});

// Criar um arquivo
fs.writeFile(
  path.join(__dirname, "newFolder", "newFile.txt"),
  "testeeeeeee",
  () => {}
);

// Escreve em um arquivo
fs.appendFile(
  path.join(__dirname, "newFolder", "newFile.txt"),
  "\nLocuraaaaaaaaaa",
  () => {}
);

// Ler um arquivo
fs.readFile(
  path.join(__dirname, "newFolder", "newFile.txt"),
  "utf-8",
  (error, data) => {
    console.log(data);
  }
);
