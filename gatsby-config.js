/* eslint-disable @typescript-eslint/camelcase */

module.exports = {
    siteMetadata: {
        title: `anzome is me`,
        description: `nite attempt to start publicly available web page`,
        author: `@fort_wrong`
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                icon: `src/images/empty-icon.png`,
                name: `anzo.me`,
                short_name: `playground for me`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`
            }
        },
        {
            resolve: `gatsby-plugin-typescript`,
            options: {
                isTSX: true,
                jsxPragma: `React`, // 'React' pragma required to don't get React undefined, don't set 'jsx' here
                allExtensions: true
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `notes`,
                path: `${__dirname}/src/content/notes`
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: `${__dirname}/src/content/pages`
            }
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            noInlineHighlight: true
                        }
                    }
                ]
            }
        }
    ]
};
