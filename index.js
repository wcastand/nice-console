const c = require('chalk')
const util = require('util')

const defaultConf = {
  log: 'white',
  info: 'blue',
  warn: 'yellow',
  error: 'red',
}

const format = (colors, ...args) => {
  const val = util.format(...args)
  if (Array.isArray(colors)) {
    const finalChalk = colors.reduce((str, color) => {
      return str[color]
    }, c)
    return finalChalk(val)
  } else {
    return c[colors](val)
  }
}

console.old_log = console.log
console.old_info = console.info
console.old_warn = console.warn
console.old_error = console.error

function setupColors(colors) {
  console.log = function() {
    console.old_log(format(colors.log, ...arguments))
  }

  console.info = function() {
    console.old_info(format(colors.info, ...arguments))
  }

  console.warn = function() {
    console.old_warn(format(colors.warn, ...arguments))
  }

  console.error = function() {
    console.old_error(format(colors.error, ...arguments))
  }
}

setupColors(defaultConf)

module.exports = customConf => setupColors(Object.assign(defaultConf, customConf))
