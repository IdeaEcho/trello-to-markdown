//
// This example got key and token from config.js
// > node example.js
//
const Trello2md = require('../lib/trello2md.js').default
const config = require('../config.js')

//工作日是从周一开始，因此周一为本周第一天，周日为本周最后一天
const getFirstDayOfWeek = function (date) {
    const day = date.getDay() || 7
    const sinceTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - day)
    return sinceTime.toISOString()
}

const t = new Trello2md(
    config.key,
    config.token
)

const main = async function(){
    const boardId = await t.getBoardId(config.boards[0])//看板id
    const boardMembers = await t.getBoardMembers(boardId)//看板所有成员数据
    const teamMembers = t.filterBoardMembers(boardMembers, config.teamUsername)//小组成员数据
    const since = getFirstDayOfWeek(new Date())//起始日期
    t.getMemberActions(teamMembers[1].id, since)//获取成员起始日期起的活动
}

main()

