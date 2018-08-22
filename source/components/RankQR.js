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
        this.onClickCancel=this.onClickCancel.bind(this);
      }
    
      update = () => {
        var userScore=this.props.value.toString();  //부모에서 id, score 받아오기
        var userId=this.props.user;
        var QRValue = userId+"/"+userScore; //구분자 : '/' 

        document.getElementById("QRBtn").innerHTML=userScore;  //버튼 랭킹 텍스트로 바꾸기
        this.setState({
          value: QRValue
        });

        console.log("RankQR.update()'s value : "+this.state.value);
      };

      onClickCancel(){  //cancel 버튼을 누르면 메인 화면으로 돌아갈 수 있도록
        this.props.clickCancel(); // Demo.js의 clickCancel 호출
      }

      render(){
          return(
            <div>
                <button id="QRBtn" onClick={this.update.bind(this)} >{"QRCode"}</button>
                <QRCode id="ScoreQRCode" style={{padding: '2em'}}
                value={this.state.value}  // 부모에서 값 가져오기
                size={this.state.size}
                fgColor={this.state.fgColor}
                bgColor={this.state.bgColor}
                level={this.state.level}
                renderAs={this.state.renderAs}
                />
                <button id="cancelBtn" onClick={this.onClickCancel.bind(this)}> {"cancel"} </button>
            </div>
          );
      }
}

export default RankQR;