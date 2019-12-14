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
        name: `anzo.me`,
        short_name: `playground for me`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`
      }
    }
  ]
};
