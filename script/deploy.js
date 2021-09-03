const fs = require('fs/promises')
const path = require('path')
const childProcess = require('child_process');


async function main () {
  // const files = await walkSync(path.resolve(__dirname, '..', 'docs'))
  // for (const file of files) {
  //   console.log(file, file.substr(path.resolve(__dirname, '..', 'docs').length));

  // }
  childProcess.execSync(`scp -r ${path.resolve(__dirname, '..', 'docs')} root@1.13.6.200:/www/hold_your_hand_grow_old_with_you/`)
}
main()

async function walkSync (dirPath) {
  let result = []
  const files = await fs.readdir(dirPath)
  for (const file of files) {
    var filePath = path.join(dirPath, file);
    var stat = await fs.stat(filePath);
    if (stat.isFile()) {
      result.push(filePath)
    } else if (stat.isDirectory()) {
      const subDir = await walkSync(filePath)
      result = result.concat(subDir);
    }
  }

  return result
}