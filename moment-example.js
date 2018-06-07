var moment = require('moment');

var now = moment();

// console.log(now.format());
// console.log(now.format('X'));
// console.log(now.format('x'));
 console.log(now.valueOf());

var timeStamp = 1528250226610;
var timeStampMoment = moment.utc(timeStamp);
console.log(timeStampMoment.local().format('hh:mm a'));
// console.log(now.format('MMM do YYYY, hh:mma'));