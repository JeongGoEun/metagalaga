'use-strict'

import PropTypes from 'prop-types';
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
        var userScore=this.props.value.toString();  //부모에서 id, score 받아오기
        var userId=this.props.user;
        var QRValue = userId+"/"+userScore; //구분자 : '/' 

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

                    <button id="QRBtn" onClick={this.update.bind(this)}>{"QRCode"}</button>
                    <QRCode id="ScoreQRCode" style={{padding: '2em', marginLeft: '65px'}}
                    value={this.state.value}  // 부모에서 값 가져오기
                    size={this.state.size}
                    fgColor={this.state.fgColor}
                    bgColor={this.state.bgColor}
                    level={this.state.level}
                    renderAs={this.state.renderAs}
                    />

                    <div className="footer">
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