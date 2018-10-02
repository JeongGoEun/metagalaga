import web3 from './web3';
import MetaGalaga from './build/MetaGalaga.json';
const instance = new web3.eth.Contract(
    JSON.parse(MetaGalaga.interface),
    '0xa86fb39bfad3271ab90dc7bd451b828a947c36f8'
);

export default instance;