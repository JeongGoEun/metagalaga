import web3 from './web3';
import MetaGalaga from './build/MetaGalaga.json';
const instance = new web3.eth.Contract(
    JSON.parse(MetaGalaga.interface),
);

export default instance;