import React, { Component } from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import RankQR from "./RankQR";

export default class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userScore: 0,
      userMeteId: "",
      rankQRisVisible: false,
    }

    this.unityContent = new UnityContent(
      "/static/unity/Build/Build/Build.json",
      "/static/unity/Build/Build/UnityLoader.js"
    );

    this.unityContent.on("SendId", (userMetaId) => { //유니티에서 오는 것
      this.setState({userMetaId: userMetaId})
      console.log("Unity id - "+this.state.userMetaId);
      console.log("type "+typeof(userMetaId));
    });

    this.unityContent.on("GameOver", (userScore, userMeteId) => {  //유니티에서 게임이 끝났을 때
      this.setState({userScore: userScore});
      this.setState({userMeteId: userMeteId})
      document.getElementById("rankQRCode").style.display="block";
      console.log("GameOver values : "+this.state.userScore+"  "+this.state.userMeteId);
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
          <RankQR value={this.state.userScore} clickCancel={this.clickCancel.bind(this)}/>
        </div>
      </div>
    );
  }
}
