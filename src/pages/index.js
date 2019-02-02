import React from 'react'
import Layout from '../components/layout'

const backgroundStyles = {
  height: '100%',
  background: `url(images/dust_scratches.png) repeat`,
  textAlign: 'center'
};

const textStyles = {
  textAlign: 'left',
  display: 'inline-block',
  background: 'none',
  marginTop: '100px'
}

const IndexPage = () => (
  <Layout>
    <div style={backgroundStyles}>
      <pre style={textStyles}>
        <code>
          {`
  while(vacations) {
    workingHardToStartThisSite()
  }

  if (vacationsIsOver) {
    workEvenHarder()
  }
          `}
        </code>
      </pre>
    </div>
  </Layout>
)

export default IndexPage
