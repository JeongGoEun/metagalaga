import web3 from './web3';
import MetaGalaga from './build/MetaGalaga.json';
const instance = new web3.eth.Contract(
    JSON.parse(MetaGalaga.interface),
    '0x8101487270f5411cf213b8d348a2ab46df66245d'
);

export default instance;