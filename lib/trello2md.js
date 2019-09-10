'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _trello = require('trello');

var _trello2 = _interopRequireDefault(_trello);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Trello2md = function () {
    function Trello2md(key, token) {
        _classCallCheck(this, Trello2md);

        this.trello = new _trello2.default(key, token);
    }

    _createClass(Trello2md, [{
        key: 'convert',
        value: function convert(data) {
            var lines = [];
            for (var key in data) {
                lines.push('### ' + data[key].name + '\uFF08\u7528\u65F6\uFF1A\uFF09');
                data[key].comments.map(function (text) {
                    lines.push('- ' + text);
                });
                lines.push('');
            }
            lines.map(function (line) {
                console.log(line);
            });
        }

        //获取评论，根据卡片分组

    }, {
        key: 'getCommentsByCard',
        value: function getCommentsByCard(actions) {
            return actions.reduce(function (pre, current, index) {
                if (pre[current.data.card.id]) {
                    pre[current.data.card.id].comments.push(current.data.text);
                    // pre[current.data.card.id].hours += this.getTotalHour(current.data.text)
                } else {
                    pre[current.data.card.id] = {
                        name: current.data.card.name,
                        hours: 0,
                        comments: []
                    };
                }
                return pre;
            }, {});
        }

        //获取某个成员的所有评论

    }, {
        key: 'getMemberActions',
        value: async function getMemberActions(memberId, since) {
            var filter = 'commentCard',
                limit = 1000,
                fields = 'data,date';
            var actions = await this.trello.makeRequest('get', '/1/members/' + memberId + '/actions', {
                filter: filter,
                limit: limit,
                since: since,
                fields: fields
            });
            var comments = this.getCommentsByCard(actions);
            this.convert(comments);
        }
    }]);

    return Trello2md;
}();

exports.default = Trello2md;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cmVsbG8ybWQuanMiXSwibmFtZXMiOlsiVHJlbGxvMm1kIiwia2V5IiwidG9rZW4iLCJ0cmVsbG8iLCJUcmVsbG8iLCJkYXRhIiwibGluZXMiLCJwdXNoIiwibmFtZSIsImNvbW1lbnRzIiwibWFwIiwidGV4dCIsImxpbmUiLCJjb25zb2xlIiwibG9nIiwiYWN0aW9ucyIsInJlZHVjZSIsInByZSIsImN1cnJlbnQiLCJpbmRleCIsImNhcmQiLCJpZCIsImhvdXJzIiwibWVtYmVySWQiLCJzaW5jZSIsImZpbHRlciIsImxpbWl0IiwiZmllbGRzIiwibWFrZVJlcXVlc3QiLCJnZXRDb21tZW50c0J5Q2FyZCIsImNvbnZlcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0lBQ3FCQSxTO0FBQ2pCLHVCQUFZQyxHQUFaLEVBQWlCQyxLQUFqQixFQUF3QjtBQUFBOztBQUNwQixhQUFLQyxNQUFMLEdBQWMsSUFBSUMsZ0JBQUosQ0FBV0gsR0FBWCxFQUFnQkMsS0FBaEIsQ0FBZDtBQUNIOzs7O2dDQUVPRyxJLEVBQU07QUFDVixnQkFBSUMsUUFBUSxFQUFaO0FBQ0EsaUJBQUssSUFBSUwsR0FBVCxJQUFnQkksSUFBaEIsRUFBc0I7QUFDbEJDLHNCQUFNQyxJQUFOLFVBQWtCRixLQUFLSixHQUFMLEVBQVVPLElBQTVCO0FBQ0FILHFCQUFLSixHQUFMLEVBQVVRLFFBQVYsQ0FBbUJDLEdBQW5CLENBQXVCLFVBQUNDLElBQUQsRUFBVTtBQUM3QkwsMEJBQU1DLElBQU4sUUFBZ0JJLElBQWhCO0FBQ0gsaUJBRkQ7QUFHQUwsc0JBQU1DLElBQU4sQ0FBVyxFQUFYO0FBQ0g7QUFDREQsa0JBQU1JLEdBQU4sQ0FBVSxVQUFDRSxJQUFELEVBQVU7QUFDaEJDLHdCQUFRQyxHQUFSLENBQVlGLElBQVo7QUFDSCxhQUZEO0FBR0g7O0FBRUQ7Ozs7MENBQ2tCRyxPLEVBQVM7QUFDdkIsbUJBQU9BLFFBQVFDLE1BQVIsQ0FBZSxVQUFDQyxHQUFELEVBQU1DLE9BQU4sRUFBZUMsS0FBZixFQUF5QjtBQUMzQyxvQkFBSUYsSUFBSUMsUUFBUWIsSUFBUixDQUFhZSxJQUFiLENBQWtCQyxFQUF0QixDQUFKLEVBQStCO0FBQzNCSix3QkFBSUMsUUFBUWIsSUFBUixDQUFhZSxJQUFiLENBQWtCQyxFQUF0QixFQUEwQlosUUFBMUIsQ0FBbUNGLElBQW5DLENBQXdDVyxRQUFRYixJQUFSLENBQWFNLElBQXJEO0FBQ0E7QUFDSCxpQkFIRCxNQUdPO0FBQ0hNLHdCQUFJQyxRQUFRYixJQUFSLENBQWFlLElBQWIsQ0FBa0JDLEVBQXRCLElBQTRCO0FBQ3hCYiw4QkFBTVUsUUFBUWIsSUFBUixDQUFhZSxJQUFiLENBQWtCWixJQURBO0FBRXhCYywrQkFBTyxDQUZpQjtBQUd4QmIsa0NBQVU7QUFIYyxxQkFBNUI7QUFLSDtBQUNELHVCQUFPUSxHQUFQO0FBQ0gsYUFaTSxFQVlKLEVBWkksQ0FBUDtBQWFIOztBQUVEOzs7OytDQUN1Qk0sUSxFQUFVQyxLLEVBQU87QUFDcEMsZ0JBQUlDLFNBQVMsYUFBYjtBQUFBLGdCQUNJQyxRQUFRLElBRFo7QUFBQSxnQkFFSUMsU0FBUyxXQUZiO0FBR0EsZ0JBQUlaLFVBQVUsTUFBTSxLQUFLWixNQUFMLENBQVl5QixXQUFaLENBQXdCLEtBQXhCLGtCQUE2Q0wsUUFBN0MsZUFBaUU7QUFDakZFLDhCQURpRjtBQUVqRkMsNEJBRmlGO0FBR2pGRiw0QkFIaUY7QUFJakZHO0FBSmlGLGFBQWpFLENBQXBCO0FBTUEsZ0JBQUlsQixXQUFXLEtBQUtvQixpQkFBTCxDQUF1QmQsT0FBdkIsQ0FBZjtBQUNBLGlCQUFLZSxPQUFMLENBQWFyQixRQUFiO0FBQ0g7Ozs7OztrQkFqRGdCVCxTIiwiZmlsZSI6InRyZWxsbzJtZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUcmVsbG8gZnJvbSAndHJlbGxvJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJlbGxvMm1kIHtcclxuICAgIGNvbnN0cnVjdG9yKGtleSwgdG9rZW4pIHtcclxuICAgICAgICB0aGlzLnRyZWxsbyA9IG5ldyBUcmVsbG8oa2V5LCB0b2tlbik7XHJcbiAgICB9XHJcblxyXG4gICAgY29udmVydChkYXRhKSB7XHJcbiAgICAgICAgbGV0IGxpbmVzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGRhdGEpIHtcclxuICAgICAgICAgICAgbGluZXMucHVzaChgIyMjICR7ZGF0YVtrZXldLm5hbWV977yI55So5pe277ya77yJYClcclxuICAgICAgICAgICAgZGF0YVtrZXldLmNvbW1lbnRzLm1hcCgodGV4dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGluZXMucHVzaChgLSAke3RleHR9YClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxpbmVzLnB1c2goJycpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxpbmVzLm1hcCgobGluZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhsaW5lKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v6I635Y+W6K+E6K6677yM5qC55o2u5Y2h54mH5YiG57uEXHJcbiAgICBnZXRDb21tZW50c0J5Q2FyZChhY3Rpb25zKSB7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbnMucmVkdWNlKChwcmUsIGN1cnJlbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwcmVbY3VycmVudC5kYXRhLmNhcmQuaWRdKSB7XHJcbiAgICAgICAgICAgICAgICBwcmVbY3VycmVudC5kYXRhLmNhcmQuaWRdLmNvbW1lbnRzLnB1c2goY3VycmVudC5kYXRhLnRleHQpXHJcbiAgICAgICAgICAgICAgICAvLyBwcmVbY3VycmVudC5kYXRhLmNhcmQuaWRdLmhvdXJzICs9IHRoaXMuZ2V0VG90YWxIb3VyKGN1cnJlbnQuZGF0YS50ZXh0KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcHJlW2N1cnJlbnQuZGF0YS5jYXJkLmlkXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBjdXJyZW50LmRhdGEuY2FyZC5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGhvdXJzOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnRzOiBbXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwcmVcclxuICAgICAgICB9LCB7fSlcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluafkOS4quaIkOWRmOeahOaJgOacieivhOiuulxyXG4gICAgYXN5bmMgZ2V0TWVtYmVyQWN0aW9ucyhtZW1iZXJJZCwgc2luY2UpIHtcclxuICAgICAgICBsZXQgZmlsdGVyID0gJ2NvbW1lbnRDYXJkJyxcclxuICAgICAgICAgICAgbGltaXQgPSAxMDAwLFxyXG4gICAgICAgICAgICBmaWVsZHMgPSAnZGF0YSxkYXRlJ1xyXG4gICAgICAgIGxldCBhY3Rpb25zID0gYXdhaXQgdGhpcy50cmVsbG8ubWFrZVJlcXVlc3QoJ2dldCcsIGAvMS9tZW1iZXJzLyR7bWVtYmVySWR9L2FjdGlvbnNgLCB7XHJcbiAgICAgICAgICAgIGZpbHRlcixcclxuICAgICAgICAgICAgbGltaXQsXHJcbiAgICAgICAgICAgIHNpbmNlLFxyXG4gICAgICAgICAgICBmaWVsZHNcclxuICAgICAgICB9KVxyXG4gICAgICAgIGxldCBjb21tZW50cyA9IHRoaXMuZ2V0Q29tbWVudHNCeUNhcmQoYWN0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5jb252ZXJ0KGNvbW1lbnRzKTtcclxuICAgIH1cclxufSJdfQ==