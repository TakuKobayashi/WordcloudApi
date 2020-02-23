let siteMetadata = {
    title: `wordcloud-api-demo-page`,
    capitalizeTitleOnHome: true,
    logo: `/images/logo.png`,
    icon: `/images/icon.png`,
    titleImage: `/images/wall.jpg`,
    introTag: `PHOTOGRAPHER | VIDEOGRAPHER`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet accumsan arcu. Proin ac consequat arcu.`,
    author: `TakuKobayashi`,
    blogItemsPerPage: 10,
    portfolioItemsPerPage: 10,
    darkmode: true,
    switchTheme: true,
    navLinks: [
        {
            name: "REFERENCES",
            url: "/apidpcs/"
        },
        {
            name: "GitHub",
            url: "https://github.com/TakuKobayashi/WordcloudApi"
        }
    ],
    footerLinks: [],
    social: [],
    contact: {
        /* Leave the below value completely empty (no space either) if you don't want a contact form. */
        api_url: "./test.json",
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet accumsan arcu. Proin ac consequat arcu.`,
        mail: "hi@akzhy.com",
        phone: "000-000-0000",
        address: "1234 \nLocation \nLocation"
    }
};

module.exports = {
    siteMetadata: siteMetadata,
    plugins: [
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    "gatsby-remark-copy-linked-files",
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1280
                        }
                    }
                ]
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `contents`,
                path: `${__dirname}/contents/`
            }
        },
        {
            resolve: `gatsby-plugin-less`,
            options: {
                strictMath: true
            }
        }
    ]
};
