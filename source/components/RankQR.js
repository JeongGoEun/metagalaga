import web3 from '../../ethereum/web3'
import PropTypes from 'prop-types';
import metaGalaga from "../../ethereum/metaGalaga.js"
var QRCode = require('qrcode.react');
var React = require('react');

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
        var userScore=this.props.value;  //부모에서 id, score 받아오기
        var userId=this.props.user;
        var userAccount;
        var QRValue = userId+"/"+userScore.toString(); //구분자 : '/' 
        
        const accounts = web3.eth.getAccounts().then((result) => {
          userAccount=result[0];
        }).catch((err) => {
          console.log(err);
        });;

        /*var request = metaGalaga.methods.registerScore(userId,userScore).send({from: userAccount, value: web3.utils.toWei('1', 'ether'), gasPrice: '1'});
        var trxRequestUri = "meta://transaction?usage=registerScore&service=https%3A%2F%2Fmetagalaga.metadium.com"
                              + "&to=" + request.params[0].to 
                              + "&value" + request.params[0].value
                              + "&data=" + request.params[0].data;

        console.log("trxRequestUri : "+trxRequestUri);*/
        document.getElementById("QRBtn").innerHTML=userScore;  //버튼 랭킹 텍스트로 바꾸기
        this.setState({
          value: QRValue
        });
      };

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