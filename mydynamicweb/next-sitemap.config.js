/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://bill-yc-hsu.com',
  generateRobotsTxt: true,
  exclude: ['/api/*', '/cv_26Q2.pdf', '/cv_*.pdf'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/cv_26Q2.pdf'] },
    ],
  },
}
