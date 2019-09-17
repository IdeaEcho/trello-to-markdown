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
    console.log(`## 本周工作`)
    await teamMembers.reduce(async (prevPromise, member) => {
        await prevPromise;
        console.log(`### ${member.fullName}`)
        return t.getMemberActions(member.id, since) //获取成员since日期开始的活动
    }, Promise.resolve())
}

main()

