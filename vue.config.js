module.exports = {
  publicPath: '/',
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/styles/font.scss";
          @import "@/styles/pokemon-types-colors.scss";
          @import "@/styles/reset.scss";
          @import "@/styles/objects.scss";
        `,
      },
    },
  },
};
