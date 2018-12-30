import React from 'react'
import Layout from '../components/layout'

const IndexPage = () => (
  <Layout>
    <div style={{
      height: '100%',
      background: `url(images/dust_scratches.png) repeat`,
      'text-align': 'center'
    }}>
      <pre style={{'text-align': 'left', 'display': 'inline-block', 'background': 'none', 'margin-top': '100px'}}>
        <code>
          {`
  while(vacations) {
    working hard to start this site
  }
          `}
        </code>
      </pre>
    </div>
  </Layout>
)

export default IndexPage
