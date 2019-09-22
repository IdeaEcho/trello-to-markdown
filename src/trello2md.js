import Trello from 'trello'
export default class Trello2md {
    constructor(key, token) {
        if (key == 'your_key' || !key) {
            throw new Error('请修改config.js文件，将your_key替换成你的key。')
        }
        if (key == 'your_token' || !token) {
            throw new Error('请修改config.js文件，将your_token替换成你的token。')
        }
        this.key = key
        this.token = token
        this.trello = new Trello(key, token)
    }

    convert(data) {
        let lines = []
        let i = 0
        for (let key in data) {
            lines.push(`##### ${++i}. ${data[key].name}（用时：${data[key].hours}h）`)
            lines.push(`- 进度：`)
            data[key].comments.map((text) => {
                text = text.replace(/\n/g, " ")
                lines.push(`- ${text}`)
            })
            lines.push('')
        }
        lines.map((line) => {
            console.log(line)
        })
    }

    //根据看板名称，获取看板ID
    async getBoardId(name) {
        if (name == 'your_board_name' || !name) {
            throw new Error('请修改config.js文件，将your_board_name替换成期望的看板名称。')
        }
        let member = await this.trello.makeRequest('get', `/1/tokens/${this.token}/member`)
        let fields = 'name,id'
        let boards = await this.trello.makeRequest('get', `/1/members/${member.id}/boards`, {
            fields
        })
        let board = boards.find(board => board.name == name)
        return board.id
    }

    //根据看板ID，获取看板的所有成员数据
    async getBoardMembers(boardId) {
        let members = await this.trello.makeRequest('get', `/1/boards/${boardId}/members`)
        return members
    }

    //获取成员从since时间点起的所有活动
    async getMemberActions(boardId, memberId, since) {
        let filter = 'commentCard',
            limit = 1000,
            fields = 'data,date'
        let actions = await this.trello.makeRequest('get', `/1/members/${memberId}/actions`, {
            filter,
            limit,
            since,
            fields
        })
        let cardActions = this.getActionsByCard(boardId, actions)
        this.convert(cardActions)
    }

    //获取按卡片分组的活动
    getActionsByCard(boardId, actions) {
        return actions.reduce((pre, current) => {
            let currentBoardId = current.data.board.id
            if (currentBoardId != boardId) return pre
            let id = current.data.card.id
            let comment = current.data.text
            let hours = this.getTotalHour(comment)
            if (pre[id]) {
                pre[id].comments.push(comment)
                pre[id].hours += hours
            } else {
                pre[id] = {
                    name: current.data.card.name,
                    comments: [comment],
                    hours
                }
            }
            return pre
        }, {})
    }

    //根据字符串计算总用时（例如：对接@.5h 修改bug@1.5h）
    getTotalHour(str) {
        const matchHour = new RegExp("(?<=@).*?(?=(h|@))", 'gi') //匹配@开头，h或@结尾的字符串
        const hourArr = str.match(matchHour) || []
        return hourArr.reduce((acc, cur) => acc + parseFloat(cur), 0)
    }

    //获取小组成员数据
    filterBoardMembers(members, usernameArr) {
        return members.filter(member => usernameArr.some(username => member.username == username))
    }

}