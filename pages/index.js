import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import web3 from '../ethereum/web3.js'
import Favicon from 'react-favicon'

const DynamicComponentWithNoSSR = dynamic(
  import('../source/components/Galaga'),
  { ssr: false }
)

class Index extends Component {
  componentDidMount () {
    web3.eth.net.getNetworkType().then((network) => { console.log('NETWORK TYPE : ', network) })
  }
  render () {
    return (
      <div>
        <Favicon url='../static/favicon.ico' />
        <DynamicComponentWithNoSSR />
      </div>
    )
  }
}

export default Index
