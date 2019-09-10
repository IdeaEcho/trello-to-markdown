import Trello from 'trello';
export default class Trello2md {
    constructor(key, token) {
        this.trello = new Trello(key, token);
    }

    convert(data) {
        let lines = [];
        for (let key in data) {
            lines.push(`### ${data[key].name}（用时：）`)
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
        return actions.reduce((pre, current, index) => {
            if (pre[current.data.card.id]) {
                pre[current.data.card.id].comments.push(current.data.text)
                // pre[current.data.card.id].hours += this.getTotalHour(current.data.text)
            } else {
                pre[current.data.card.id] = {
                    name: current.data.card.name,
                    hours: 0,
                    comments: []
                }
            }
            return pre
        }, {})
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
        let comments = this.getCommentsByCard(actions);
        this.convert(comments);
    }
}