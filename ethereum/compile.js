const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const metaGalagaPath = path.resolve(__dirname, 'contracts', "MetaGalaga.sol");
console.log("metaGalagaPath : " + metaGalagaPath);

const source = fs.readFileSync(metaGalagaPath,'utf8');
console.log("source : " + source);

const outputs = solc.compile(source, 1).contracts;
console.log("outputs : " + outputs);
fs.ensureDirSync(buildPath);

for (let contract in outputs) {
    fs.outputJsonSync(
        path.resolve(buildPath, `${contract.replace(':', '')}.json`),
        outputs[contract]
    )
}

console.log('Successfully Compiled');