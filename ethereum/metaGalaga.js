import web3 from './web3';
import MetaGalaga from './build/MetaGalaga.json';
const instance = new web3.eth.Contract(
    JSON.parse(MetaGalaga.interface),
    '0x3a16898bd858f7858585b72b0c65ed9b9c25c107'
);

export default instance;