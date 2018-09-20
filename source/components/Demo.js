import React, { Component } from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import web3 from '../../ethereum/web3';
import { Login, Request, SendTransaction } from 'metasdk-react';

const compiledMetaGalaga = require('../../ethereum/build/MetaGalaga.json');
const mgContractAddr='0x3a16898bd858f7858585b72b0c65ed9b9c25c107';

var metaGalaga, userName, userScore;
var unityContent;

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.request = ['name'];

    unityContent = new UnityContent(
      "/static/unity/Build/Build/Build.json",
      "/static/unity/Build/Build/UnityLoader.js"
    );

    unityContent.on("SendId", (userMetaId) => { //유니티에서 오는 것
      document.getElementById('requestDiv').children[0].getElementsByTagName('button')[0].click();
    });

    unityContent.on("Login", () => {
      document.getElementById('requestDiv').children[0].getElementsByTagName('button')[0].click();
    });

    unityContent.on("StopInterval", () => {
      clearInterval(this.interval);
    });
    unityContent.on("GameOver", (_userScore) => {  //유니티에서 게임이 끝났을 때
        userScore = _userScore;
        this.checkListUpdate();
    });

    unityContent.on("RegisterScore",() => {  //register ranking event from unity
      const minScore = metaGalaga.methods.minScore().call();
      minScore.then((result) => {
        if(result < userScore) {
          var request = metaGalaga.methods.registerScore(userName, userScore).send.request({from: "", value: web3.utils.toWei('0', 'ether'), gasPrice: '1'});
      
          this.to = request.params[0].to;
          this.value = request.params[0].value;
          this.data = request.params[0].data;
                    
          this.forceUpdate();
          document.getElementById('sendTransactionDiv').children[0].getElementsByTagName('button')[0].click();
        }
      });
    });

    //function binding
    this.requestCallback = this.requestCallback.bind(this); 
    this.checkListUpdate = this.checkListUpdate.bind(this);
    this.SendTransactionCallback = this.SendTransactionCallback.bind(this);
  }

  componentDidMount() {
    //flag=false; //for contract information
    document.getElementById('sendTransactionDiv').style.display = "none";
    document.getElementById('requestDiv').style.display = "none";
    
    //Get MetaGalaga contract
    metaGalaga = new web3.eth.Contract(JSON.parse(compiledMetaGalaga.interface), mgContractAddr); 
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  checkListUpdate() {
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

          }).catch((err) => {
            console.log(err);
          });          
        }
  }

  requestCallback(arg) {
    this.request.map((req) => {
      userName = arg[req];
      unityContent.send("Canvas","onRequest", userName.toString()); //For Change Login button text

      return req;
    });
  }

  SendTransactionCallback(arg) {
    var receipt = web3.eth.getTransactionReceipt(arg['txid']);
    if(receipt != null) {
      //start interval for updating dynamic scroll view 
      console.log('Score board update');
      this.checkListUpdate();
      document.getElementById('sendTransactionDiv').children[0].getElementsByTagName('button')[0].click();  //enable SendTransaction QR Code
    }
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
            qrsize={256}
            qrvoffset={20}
            qrpadding='4em'
            qrposition='bottom right'
            callback = {this.requestCallback}
          />
        </div>
        }
        
        <div id='sendTransactionDiv'>
        {this.data != undefined &&
          <SendTransaction
            to = {this.to}
            value = {this.value}
            data= {this.data}
            usage= 'registerScore'
            service = 'MetaGalaga'
            qrsize={256}
            qrvoffset={20}
            qrpadding='4em'
            qrposition='bottom right'
            callback={this.SendTransactionCallback}
          />
        }
        </div>
      </div>
    );
  }
}
