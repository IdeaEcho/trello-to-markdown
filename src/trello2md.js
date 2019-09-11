import Trello from 'trello';
export default class Trello2md {
    constructor(key, token) {
        this.trello = new Trello(key, token);
    }

    convert(data) {
        let lines = [];
        let i = 0
        lines.push(`## 本周工作`)
        for (let key in data) {
            lines.push(`##### ${++i}. ${data[key].name}（用时：${data[key].hours}h）`)
            lines.push(`- 进度：`)
            data[key].comments.map((text) => {
                lines.push(`- ${text}`)
            });
            lines.push('')
        }
        lines.map((line) => {
            console.log(line)
        })
    }
    
    //获取评论，根据卡片分组
    getCommentsByCard(actions) {
        return actions.reduce((pre, current) => {
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

    getTotalHour(str) {
        const matchHour = new RegExp("(?<=@).*?(?=(h|@))", 'gi') //匹配@开头，h或@结尾的字符串
        const hourArr = str.match(matchHour)
        return hourArr.reduce((acc, cur) => acc + parseFloat(cur), 0);
    }

    //获取某个成员的所有评论
    async getMemberActions(memberId, since) {
        let filter = 'commentCard',
            limit = 1000,
            fields = 'data,date'
        let actions = await this.trello.makeRequest('get', `/1/members/${memberId}/actions`, {
            filter,
            limit,
            since,
            fields
        })
        let comments = this.getCommentsByCard(actions, since);
        this.convert(comments);
    }
}