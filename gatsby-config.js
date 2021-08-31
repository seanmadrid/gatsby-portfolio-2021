module.exports = {
  siteMetadata: {
    title: `Sean Madrid`,
    subtitle: `Frontend Developer & UX Designer`,
    description: `Implementing big picture ideas, technical solutions, and a sense of style to web-based projects`,
    author: `Sean Madrid`,
    menuLinks:[
      {
         name:'work',
         link:'/work'
      },
      {
         name:'about',
         link:'/about'
      },
      {
         name:'resume',
         link:'/resume'
      },
      {
         name:'contact',
         link:'/contact'
      },
    ],
  },
  plugins: [
    {
      resolve: "gatsby-source-wordpress",
      options: {
        url: "https://content.seanmadrid.com/graphql",
      },
    },
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-transition-link",
      options: {
          layout: require.resolve(`./src/layouts/index.js`)
        }
   },
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-107165597-3",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};
