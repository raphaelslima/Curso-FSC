const path = require("path");
const fs = require("fs");

console.log(__filename);
console.log(__dirname);

// pegar o nome do arquivo
console.log("Nome do arquivo: " + path.basename(__filename));

// extenção do arquivo
console.log("Extensão do arquivo: " + path.extname(__filename));

// Criar um arquivo no diretorio arual
fs.writeFile(path.join(__dirname, "myFile.txt"), "oi", () => {});
