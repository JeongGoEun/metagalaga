import web3 from './web3';
import MetaGalaga from './build/MetaGalaga.json';
const instance = new web3.eth.Contract(
    JSON.parse(MetaGalaga.interface),
    '0x0728a58a2bb52e36211b7d796abffdf73961a5da'
);

export default instance;