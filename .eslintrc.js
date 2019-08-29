module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["airbnb"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "jsx-a11y", "import"],
  rules: {
    quotes: ["error", "single"],
    "arrow-parens": ["error", "as-needed"],
    "comma-dangle": ["error", "never"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["warn", "never"],
    "comma-spacing": "error",
    "linebreak-style": ["error", "windows"],
    "react/jsx-props-no-spreading": [0]
  }
};
