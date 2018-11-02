# niceuho
auto format console output with [chalk](https://github.com/chalk/chalk) for node

console.log, .info, .warn, .error doesn't have a specific color scheme in a terminal with node. (it exists mostly to miror console api for browser)

So i created a simple package that use `chalk` to add some colors and style to console's api for node.

# Install
```
$ npm install niceuho
// or
$ yarn add niceuho
```

# Usage

### Default config

```javascript

require('niceuho')

console.log("Hello") // output white Hello by default
console.warn('Warning !') // output yellow Warning ! by default
```

### Custom config

```javascript

require('niceuho')({ log : 'blue', error : ['bold', 'underline', 'red'] })

console.log("Hello") // output blue Hello
console.error('Error !') // output "Error !" in bold red and underlined
```

You can use all the modifiers from [chalk](https://github.com/chalk/chalk) in the custom (accept a string or an array of string)
In the config you can customize log, info, warn and error.

### Warning

In order to get a proper formatting you have some constraints.
If you want to show an object for example you'll have to use the node's util format syntax.

`console.log("object : %o", myobj)`

You can find more information here : [util](https://nodejs.org/api/util.html#util_util_format_format_args)

