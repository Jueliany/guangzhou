// 开发环境
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
})
// http://noven.ticp.io:39159/quhappy-base-third/