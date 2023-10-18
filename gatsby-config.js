module.exports = {
  siteMetadata: {
    title: `Aura SF`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-170811534-1",
        // this option places the tracking script into the head of the DOM
        head: true,
        // other options
      },
    },
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: `7az0ftyp`,
        dataset: `production`,
        // a token with read permissions is required
        // if you have a private dataset
        token:
          "skqPon42kbybCPn91krLyBesHH5c0jzxpBXdq0CmS7umeXXE3vgovoCFl8a0JmG13KLzdu47xv7HnJYGZoWWwuslc7vsfW48tn1aOYsObzuHsnscYOFTsmw3xaZ4FmG9FHTU3lM9ZNIn3ipEJZGCunizRbVwNlt4QQlo7JxLdLhbpFljRG5i",

        // If the Sanity GraphQL API was deployed using `--tag <name>`,
        // use `graphqlTag` to specify the tag name. Defaults to `default`.
        graphqlTag: "default",
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    "@chakra-ui/gatsby-plugin",
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          quality: 90,
        },
      },
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://aura-sf.us10.list-manage.com/subscribe/post?u=deb119ca8f82e33c67bd517b2&amp;id=430bb0d12f", // string; add your MC list endpoint here; see instructions below
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-omni-font-loader",
      options: {
        mode: "async",
        enableListener: true,
        preconnect: ["https://fonts.gstatic.com"],

        web: [
          {
            name: "Fira Sans",
            file: "https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400&display=swap",
          },
          {
            name: "Tenor Sans",
            file: "https://fonts.googleapis.com/css2?family=Tenor+Sans&display=swap",
          },
          {
            name: "Work Sans",
            file: "https://fonts.googleapis.com/css2?family=Work+Sans:wght@500&display=swap",
          },
        ],
      },
    },
    //{
    //  resolve: `gatsby-source-instagram-all`,
    //  options: {
    //    access_token:
    //      "IGQVJXMk54dHFuQWxNNEJmbHB6UnBUMmpaQ2ZAVZAk9iX1ZAVOE03bkZAUaGFiZAEJDbUtGTDJvTHgtb0JRU3MwMklTcGpMbHFESE44THNyUjBlUnVsYTFnR0hRTkhMdEt0ZAGxrd3JwWEg5T0pEdUQwUHc2ZAQZDZD",
    //  },
    //},
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
