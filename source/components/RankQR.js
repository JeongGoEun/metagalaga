import web3 from '../../ethereum/web3';
import PropTypes from 'prop-types';

const compiledMetaGalaga = require('../../ethereum/build/MetaGalaga.json');
const mgContractAddr='0x8101487270f5411cf213b8d348a2ab46df66245d';
let metaGalaga;

var QRCode = require('qrcode.react');
var React = require('react');
var userScore;
var userName;
class RankQR extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          value: 'https://github.com/JeongGoEun/MetaGalaga/',
          size: 128,
          fgColor: '#000000',
          bgColor: '#ffffff',
          level: 'L',
          renderAs: 'svg',
        };
        this.update=this.update.bind(this); //QR update function binding
    }

      update = () => {
        metaGalaga = new web3.eth.Contract(JSON.parse(compiledMetaGalaga.interface), mgContractAddr); 

        userScore=this.props.value;  //부모에서 id, score 받아오기
        userName=this.props.user;
        var QRValue = userName+"/"+userScore.toString(); //구분자 : '/' 
        
        const accounts = web3.eth.getAccounts().then((result) => {
          console.log("default account : "+result[0]);

        var request = metaGalaga.methods.registerScore(userName,userScore).send({from: result[0], value: web3.utils.toWei('0', 'ether'), gasPrice: '1'});

        var trxRequestUri = "meta://transaction?usage=registerScore&service=https%3A%2F%2Fmetagalaga.metadium.com"
                              + "&to=" + request.params[0].to 
                              + "&value" + request.params[0].value
                              + "&data=" + request.params[0].data;

        console.log("trxRequestUri : "+trxRequestUri);

        document.getElementById("QRBtn").innerHTML=userScore;  //버튼 랭킹 텍스트로 바꾸기
        this.setState({
          value: QRValue
        });
        });
      }

      render(){
          // The gray background
          const backdropStyle = {
            position: 'fixed',
            top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0,0,0,0.3)',
              padding: 50
            };

            // The modal "window"
          const modalStyle = {
            backgroundColor: '#fff',
            borderRadius: 5,
            maxWidth: 400,
            minHeight: 420,
            margin: '0 auto',
            padding: 30
          };
          

          return(
            <div className="backdrop" style={backdropStyle}>
                  <div className="modal" style={modalStyle}>
                    <QRCode id="ScoreQRCode" style={{padding: '2em', marginLeft: '100px'}}
                    value={this.state.value}  // 부모에서 값 가져오기
                    size={this.state.size}
                    fgColor={this.state.fgColor}
                    bgColor={this.state.bgColor}
                    level={this.state.level}
                    renderAs={this.state.renderAs}
                    />

                    <div className="footer">
                      <button id="QRBtn" onClick={this.update.bind(this)}>{"QRCode"}</button>
                      <button onClick={this.props.onClose}>Close</button>
                    </div>
                  </div>

                  
            </div>
          );
      }
}

RankQR.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
}

export default RankQR;