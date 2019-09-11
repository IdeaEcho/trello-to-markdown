//
// This example got key and token from config.js
// > node example.js
//
const Trello2md = require('../lib/trello2md.js').default;
const config = require('../config.js')

//工作日是从周一开始，因此周一为本周第一天，周日为本周最后一天
const getFirstDayOfWeek = function (date) {
    const day = date.getDay() || 7;
    const sinceTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - day)
    return sinceTime.toISOString();
}
const since = getFirstDayOfWeek(new Date())

const t = new Trello2md(
    config.key,
    config.token
);

t.getMemberActions(config.memberId, since);