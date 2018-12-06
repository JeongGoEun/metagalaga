# MetaGalaga
### Concept
- shooting game dapp using metadium blockchain

### Features
1. Login with MetaID App
2. Provide ranking system on Metadium Blockchain
    - A transaction occurs when registering in a ranking

## Web3
Before compiling, src/ethereum/web3-config.json should be provided following spec described in web3.js. Here is example:
```shell
{
    "url" : "https://ropsten.infura.io",
    "contractAddr": "0xA408FCD6B7f3847686Cb5f41e52A7f4E084FD3cc",
}
```

## Thanks to
- [react](https://www.npmjs.com/package/react)
- [react-unity-webgl](https://www.npmjs.com/package/react-unity-webgl)
- [metasdk-react](https://www.npmjs.com/package/metasdk-react)
- [web3](https://www.npmjs.com/package/web3)

## Run
```shell
git clone https://github.com/JeongGoEun/MetaGalaga.git
cd MetaGalaga
npm install && npm run dev
```

## License
MIT
