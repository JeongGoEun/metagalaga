import React, { Component } from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import web3 from '../../ethereum/web3';
import web3config from '../../ethereum/web3-config.json';
import { Login, Request, SendTransaction } from 'metasdk-react';

const compiledMetaGalaga = require('../../ethereum/build/MetaGalaga.json');
const mgContractAddr=web3config.contractAddr;

var metaGalaga, userName, userScore, highscore=0;
var unityContent; 

// Callbackfunction binding
var registerUpdate;

// Override alert function
var _alert = window.alert;
_alert = (function(message){console.log(message)});
window.alert = _alert;

// For Unity Test
var test = true;

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.request = ['name'];

    unityContent = new UnityContent(
      "/static/unity/Build/Build/Build.json",
      "/static/unity/Build/Build/UnityLoader.js"
    );

    unityContent.on("SendId", (userMetaId) => {
      if( test ) {  }
      else {document.getElementById('requestID').click();  }
    });

    unityContent.on("Login", () => {
      this.getHighScore().then(() => {
        if( test ) {
          unityContent.send("Canvas", "onRequest", 'Alpha');
          unityContent.send("Canvas", "SetHighScore", highscore.toString());
        }
        else { document.getElementById('requestID').click();  }
      });
    });

    unityContent.on("StopInterval", () => {
      clearInterval(this.interval);
    });
    
    unityContent.on("GameOver", (_userScore) => {
      userScore = _userScore;
      this.checkListUpdate();
    });

    unityContent.on("RegisterScore", async () => {  
      await metaGalaga.methods.minScore().call().then(async (result) => {
        // For Test
        userName = 'Alpha';
        if(result < userScore) {
          var request = metaGalaga.methods.registerScore(userName, userScore)
                        .send.request({from: "", value: web3.utils.toWei('0', 'ether'), gasPrice: '1'});
      
          this.to = request.params[0].to;
          this.value = request.params[0].value;
          this.data = request.params[0].data;

          this.forceUpdate();
          document.getElementById('sendTransactionID').click();  
        }
      });
    });
    // Binding
    registerUpdate = this.registerUpdate.bind(this);
  }

  componentDidMount() {
    document.getElementById('requestDiv').style.visibility = "hidden";
    document.getElementById('sendTransactionDiv').style.visibility = "hidden";
    
    //Get MetaGalaga contract
    metaGalaga = new web3.eth.Contract(JSON.parse(compiledMetaGalaga.interface), mgContractAddr); 
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async checkListUpdate() {
    for (var i=1; i <= 10; i++) {
      //Send Ranking from Contract to Unity
      await metaGalaga.methods.rankMap(i).call().then((result) => {
        unityContent.send("Panel - ScrollVew","SetUserMetaId", result['userMetaId'].toString());
        unityContent.send("Panel - ScrollVew","SetUserName", result['userName'].toString());
        unityContent.send("Panel - ScrollVew","SetUserScore", result['userScore'].toString());
        unityContent.send("Panel - ScrollVew","SetUserTimestamp", result['timestamp'].toString());
      });
     }
  }

  async getHighScore() {
    for (var i=1; i <= 10; i++) {
      //Send Ranking from Contract to Unity
      await metaGalaga.methods.rankMap(i).call().then((result) => highscore = highscore < result['userScore'] ? result['userScore'] : highscore);
    }
  }

  requestCallback(arg) {
    this.request.map((req) => {
      userName = arg[req];
      //For Change Login button text
      unityContent.send("Canvas", "onRequest", userName.toString()); 
      return req;
    });
  }

  async sendTransactionCallback(arg) {
    var receipt=null;
    for(; receipt == null; ) {
      receipt = await web3.eth.getTransactionReceipt(arg['txid']);
      setTimeout(console.log('timer'), 1000);
    }
    registerUpdate(receipt);
  }

  registerUpdate(receipt) {
    this.checkListUpdate();

    //Enable SendTransaction QR Code
    document.getElementById('sendTransactionID').click();  
  }

  render() {
    return (
      <div >
        <div style={styles.unityContainer}>
          <Unity unityContent={unityContent}/>

        <div id='requestDiv' style={styles.metaSdkComponent}>
        {unityContent != undefined &&
          <Request 
            id = 'requestID'
            request={this.request}
            service = 'MetaGalaga'
            qrsize={256}
            qrvoffset={170}
            qrpadding='3em'
            qrposition='top left'
            callback = {this.requestCallback}
          />
        }
        </div> 
        
        <div id='sendTransactionDiv' style={styles.metaSdkComponent}>
        {this.data != undefined &&
          <SendTransaction
            id = 'sendTransactionID'
            to = {this.to}
            value = {this.value}
            data= {this.data}
            usage= 'registerScore'
            service = 'MetaGalaga'
            qrsize={256}
            qrvoffset={170}
            qrpadding='3em'
            qrposition='top left'
            callback={this.sendTransactionCallback}
          />
        }
        </div>

        </div>
      </div>
    );
  }
}
  const styles = {
    unityContainer: {
      marginLeft: "20%",
      marginTop: "30px",
      width: "1024px",
      height: "768px",
    },
    metaSdkComponent: {
      marginLeft: "32%",
    },
  };