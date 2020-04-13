const fs = require('fs');

const replaceVersion = (fileName, newNumber) => {

    const content = fs.readFileSync(fileName, 'utf-8');

    const targetLine = content.split(";").filter(l => l.includes("APP_VERSION")).pop();
    const previousNumber = targetLine.split("=")[1].replace(" ", "");
    if (!newNumber) newNumber = Number(previousNumber) + 1;

    if (newNumber > 10000) newNumber = 1;
    const newContent = content.replace(previousNumber, newNumber);

    fs.writeFileSync(fileName, newContent);
    console.log(newContent);

    return newNumber;
}

const tsFileName = "./Z-Apps/ClientApp/src/version.ts";
const csFileName = "./Z-Apps/Version.cs";

replaceVersion(csFileName, replaceVersion(tsFileName));
