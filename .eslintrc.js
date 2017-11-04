// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 强制有分号,没有分号就报错
    // 'semi': ['error', 'always'],
    // 忽略代码后面分号
    'semi': 0,
    // 空行设置 max 最大空行数 maxEOF 在文件末尾强制执行最多连续空行 maxBOF 在文件开始时强制执行最多连续空行
    'no-multiple-empty-lines': ["error", { "max": 1, "maxEOF": 1 }],
    // 缩进忽略
    'indent': 0,
    // 忽略函数括号左边的空格
    'space-before-function-paren': 0,
    // 忽略关键词后面的空格
    'keyword-spacing': 0,
    // 忽略行尾空白
    'no-trailing-spaces': 0,
    // 忽略定义未使用
    'no-unused-vars': 0,
    // 忽略驼峰命名法
    'camelcase': 0
  }
}
