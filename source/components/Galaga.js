import React, { Component } from 'react'
import Modal from 'react-modal'
import Unity, { UnityContent } from 'react-unity-webgl'
import web3 from '../../ethereum/web3'
import web3config from '../../ethereum/web3-config.json'
import { Request, SendTransaction } from 'metasdk-react'

const compiledMetaGalaga = require('../../ethereum/build/MetaGalaga.json')
const mgContractAddr = web3config.contractAddr

var metaGalaga
var unityContent

// Override alert function
var _alert = window.alert
_alert = function (message) { console.log(message) }
window.alert = _alert

export default class Galaga extends Component {
  // Topic number - 10 : name, 110 : avatar
  request = ['10', '110']
  data = { userName: '', userAvatar: 0, userScore: 0, highscore: 0 }
  state = { transacModalVisible: false }

  constructor (props) {
    super(props)

    unityContent = new UnityContent(
      '/static/unity/Build/Build.json'
      , '/static/unity/Build/UnityLoader.js'
    )

    unityContent.on('SendId', (userMetaId) => {
      console.log('SendId', userMetaId)
    })

    unityContent.on('Login', () => {
      this.getHighScore().then(() => { document.getElementById('requestID').click() })
    })

    unityContent.on('StopInterval', () => { clearInterval(this.interval) })

    unityContent.on('GameOver', (_userScore) => {
      this.data.userScore = _userScore
      this.checkListUpdate()
    })

    unityContent.on('RegisterScore', async () => {
      await metaGalaga.methods.minScore().call().then(async (result) => {
        if (result < this.data.userScore) {
          var request = metaGalaga.methods.registerScore(this.data.userName, this.data.userScore).send.request({ from: '', value: web3.utils.toWei('0', 'ether'), gasPrice: '1' })
          this.to = request.params[0].to
          this.value = request.params[0].value
          this.trxData = request.params[0].data
          this.setState({ transacModalVisible: true })
        }
      })
    })
  }

  componentDidMount () {
    // Get MetaGalaga contract
    metaGalaga = new web3.eth.Contract(JSON.parse(compiledMetaGalaga.interface), mgContractAddr)
  }

  componentWillUnmount () {
    Modal.setAppElement('body')
    clearInterval(this.interval)
  }

  async checkListUpdate () {
    for (var i = 1; i <= 10; i++) {
      // Send Ranking from Contract to Unity
      await metaGalaga.methods.rankMap(i).call().then((result) => {
        unityContent.send('Panel - ScrollVew', 'SetUserMetaId', result['userMetaId'].toString())
        unityContent.send('Panel - ScrollVew', 'SetUserName', result['userName'].toString())
        unityContent.send('Panel - ScrollVew', 'SetUserScore', result['userScore'].toString())
        unityContent.send('Panel - ScrollVew', 'SetUserTimestamp', result['timestamp'].toString())
      })
    }
  }

  async getHighScore () {
    for (var i = 1; i <= 10; i++) {
      await metaGalaga.methods.rankMap(i).call().then((result) => {
        this.data.highscore = this.data.highscore < result['userScore']
          ? result['userScore']
          : this.data.highscore
      })
    }
  }

  closeBtnCallback () {
    this.setState({ transacModalVisible: false })
    this.interval = setInterval(() => { this.checkListUpdate() }, 1000)
  }

  requestCallback (arg) {
    document.getElementById('requestID').click()
    this.request.map((req) => {
      if (req === '10') {
        this.data.userName = arg[req]
      } else {
        this.data.userAvatar = arg[req]
      }
      unityContent.send('Canvas', 'onRequest', this.data.userName.toString())
      return req
    })
  }

  render () {
    return (
      <div >
        <center><div style={styles.unityContainer}>
          <Unity unityContent={unityContent} />
        </div></center>

        <div id='requestDiv' style={styles.metaSDKcomponent}>
          {unityContent !== undefined &&
          <Request
            id='requestID'
            request={this.request}
            usage='MetaGalaga'
            callback={(arg) => this.requestCallback(arg)}
            qrsize={256}
            qrvoffset={170}
            qrpadding='3em'
            qrposition='top left'
          />}
        </div>

        {this.trxData !== undefined &&
        <div>
          <center><Modal
            contentLabel='Register Score'
            isOpen={this.state.transacModalVisible}
            style={styles.modalStyle}
          >
            <SendTransaction
              id='sendTransactionID'
              to={this.to}
              value={this.value}
              data={this.trxData}
              usage='registerScore'
              callbackUrl=' '
              qrsize={256}
              qrvoffset={170}
              qrpadding='3em'
              qrposition='top left'
            />
            <center><button onClick={() => this.closeBtnCallback()} style={{ marginTop: '4%' }}>CLOSE</button></center>
          </Modal></center>
        </div>}
      </div>
    )
  }
}
const styles = {
  unityContainer: {
    marginTop: '2%',
    width: '1024px',
    height: '768px'
  },
  metaSDKcomponent: {
    visibility: 'hidden',
    marginLeft: '39.5%'
  },
  modalStyle: {
    content: {
      position: 'absolute',
      background: 'rgb(255, 255, 255)',
      overflow: 'auto',
      bottom: '350px',
      borderRadius: '4px',
      outline: 'none',
      padding: '3em',
      width: '256px',
      height: '256px',
      marginLeft: '39.5%',
      marginTop: '10%'
    }
  }
}
