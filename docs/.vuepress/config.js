module.exports = {
  base: '/web/js-utils/',
  title: 'JS-utils',
  description: 'js、utils', // 以meta标签显示
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    logo: 'https://pic5.zhuanstatic.com/zhuanzh/62a63713-6579-4f7e-9d24-b7e80a21b1cf.png',
    nav: [
      { text: '主页', link: '/' },
      { text: '文档', link: '/main/' },
      { text: '更新记录', link: '/updateLog/' }
    ],
    sidebar: 'auto',
    smoothScroll: true
  }
}