#!/usr/bin/env node --experimental-modules
const map = (fn, arr) => !arr ? cArr => cArr.map(fn) : arr.map(fn)

console.log(map(a => a * 2, [2, 3, 4]))
