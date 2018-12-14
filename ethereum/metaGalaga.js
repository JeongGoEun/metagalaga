import web3 from './web3'
import MetaGalaga from './build/MetaGalaga.json'
const instance = new web3.eth.Contract(
  JSON.parse(MetaGalaga.interface)
  , '0x8150057f7e230a8a32569d7b6177883d6d3e8d8a'
)

export default instance
