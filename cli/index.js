#!/usr/bin/env node

var generator = require('./../'),
    args = process.argv.slice(2),
    ruleString = args[0] || null,
    outOfBoundValue = args[1] || 'wrap';

outOfBoundValue = outOfBoundValue == 'wrap' ? outOfBoundValue : parseInt(outOfBoundValue, 10);

console.log(generator(ruleString, outOfBoundValue));
