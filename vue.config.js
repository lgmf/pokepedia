module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/pokepedia/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/styles/font.scss";
          @import "@/styles/pokemon-types-colors.scss";
          @import "@/styles/reset.scss";
        `,
      },
    },
  },
};
