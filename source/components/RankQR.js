'use strict';

var QRCode = require('qrcode.react');
var React = require('react');
var ReactDOM = require('react-dom');

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
        var userScore=this.props.value.toString();
        document.getElementById("QRBtn").innerHTML=userScore;  //버튼 랭킹 텍스트로 바꾸기
        this.setState({
          value: userScore
        });
      };

      render(){
          return(
            <div>
                <button id="QRBtn" onClick={this.update.bind(this)} >{"QRCode"}</button>
                <QRCode id="ScoreQRCode" 
                value={this.state.value}  // 부모에서 값 가져오기
                size={this.state.size}
                fgColor={this.state.fgColor}
                bgColor={this.state.bgColor}
                level={this.state.level}
                renderAs={this.state.renderAs}
                />
            </div>
          );
      }
}

export default RankQR;