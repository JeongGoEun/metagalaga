import React, { Component } from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import web3 from '../../ethereum/web3';
import { Login, Request, SendTransaction } from 'metasdk-react';

const compiledMetaGalaga = require('../../ethereum/build/MetaGalaga.json');
const mgContractAddr='0xa86fb39bfad3271ab90dc7bd451b828a947c36f8';

var metaGalaga, userName, userScore;
var unityContent; 

// Callbackfunction binding
var registerUpdate;

// Override alert function
var _alert = window.alert;
_alert = (function(message){console.log(message)});
window.alert = _alert;

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.request = ['name'];

    unityContent = new UnityContent(
      "/static/unity/Build/Build/Build.json",
      "/static/unity/Build/Build/UnityLoader.js"
    );

    unityContent.on("SendId", (userMetaId) => {
      document.getElementById('requestID').click();  
    });

    unityContent.on("Login", () => {
      document.getElementById('requestID').click();  
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
    document.getElementById('sendTransactionDiv').style.display = "none";
    document.getElementById('requestDiv').style.display = "none";
    
    //Get MetaGalaga contract
    metaGalaga = new web3.eth.Contract(JSON.parse(compiledMetaGalaga.interface), mgContractAddr); 
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async checkListUpdate() {
    var i;
    for (i=1; i <= 10; i++) {
      //Send Ranking from Contract to Unity
      await metaGalaga.methods.rankMap(i).call().then((result) => this.sendUserInfo(result));
     }
  }

  async sendUserInfo(result) {
    var _metaId = result[0];
    var _name = result[1];
    var _score = result[2];
    var _timestamp = result[3];

    unityContent.send("Panel - ScrollVew","SetUserMetaId", _metaId.toString());
    unityContent.send("Panel - ScrollVew","SetUserName", _name.toString());
    unityContent.send("Panel - ScrollVew","SetUserScore", _score.toString());
    unityContent.send("Panel - ScrollVew","SetUserTimestamp", _timestamp.toString());
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
        </div>

        {unityContent != undefined &&
        <div id='requestDiv'>
          <Request
            id = 'requestID'
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
            id = 'sendTransactionID'
            to = {this.to}
            value = {this.value}
            data= {this.data}
            usage= 'registerScore'
            service = 'MetaGalaga'
            qrsize={256}
            qrvoffset={20}
            qrpadding='4em'
            qrposition='bottom right'
            callback={this.sendTransactionCallback}
          />
        }
        </div>
      </div>
    );
  }
}
  const styles = {
    unityContainer: {
      marginLeft: "15%",
      marginTop: "30px",
      width: "1024px",
      height: "768px",
    },
  };
