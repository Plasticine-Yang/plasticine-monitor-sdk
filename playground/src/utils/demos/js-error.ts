/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

export const emitTypeError = () => {
  const x = 123
  // TypeError: x.toUpperCase is not a function
  // @ts-ignore
  x.toUpperCase()
}

export const emitReferenceError = () => {
  // @ts-ignore
  const x = 123
  // ReferenceError: y is not defined
  // @ts-ignore
  console.log(y)
}

export const emitRangeError = () => {
  // RangeError: Invalid array length
  // @ts-ignore
  const arr = new Array(10000000000000000000000000)
}

export const emitURIError = () => {
  // URIError: URI malformed
  // @ts-ignore
  const uri = decodeURIComponent('%')
}

export const emitSyntaxError = () => {
  // EvalError: Function statements require a function name
  eval('function() {}')
}
