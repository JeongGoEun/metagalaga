import React, { Component } from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import web3 from '../../ethereum/web3';
import web3config from '../../ethereum/web3-config.json';
import { Request, SendTransaction } from 'metasdk-react';

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

export default class Demo extends Component {
  // Topic number - 10 : name
  request = ['10'];

  constructor(props) {
    super(props);

    this.state = { isRegister: false };

    unityContent = new UnityContent(
      "/static/unity/Build/Build/Build.json",
      "/static/unity/Build/Build/UnityLoader.js"
    );

    unityContent.on("SendId", (userMetaId) => { 
      console.log("SendId") 
    });

    unityContent.on("Login", () => {
      this.getHighScore().then(() => { document.getElementById('requestID').click() });
    });

    unityContent.on("StopInterval", () => { clearInterval(this.interval) });
    
    unityContent.on("GameOver", async(_userScore) => {
      userScore = _userScore;

      await metaGalaga.methods.minScore().call().then(async (result) => {
        if(result < userScore) {
          var request = metaGalaga.methods.registerScore(userName, userScore).send.request({from: "", value: web3.utils.toWei('0', 'ether'), gasPrice: '1'});
      
          this.to = request.params[0].to;
          this.value = request.params[0].value;
          this.data = request.params[0].data;
          this.setState({isRegister: true});
        }
      });

      this.checkListUpdate();
    });

    unityContent.on("RegisterScore", () => { document.getElementById('sendTransactionID').click() });
    // Binding
    registerUpdate = this.registerUpdate.bind(this);
  }

  componentDidMount() {
    this.setState({ requestVisibility: true});
    // Get MetaGalaga contract
    metaGalaga = new web3.eth.Contract(JSON.parse(compiledMetaGalaga.interface), mgContractAddr); 
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async checkListUpdate() {
    for (var i=1; i <= 10; i++) {
      // Send Ranking from Contract to Unity
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
      await metaGalaga.methods.rankMap(i).call().then((result) => highscore = highscore < result['userScore'] ? result['userScore'] : highscore);
    }
  }

  requestCallback(arg) {
    this.request.map((req) => {
      userName = arg[req];
      console.log("Get response name: ", userName);
      unityContent.send("Canvas", "onRequest", userName.toString()); 
      document.getElementById('requestID').click(); 

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

    // Enable SendTransaction QR Code
    document.getElementById('sendTransactionID').click();  
  }

  render() {
    return (
      <div >
        <center><div style={styles.unityContainer}>
          <Unity unityContent={unityContent}/>
        </div></center>

        <div id='requestDiv' style={styles.metaSDKcomponent}>
        {unityContent != undefined &&
          <Request 
            id = 'requestID'
            request={this.request}
            usage = 'MetaGalaga'
            callback = {this.requestCallback}
            qrsize={256}
            qrvoffset={170}
            qrpadding='3em'
            qrposition='top left'
          />
        }</div>
        
        <div id='sendTransactionDiv' style={styles.metaSDKcomponent}>
          {this.state.isRegister &&
            <SendTransaction
              id = 'sendTransactionID'
              to = {this.to}
              value = {this.value}
              data= {this.data}
              usage= 'registerScore'
              callback={this.sendTransactionCallback}
              qrsize={256}
              qrvoffset={170}
              qrpadding='3em'
              qrposition='top left'
            />
          }</div>
      </div>
    );
  }
}
const styles = {
  unityContainer: {
    marginTop: '2%',
    width: "1024px",
    height: "768px",
  },
  metaSDKcomponent: {
    visibility: 'hidden',
    marginLeft: '41%',
  },
};