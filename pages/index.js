import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import web3 from '../ethereum/web3.js';

const DynamicComponentWithNoSSR = dynamic(
  import('../source/components/Demo'),
  { ssr: false }
)

class Index extends Component {
  componentDidMount() {
    //check accounts in ropsten
    if (!(typeof window !== 'undefined' && typeof window.web3 !== 'undefined')) {
      window.alert("Not define metamask");
    } else {
      web3.eth.net.getNetworkType()
          .then((network) => {
            console.log('NETWORK TYPE : ', network);
            console.log('User account : ', web3.eth.getAccounts());

            if (network !== 'ropsten' && network !== 'private') {
              window.alert("Network is not ropsten");
            }
          });
    }
  }
  render() {
    return (
      <DynamicComponentWithNoSSR />
    )
  }
}

export default Index