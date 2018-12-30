import React from "react"
import PropTypes from "prop-types"
import StatsCounters from './components/stats-counters';

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/* WEB STATS COUNTERS ATTACHED FOR PRODUCTION ONLY */}
        {process.env.NODE_ENV === 'production' && <StatsCounters/>}
        {this.props.headComponents}
      </head>
      <body {...this.props.bodyAttributes}>
      {this.props.preBodyComponents}
      <div
        key={`body`}
        id="___gatsby"
        className={`content`}
        dangerouslySetInnerHTML={{ __html: this.props.body }}
      />
      {this.props.postBodyComponents}
      </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}


