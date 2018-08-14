import React, { Component } from 'react'
import dynamic from 'next/dynamic'
const DynamicComponentWithNoSSR = dynamic(
  import('../source/components/Demo'),
  { ssr: false }
)

class Index extends Component {
  render() {
    return (
      <DynamicComponentWithNoSSR />
    )
  }
}

export default Index