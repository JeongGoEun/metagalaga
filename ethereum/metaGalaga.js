import web3 from './web3'
import MetaGalaga from './build/MetaGalaga.json'
const instance = new web3.eth.Contract(
  JSON.parse(MetaGalaga.interface)
  , '0xcD181d3651EA3641607129c138eDA68631f63bFD'
)

export default instance
