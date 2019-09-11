# trello-to-markdown
This script converts JSON exports from [Trello](http://trello.com) to [Markdown](http://daringfireball.net/projects/markdown/basics).

团队中工作内容记录在trello每个任务卡片的活动里，而周报用的腾讯文档，需要把trello的每条记录copy到文档里，比较费时，也容易遗漏出错。所以写了这个小工具，避免重复的工作。

备注：由于用了正则表达式的后行断言，node.js版本至少要8.10.0。

# Getting started

安装依赖
```
npm install
```
点击(https://trello.com/app-key)，获取 `key` 和 `token`。

在config.js配置 `key` 、`token` 、`看板id` 、`成员id`

node example/example.js

# Todolist
  
- [x] 将单个成员的本周评论数据转为markdown
- [x] 本周任务标题加总用时
- [ ] 本周任务标题加计数
- [ ] 自动获取memberId
- [ ] 汇总小组周评论

# License

MIT