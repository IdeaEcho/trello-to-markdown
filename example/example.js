//
// This sample got key and token from config.js
// > node example.js
//
var Trello2md = require('../lib/trello2md.js').default;
const config = require('../config.js')

var t = new Trello2md(
    config.key,
    config.token
);

//工作日是从周一开始，因此周一为本周第一天，周日为本周最后一天
var getFirstDayOfWeek = function(date) {
    var day = date.getDay() || 7;
    let sinceTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - day)
    return sinceTime.toISOString();
}
var since = getFirstDayOfWeek(new Date())

t.getMemberActions(config.memberId, since);