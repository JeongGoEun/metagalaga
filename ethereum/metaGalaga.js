import web3 from './web3';
import MetaGalaga from './build/MetaGalaga.json';
const instance = new web3.eth.Contract(
    JSON.parse(MetaGalaga.interface),
    '0xa9a6bbfd3e6d9ae8e1297b34b918941b7f0209a9'
);

export default instance;