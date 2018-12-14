const path = require('path')
const solc = require('solc')
const fs = require('fs-extra')

const buildPath = path.resolve(__dirname, 'build')
fs.removeSync(buildPath)

const metaGalagaPath = path.resolve(__dirname, 'contracts', 'MetaGalaga.sol')
const ownablePath = path.resolve(__dirname, 'contracts', 'Ownable.sol')

const source = {
  'MetaGalaga.sol': fs.readFileSync(metaGalagaPath, 'utf8'),
  'Ownable.sol': fs.readFileSync(ownablePath, 'utf8')
}

const outputs = solc.compile({ sources: source }, 1).contracts
console.log('error: ', solc.compile({ sources: source }, 1).errors)

fs.ensureDirSync(buildPath)

for (let contract in outputs) {
  console.log('contract: ', contract)
  fs.outputJsonSync(
    path.resolve(buildPath, `${contract.split('.', 1)[0]}.json`),
    outputs[contract]
  )
}

console.log('Successfully Compiled')
/* Compile with node compile.js command */
