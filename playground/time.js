var moment = require('moment');

var date = new moment();
date.add(100, 'year').subtract(9, 'months');
console.log(date.format('MMM Do, YYYY'));

// 10:35 am
console.log(date.format('h:mma'));