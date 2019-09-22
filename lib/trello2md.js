"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _trello = _interopRequireDefault(require("trello"));

var Trello2md =
/*#__PURE__*/
function () {
  function Trello2md(key, token) {
    (0, _classCallCheck2["default"])(this, Trello2md);
    this.key = key;
    this.token = token;
    this.trello = new _trello["default"](key, token);
  }

  (0, _createClass2["default"])(Trello2md, [{
    key: "convert",
    value: function convert(data) {
      var lines = [];
      var i = 0;

      for (var key in data) {
        lines.push("##### ".concat(++i, ". ").concat(data[key].name, "\uFF08\u7528\u65F6\uFF1A").concat(data[key].hours, "h\uFF09"));
        lines.push("- \u8FDB\u5EA6\uFF1A");
        data[key].comments.map(function (text) {
          text = text.replace(/\n/g, " ");
          lines.push("- ".concat(text));
        });
        lines.push('');
      }

      lines.map(function (line) {
        console.log(line);
      });
    } //根据看板名称，获取看板ID

  }, {
    key: "getBoardId",
    value: function () {
      var _getBoardId = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(name) {
        var member, fields, boards, board;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.trello.makeRequest('get', "/1/tokens/".concat(this.token, "/member"));

              case 2:
                member = _context.sent;
                fields = 'name,id';
                _context.next = 6;
                return this.trello.makeRequest('get', "/1/members/".concat(member.id, "/boards"), {
                  fields: fields
                });

              case 6:
                boards = _context.sent;
                board = boards.find(function (board) {
                  return board.name == name;
                });
                return _context.abrupt("return", board.id);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getBoardId(_x) {
        return _getBoardId.apply(this, arguments);
      }

      return getBoardId;
    }() //根据看板ID，获取看板的所有成员数据

  }, {
    key: "getBoardMembers",
    value: function () {
      var _getBoardMembers = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(boardId) {
        var members;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.trello.makeRequest('get', "/1/boards/".concat(boardId, "/members"));

              case 2:
                members = _context2.sent;
                return _context2.abrupt("return", members);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getBoardMembers(_x2) {
        return _getBoardMembers.apply(this, arguments);
      }

      return getBoardMembers;
    }() //获取成员从since时间点起的所有活动

  }, {
    key: "getMemberActions",
    value: function () {
      var _getMemberActions = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(boardId, memberId, since) {
        var filter, limit, fields, actions, cardActions;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                filter = 'commentCard', limit = 1000, fields = 'data,date';
                _context3.next = 3;
                return this.trello.makeRequest('get', "/1/members/".concat(memberId, "/actions"), {
                  filter: filter,
                  limit: limit,
                  since: since,
                  fields: fields
                });

              case 3:
                actions = _context3.sent;
                cardActions = this.getActionsByCard(boardId, actions);
                this.convert(cardActions);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getMemberActions(_x3, _x4, _x5) {
        return _getMemberActions.apply(this, arguments);
      }

      return getMemberActions;
    }() //获取按卡片分组的活动

  }, {
    key: "getActionsByCard",
    value: function getActionsByCard(boardId, actions) {
      var _this = this;

      return actions.reduce(function (pre, current) {
        var currentBoardId = current.data.board.id;
        if (currentBoardId != boardId) return pre;
        var id = current.data.card.id;
        var comment = current.data.text;

        var hours = _this.getTotalHour(comment);

        if (pre[id]) {
          pre[id].comments.push(comment);
          pre[id].hours += hours;
        } else {
          pre[id] = {
            name: current.data.card.name,
            comments: [comment],
            hours: hours
          };
        }

        return pre;
      }, {});
    } //根据字符串计算总用时（例如：对接@.5h 修改bug@1.5h）

  }, {
    key: "getTotalHour",
    value: function getTotalHour(str) {
      var matchHour = new RegExp("(?<=@).*?(?=(h|@))", 'gi'); //匹配@开头，h或@结尾的字符串

      var hourArr = str.match(matchHour) || [];
      return hourArr.reduce(function (acc, cur) {
        return acc + parseFloat(cur);
      }, 0);
    } //获取小组成员数据

  }, {
    key: "filterBoardMembers",
    value: function filterBoardMembers(members, usernameArr) {
      return members.filter(function (member) {
        return usernameArr.some(function (username) {
          return member.username == username;
        });
      });
    }
  }]);
  return Trello2md;
}();

exports["default"] = Trello2md;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cmVsbG8ybWQuanMiXSwibmFtZXMiOlsiVHJlbGxvMm1kIiwia2V5IiwidG9rZW4iLCJ0cmVsbG8iLCJUcmVsbG8iLCJkYXRhIiwibGluZXMiLCJpIiwicHVzaCIsIm5hbWUiLCJob3VycyIsImNvbW1lbnRzIiwibWFwIiwidGV4dCIsInJlcGxhY2UiLCJsaW5lIiwiY29uc29sZSIsImxvZyIsIm1ha2VSZXF1ZXN0IiwibWVtYmVyIiwiZmllbGRzIiwiaWQiLCJib2FyZHMiLCJib2FyZCIsImZpbmQiLCJib2FyZElkIiwibWVtYmVycyIsIm1lbWJlcklkIiwic2luY2UiLCJmaWx0ZXIiLCJsaW1pdCIsImFjdGlvbnMiLCJjYXJkQWN0aW9ucyIsImdldEFjdGlvbnNCeUNhcmQiLCJjb252ZXJ0IiwicmVkdWNlIiwicHJlIiwiY3VycmVudCIsImN1cnJlbnRCb2FyZElkIiwiY2FyZCIsImNvbW1lbnQiLCJnZXRUb3RhbEhvdXIiLCJzdHIiLCJtYXRjaEhvdXIiLCJSZWdFeHAiLCJob3VyQXJyIiwibWF0Y2giLCJhY2MiLCJjdXIiLCJwYXJzZUZsb2F0IiwidXNlcm5hbWVBcnIiLCJzb21lIiwidXNlcm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0lBQ3FCQSxTOzs7QUFDakIscUJBQVlDLEdBQVosRUFBaUJDLEtBQWpCLEVBQXdCO0FBQUE7QUFDcEIsU0FBS0QsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLElBQUlDLGtCQUFKLENBQVdILEdBQVgsRUFBZ0JDLEtBQWhCLENBQWQ7QUFDSDs7Ozs0QkFFT0csSSxFQUFNO0FBQ1YsVUFBSUMsS0FBSyxHQUFHLEVBQVo7QUFDQSxVQUFJQyxDQUFDLEdBQUcsQ0FBUjs7QUFDQSxXQUFLLElBQUlOLEdBQVQsSUFBZ0JJLElBQWhCLEVBQXNCO0FBQ2xCQyxRQUFBQSxLQUFLLENBQUNFLElBQU4saUJBQW9C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LCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVHJlbGxvIGZyb20gJ3RyZWxsbyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmVsbG8ybWQge1xuICAgIGNvbnN0cnVjdG9yKGtleSwgdG9rZW4pIHtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXlcbiAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuXG4gICAgICAgIHRoaXMudHJlbGxvID0gbmV3IFRyZWxsbyhrZXksIHRva2VuKTtcbiAgICB9XG5cbiAgICBjb252ZXJ0KGRhdGEpIHtcbiAgICAgICAgbGV0IGxpbmVzID0gW107XG4gICAgICAgIGxldCBpID0gMFxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgbGluZXMucHVzaChgIyMjIyMgJHsrK2l9LiAke2RhdGFba2V5XS5uYW1lfe+8iOeUqOaXtu+8miR7ZGF0YVtrZXldLmhvdXJzfWjvvIlgKVxuICAgICAgICAgICAgbGluZXMucHVzaChgLSDov5vluqbvvJpgKVxuICAgICAgICAgICAgZGF0YVtrZXldLmNvbW1lbnRzLm1hcCgodGV4dCkgPT4ge1xuICAgICAgICAgICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcbi9nLCBcIiBcIilcbiAgICAgICAgICAgICAgICBsaW5lcy5wdXNoKGAtICR7dGV4dH1gKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsaW5lcy5wdXNoKCcnKVxuICAgICAgICB9XG4gICAgICAgIGxpbmVzLm1hcCgobGluZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobGluZSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvL+agueaNrueci+adv+WQjeensO+8jOiOt+WPlueci+adv0lEXG4gICAgYXN5bmMgZ2V0Qm9hcmRJZChuYW1lKSB7XG4gICAgICAgIGxldCBtZW1iZXIgPSBhd2FpdCB0aGlzLnRyZWxsby5tYWtlUmVxdWVzdCgnZ2V0JywgYC8xL3Rva2Vucy8ke3RoaXMudG9rZW59L21lbWJlcmApXG4gICAgICAgIGxldCBmaWVsZHMgPSAnbmFtZSxpZCdcbiAgICAgICAgbGV0IGJvYXJkcyA9IGF3YWl0IHRoaXMudHJlbGxvLm1ha2VSZXF1ZXN0KCdnZXQnLCBgLzEvbWVtYmVycy8ke21lbWJlci5pZH0vYm9hcmRzYCx7ZmllbGRzfSlcbiAgICAgICAgbGV0IGJvYXJkID0gYm9hcmRzLmZpbmQoYm9hcmQgPT4gYm9hcmQubmFtZSA9PSBuYW1lKVxuICAgICAgICByZXR1cm4gYm9hcmQuaWRcbiAgICB9XG5cbiAgICAvL+agueaNrueci+adv0lE77yM6I635Y+W55yL5p2/55qE5omA5pyJ5oiQ5ZGY5pWw5o2uXG4gICAgYXN5bmMgZ2V0Qm9hcmRNZW1iZXJzKGJvYXJkSWQpIHtcbiAgICAgICAgbGV0IG1lbWJlcnMgPSBhd2FpdCB0aGlzLnRyZWxsby5tYWtlUmVxdWVzdCgnZ2V0JywgYC8xL2JvYXJkcy8ke2JvYXJkSWR9L21lbWJlcnNgKVxuICAgICAgICByZXR1cm4gbWVtYmVyc1xuICAgIH1cblxuICAgIC8v6I635Y+W5oiQ5ZGY5LuOc2luY2Xml7bpl7TngrnotbfnmoTmiYDmnInmtLvliqhcbiAgICBhc3luYyBnZXRNZW1iZXJBY3Rpb25zKGJvYXJkSWQsIG1lbWJlcklkLCBzaW5jZSkge1xuICAgICAgICBsZXQgZmlsdGVyID0gJ2NvbW1lbnRDYXJkJyxcbiAgICAgICAgICAgIGxpbWl0ID0gMTAwMCxcbiAgICAgICAgICAgIGZpZWxkcyA9ICdkYXRhLGRhdGUnXG4gICAgICAgIGxldCBhY3Rpb25zID0gYXdhaXQgdGhpcy50cmVsbG8ubWFrZVJlcXVlc3QoJ2dldCcsIGAvMS9tZW1iZXJzLyR7bWVtYmVySWR9L2FjdGlvbnNgLCB7XG4gICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICBsaW1pdCxcbiAgICAgICAgICAgIHNpbmNlLFxuICAgICAgICAgICAgZmllbGRzXG4gICAgICAgIH0pXG4gICAgICAgIGxldCBjYXJkQWN0aW9ucyA9IHRoaXMuZ2V0QWN0aW9uc0J5Q2FyZChib2FyZElkLCBhY3Rpb25zKVxuICAgICAgICB0aGlzLmNvbnZlcnQoY2FyZEFjdGlvbnMpXG4gICAgfVxuXG4gICAgLy/ojrflj5bmjInljaHniYfliIbnu4TnmoTmtLvliqhcbiAgICBnZXRBY3Rpb25zQnlDYXJkKGJvYXJkSWQsIGFjdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGFjdGlvbnMucmVkdWNlKChwcmUsIGN1cnJlbnQpID0+IHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50Qm9hcmRJZCA9IGN1cnJlbnQuZGF0YS5ib2FyZC5pZFxuICAgICAgICAgICAgaWYoY3VycmVudEJvYXJkSWQhPWJvYXJkSWQpIHJldHVybiBwcmVcbiAgICAgICAgICAgIGxldCBpZCA9IGN1cnJlbnQuZGF0YS5jYXJkLmlkXG4gICAgICAgICAgICBsZXQgY29tbWVudCA9IGN1cnJlbnQuZGF0YS50ZXh0XG4gICAgICAgICAgICBsZXQgaG91cnMgPSB0aGlzLmdldFRvdGFsSG91cihjb21tZW50KVxuICAgICAgICAgICAgaWYgKHByZVtpZF0pIHtcbiAgICAgICAgICAgICAgICBwcmVbaWRdLmNvbW1lbnRzLnB1c2goY29tbWVudClcbiAgICAgICAgICAgICAgICBwcmVbaWRdLmhvdXJzICs9IGhvdXJzXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByZVtpZF0gPSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGN1cnJlbnQuZGF0YS5jYXJkLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnRzOiBbY29tbWVudF0sXG4gICAgICAgICAgICAgICAgICAgIGhvdXJzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByZVxuICAgICAgICB9LCB7fSlcbiAgICB9XG5cbiAgICAvL+agueaNruWtl+espuS4suiuoeeul+aAu+eUqOaXtu+8iOS+i+Wmgu+8muWvueaOpUAuNWgg5L+u5pS5YnVnQDEuNWjvvIlcbiAgICBnZXRUb3RhbEhvdXIoc3RyKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoSG91ciA9IG5ldyBSZWdFeHAoXCIoPzw9QCkuKj8oPz0oaHxAKSlcIiwgJ2dpJykgLy/ljLnphY1A5byA5aS077yMaOaIlkDnu5PlsL7nmoTlrZfnrKbkuLJcbiAgICAgICAgY29uc3QgaG91ckFyciA9IHN0ci5tYXRjaChtYXRjaEhvdXIpIHx8IFtdXG4gICAgICAgIHJldHVybiBob3VyQXJyLnJlZHVjZSgoYWNjLCBjdXIpID0+IGFjYyArIHBhcnNlRmxvYXQoY3VyKSwgMClcbiAgICB9XG5cbiAgICAvL+iOt+WPluWwj+e7hOaIkOWRmOaVsOaNrlxuICAgIGZpbHRlckJvYXJkTWVtYmVycyhtZW1iZXJzLCB1c2VybmFtZUFycikge1xuICAgICAgICByZXR1cm4gbWVtYmVycy5maWx0ZXIobWVtYmVyID0+IHVzZXJuYW1lQXJyLnNvbWUodXNlcm5hbWUgPT4gbWVtYmVyLnVzZXJuYW1lID09IHVzZXJuYW1lKSlcbiAgICB9XG5cbn0iXX0=