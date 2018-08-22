import React, { Component } from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import RankQR from "./RankQR";

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
      //this.setState({userMetaId: userId})
      console.log("SendID : "+userId+"..."+this.state.userMeteId);
    });

    this.unityContent.on("GameOver", (userScore) => {  //유니티에서 게임이 끝났을 때
      this.setState({userScore: userScore});

      console.log("GameOver"+this.state.userMeteId);

      document.getElementById("rankQRCode").style.display="block";  //게임 끝났을 때 큐알, 버튼 띄우기
    });
  }

  clickCancel(){  //unity한테 메인 씬으로 돌아가라고 요청
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
