const test = require('tape')
const stdout = require('test-console').stdout
const stderr = require('test-console').stderr
const c = require('chalk')

const custom = require('./dist/nice-console')

test('test default output', function(t) {
  t.plan(2)
  const output = stdout.inspect()
  console.log('log')
  console.info('info')
  output.restore()
  t.deepEqual(output.output, ['\x1b[37mlog\x1b[39m\n', '\x1b[34minfo\x1b[39m\n'])

  const error = stderr.inspect()

  console.warn('warn')
  console.error('error')
  error.restore()
  t.deepEqual(error.output, ['\x1b[33mwarn\x1b[39m\n', '\x1b[31merror\x1b[39m\n'])
})

test('test custom output', function(t) {
  t.plan(2)
  custom({
    log: 'yellow',
    info: 'red',
    warn: 'blue',
    error: ['underline', 'white'],
  })
  const output = stdout.inspect()
  console.log('log')
  console.info('info')
  output.restore()
  t.deepEqual(output.output, ['\x1b[33mlog\x1b[39m\n', '\x1b[31minfo\x1b[39m\n'])

  const error = stderr.inspect()
  console.warn('warn')
  console.error('error')
  error.restore()
  t.deepEqual(error.output, ['\x1b[34mwarn\x1b[39m\n', '\x1b[4m\x1b[37merror\x1b[39m\x1b[24m\n'])
})

test('test partial custom output', function(t) {
  t.plan(2)
  custom({
    log: 'blue',
    error: ['underline', 'red'],
  })
  const output = stdout.inspect()
  console.log('log')
  console.info('info')
  output.restore()
  t.deepEqual(output.output, ['\x1b[34mlog\x1b[39m\n', '\x1b[31minfo\x1b[39m\n'])

  const error = stderr.inspect()
  console.warn('warn')
  console.error('error')
  error.restore()
  t.deepEqual(error.output, ['\x1b[34mwarn\x1b[39m\n', '\x1b[4m\x1b[31merror\x1b[39m\x1b[24m\n'])
})
