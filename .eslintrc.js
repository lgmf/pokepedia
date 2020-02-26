module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "@vue/airbnb",
    "@vue/typescript"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "class-methods-use-this": 0,
    "max-len": ["error", {
      code: 140, tabWidth: 2, ignoreComments: true, ignoreUrls: true
    }],
    quotes: ["error", "double"],
    "comma-dangle": ["error", "never"],
    "object-curly-newline": ["error", {
      ImportDeclaration: "never"
    }]
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  }
};
