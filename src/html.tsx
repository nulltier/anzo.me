import React from 'react';
import StatCounters from './components/stats-counters';
import Navigation from './components/navigation/navigation';

interface Props {
    htmlAttributes: object;
    headComponents: [];
    bodyAttributes: object;
    preBodyComponents: [];
    body: string;
    postBodyComponents: [];
}

export default class HTML extends React.Component<Props> {
    render(): React.ReactElement {
        return (
            <html {...this.props.htmlAttributes}>
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, shrink-to-fit=no"
                    />
                    {this.props.headComponents}
                    <link rel="stylesheet" type="text/css" href="/styles/reset.css" />
                    <link rel="stylesheet" type="text/css" href="/styles/common.css" />

                    {process.env.NODE_ENV === 'production' && <StatCounters />}
                </head>
                <body {...this.props.bodyAttributes}>
                    {this.props.preBodyComponents}
                    <div key="body" className="content">
                        <Navigation />
                        <div id="___gatsby" dangerouslySetInnerHTML={{ __html: this.props.body }} />
                    </div>
                    {this.props.postBodyComponents}
                </body>
            </html>
        );
    }
}
