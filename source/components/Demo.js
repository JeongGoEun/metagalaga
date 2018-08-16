import React, { Component } from "react";
import Unity, { UnityContent } from "react-unity-webgl";

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userScore: 0
    };

    this.unityContent = new UnityContent(
      "/static/unity/Build/Build/Build.json",
      "/static/unity/Build/Build/UnityLoader.js"
    );

    this.unityContent.on("SendId",MetaId => { //유니티에서 오는 것
      console.log("Unity id : "+MetaId);
    });

    this.unityContent.on("GameOver",userScore => {
      this.setState=userScore;
      console.log("Unity score : "+userScore);
      document.getElementById("rankingBtn").innerHTML=userScore;  //버튼 랭킹 텍스트로 바꾸기
    });
  }

  onClickStart(){

  }

  render() {
    return (
      <div>
        <button id="rankingBtn" onClick={this.onClickStart.bind(this)} >{"Ranking"}</button>
        <Unity unityContent={this.unityContent} />
      </div>
    );
  }
}
