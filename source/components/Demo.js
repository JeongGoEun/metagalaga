import React, { Component } from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import RankQR from "./RankQR";
import web3 from '../../ethereum/web3';
import { Login, Request, SendTransaction } from 'metasdk-react';

const compiledMetaGalaga = require('../../ethereum/build/MetaGalaga.json');
const mgContractAddr='0xa9a6bbfd3e6d9ae8e1297b34b918941b7f0209a9';

var metaGalaga, userName;
var flag=false;
var unityContent;

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.request = ['name'];

    this.state = {
      userScore: 0,
      userName: "nop",
    }

    unityContent = new UnityContent(
      "/static/unity/Build/Build/Build.json",
      "/static/unity/Build/Build/UnityLoader.js"
    );

    unityContent.on("SendId", (userMetaId) => { //유니티에서 오는 것
      this.setState({userName: userMetaId});

      document.getElementById('requestDiv').style.display = "none";

      console.log("SendID : "+this.state.userName);
    });

    unityContent.on("GameOver", (userScore) => {  //유니티에서 게임이 끝났을 때
      if(!flag){
        flag=true;
        this.setState({userScore: userScore});

        console.log("GameOver : "+this.state.userScore+", "+this.state.userName);

        var i, _name, _score, _metaId;
        for(i=1;i<=10;i++){
          //get Ranking from contract
          const ranking = metaGalaga.methods.rankMap(i).call();
          ranking.then((result) => {
            _metaId = result[0];
            _name = result[1];
            _score = result[2];

            unityContent.send("Panel - ScrollVew","SetUserMetaId", _metaId.toString());
            unityContent.send("Panel - ScrollVew","SetUserName", _name.toString());
            unityContent.send("Panel - ScrollVew","SetUserScore", _score.toString());

            //console.log(params);
          }).catch((err) => {
            console.log(err);
          });          
        }
        document.getElementById('sendTransactionDiv').style.visibility = 'hidden';
      }
    });

    unityContent.on("RegisterScore",() => {  //register ranking event from unity
      window.alert('Click Request Button');
    });

    this.requestCallback.bind(this);    
  }

  componentDidMount() {
    flag=false; //for contract information
    document.getElementById('sendTransactionDiv').style.display = "none";
    document.getElementById('requestDiv').style.display = "block";

    //get MetaGalaga contract
    metaGalaga = new web3.eth.Contract(JSON.parse(compiledMetaGalaga.interface), mgContractAddr); 
  }

  requestCallback(arg) {
    this.request.map((req) => {
      userName = arg[req];
      unityContent.send("Canvas","onRequest", userName.toString()); //For Change Login button text

      console.log('got', req, arg[req],unityContent);
      return req;
    });
  }

  SendTransactionCallback(arg) {
    console.log('requestCallback', arg);
  }

  render() {
    return (
      <div >
        <div style={{
          marginLeft: "15%",
          marginTop: "30px",
          width: "1024px",
          height: "768px",
        }}>
          <Unity unityContent={unityContent}/>
        </div>
        
        {unityContent != undefined &&
        <div id='requestDiv'>
          <Request
            request={this.request}
            service = 'MetaGalaga'
            callback = {this.requestCallback}
          />
        </div>
        }

        <div id='sendTransactionDiv'>
          <SendTransaction 
            to = {mgContractAddr}
            value = ''
            data= ' '
            service = 'MetaGalaga'
            callback={this.SendTransactionCallback}
          />
        </div>

      </div>
    );
  }
}
