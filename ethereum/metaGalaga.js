import web3 from './web3';
import MetaGalaga from './build/MetaGalaga.json';
import credentials from '../static/data/credentials.json';

const instance = new web3.eth.Contract(
    JSON.parse(MetaGalaga.interface),
    credentials.ropsten
);

export default instance;