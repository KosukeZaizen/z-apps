const fs = require('fs');

const replaceVersion = (fileName, newNumber) => {

    const content = fs.readFileSync(fileName, 'utf-8');

    const targetLine = content.split(";").filter(l => l.includes("APP_VERSION")).pop();
    const previousNumber = targetLine.split("=")[1].replace(" ", "");
    if (!newNumber) newNumber = Number(previousNumber) + 1;

    if (newNumber > 10000) newNumber = 1;
    const newContent = content.replace(previousNumber, newNumber);

    console.log(newContent);
    fs.writeFileSync(fileName, newContent);

    return newNumber;
}

const tsFileName = "./Z-Apps/ClientApp/src/version.ts";
const csFileName = "./Z-Apps/Version.cs";

replaceVersion(csFileName, replaceVersion(tsFileName));


// fs.readdir('.', function (err, files) {
//     if (err) throw err;
//     const fileList = files.filter(function (file) {
//         return fs.statSync(file).isFile() && /.*\.txt$/.test(file);
//     })
//     const resultFiles = fileList.filter(f => f.slice(0, 6) === "result" && f.slice(-10) != "finish.txt");

//     // fs.writeFileSync("qiita.txt", "");
//     for (let fileName of resultFiles) {
//         const text = fs.readFileSync(fileName, 'utf-8');
//         const title = fileName.replace("result_", "vus:")
//             .replace(".txt", "");

//         // fs.appendFileSync("qiita.txt", "####" + title + "\n\n\n```bat:" + fileName + "\n" + text + "\n```\n\n\n");
//     }
// });