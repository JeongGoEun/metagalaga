import React, { Component } from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import RankQR from "./RankQR";
import web3 from '../../ethereum/web3';

const compiledMetaGalaga = require('../../ethereum/build/MetaGalaga.json');

let metaGalaga;
var flag=false;

export default class Demo extends Component {



  constructor(props) {
    super(props);
    var userId

    this.state = {
      userScore: 0,
      userMeteId: "nop",
    }

    this.unityContent = new UnityContent(
      "/static/unity/Build/Build/Build.json",
      "/static/unity/Build/Build/UnityLoader.js"
    );

    this.unityContent.on("SendId", (userMetaId) => { //유니티에서 오는 것
      userId=userMetaId;
      this.state.userMeteId=userId;
      console.log("SendID : "+userId+"..."+this.state.userMeteId);
    });

    this.unityContent.on("GameOver", (userScore) => {  //유니티에서 게임이 끝났을 때
      if(!flag){
        flag=true;
        this.setState({userScore: userScore});

        //get MetaGalaga contract
        metaGalaga = new web3.eth.Contract(JSON.parse(compiledMetaGalaga.interface), '0x7139045062ed2d678aabf80ccdcec0de768f356f'); 

        var i, _name, _score, _metaId;
        for(i=1;i<=10;i++){
          //get Ranking from contract
          const ranking = metaGalaga.methods.rankMap(i).call();
          ranking.then((result) => {
            _metaId = result[0];
            _name = result[1];
            _score = result[2];

            this.unityContent.send("Panel - ScrollVew","SetUserMetaId", _metaId.toString());
            this.unityContent.send("Panel - ScrollVew","SetUserName", _name.toString());
            this.unityContent.send("Panel - ScrollVew","SetUserScore", _score.toString());

            //console.log(params);
          }).catch((err) => {
            console.log(err);
          });          
        }
      }
      
      document.getElementById("rankQRCode").style.display="block";  //게임 끝났을 때 큐알, 버튼 띄우기
    })
  }

  clickCancel() {  //unity한테 메인 씬으로 돌아가라고 요청x
    document.getElementById("rankQRCode").style.display="none";
    this.unityContent.send("CancelBtnEvent","ClickCancelButton");
  }

  componentDidMount(){
    document.getElementById("rankQRCode").style.display="none";
  }
  render() {
    return (
      <div>
        <div>
          <Unity unityContent={this.unityContent} />
        </div>
        <div id="rankQRCode">
          <RankQR value={this.state.userScore} user={this.state.userMeteId} clickCancel={this.clickCancel.bind(this)}/>
        </div>
      </div>
    );
  }
}
