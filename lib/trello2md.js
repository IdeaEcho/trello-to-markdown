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
      lines.push("## \u672C\u5468\u5DE5\u4F5C");

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
      _regenerator["default"].mark(function _callee3(memberId, since) {
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
                cardActions = this.getActionsByCard(actions, since);
                this.convert(cardActions);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getMemberActions(_x3, _x4) {
        return _getMemberActions.apply(this, arguments);
      }

      return getMemberActions;
    }() //获取按卡片分组的活动

  }, {
    key: "getActionsByCard",
    value: function getActionsByCard(actions) {
      var _this = this;

      return actions.reduce(function (pre, current) {
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

      var hourArr = str.match(matchHour);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cmVsbG8ybWQuanMiXSwibmFtZXMiOlsiVHJlbGxvMm1kIiwia2V5IiwidG9rZW4iLCJ0cmVsbG8iLCJUcmVsbG8iLCJkYXRhIiwibGluZXMiLCJpIiwicHVzaCIsIm5hbWUiLCJob3VycyIsImNvbW1lbnRzIiwibWFwIiwidGV4dCIsInJlcGxhY2UiLCJsaW5lIiwiY29uc29sZSIsImxvZyIsIm1ha2VSZXF1ZXN0IiwibWVtYmVyIiwiZmllbGRzIiwiaWQiLCJib2FyZHMiLCJib2FyZCIsImZpbmQiLCJib2FyZElkIiwibWVtYmVycyIsIm1lbWJlcklkIiwic2luY2UiLCJmaWx0ZXIiLCJsaW1pdCIsImFjdGlvbnMiLCJjYXJkQWN0aW9ucyIsImdldEFjdGlvbnNCeUNhcmQiLCJjb252ZXJ0IiwicmVkdWNlIiwicHJlIiwiY3VycmVudCIsImNhcmQiLCJjb21tZW50IiwiZ2V0VG90YWxIb3VyIiwic3RyIiwibWF0Y2hIb3VyIiwiUmVnRXhwIiwiaG91ckFyciIsIm1hdGNoIiwiYWNjIiwiY3VyIiwicGFyc2VGbG9hdCIsInVzZXJuYW1lQXJyIiwic29tZSIsInVzZXJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQUNxQkEsUzs7O0FBQ2pCLHFCQUFZQyxHQUFaLEVBQWlCQyxLQUFqQixFQUF3QjtBQUFBO0FBQ3BCLFNBQUtELEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxJQUFJQyxrQkFBSixDQUFXSCxHQUFYLEVBQWdCQyxLQUFoQixDQUFkO0FBQ0g7Ozs7NEJBRU9HLEksRUFBTTtBQUNWLFVBQUlDLEtBQUssR0FBRyxFQUFaO0FBQ0EsVUFBSUMsQ0FBQyxHQUFHLENBQVI7QUFDQUQsTUFBQUEsS0FBSyxDQUFDRSxJQUFOOztBQUNBLFdBQUssSUFBSVAsR0FBVCxJQUFnQkksSUFBaEIsRUFBc0I7QUFDbEJDLFFBQUFBLEtBQUssQ0FBQ0Us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Q0FBQ2YsRUFBRCxDQUFILENBQVFYLEtBQVIsSUFBaUJBLEtBQWpCO0FBQ0gsU0FIRCxNQUdPO0FBQ0gwQixVQUFBQSxHQUFHLENBQUNmLEVBQUQsQ0FBSCxHQUFVO0FBQ05aLFlBQUFBLElBQUksRUFBRTRCLE9BQU8sQ0FBQ2hDLElBQVIsQ0FBYWlDLElBQWIsQ0FBa0I3QixJQURsQjtBQUVORSxZQUFBQSxRQUFRLEVBQUUsQ0FBQzRCLE9BQUQsQ0FGSjtBQUdON0IsWUFBQUEsS0FBSyxFQUFMQTtBQUhNLFdBQVY7QUFLSDs7QUFDRCxlQUFPMEIsR0FBUDtBQUNILE9BZk0sRUFlSixFQWZJLENBQVA7QUFnQkgsSyxDQUVEOzs7O2lDQUNhSyxHLEVBQUs7QUFDZCxVQUFNQyxTQUFTLEdBQUcsSUFBSUMsTUFBSixDQUFXLG9CQUFYLEVBQWlDLElBQWpDLENBQWxCLENBRGMsQ0FDMkM7O0FBQ3pELFVBQU1DLE9BQU8sR0FBR0gsR0FBRyxDQUFDSSxLQUFKLENBQVVILFNBQVYsQ0FBaEI7QUFDQSxhQUFPRSxPQUFPLENBQUNULE1BQVIsQ0FBZSxVQUFDVyxHQUFELEVBQU1DLEdBQU47QUFBQSxlQUFjRCxHQUFHLEdBQUdFLFVBQVUsQ0FBQ0QsR0FBRCxDQUE5QjtBQUFBLE9BQWYsRUFBb0QsQ0FBcEQsQ0FBUDtBQUNILEssQ0FFRDs7Ozt1Q0FDbUJyQixPLEVBQVN1QixXLEVBQWE7QUFDckMsYUFBT3ZCLE9BQU8sQ0FBQ0csTUFBUixDQUFlLFVBQUFWLE1BQU07QUFBQSxlQUFJOEIsV0FBVyxDQUFDQyxJQUFaLENBQWlCLFVBQUFDLFFBQVE7QUFBQSxpQkFBSWhDLE1BQU0sQ0FBQ2dDLFFBQVAsSUFBbUJBLFFBQXZCO0FBQUEsU0FBekIsQ0FBSjtBQUFBLE9BQXJCLENBQVA7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUcmVsbG8gZnJvbSAndHJlbGxvJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyZWxsbzJtZCB7XG4gICAgY29uc3RydWN0b3Ioa2V5LCB0b2tlbikge1xuICAgICAgICB0aGlzLmtleSA9IGtleVxuICAgICAgICB0aGlzLnRva2VuID0gdG9rZW5cbiAgICAgICAgdGhpcy50cmVsbG8gPSBuZXcgVHJlbGxvKGtleSwgdG9rZW4pO1xuICAgIH1cblxuICAgIGNvbnZlcnQoZGF0YSkge1xuICAgICAgICBsZXQgbGluZXMgPSBbXTtcbiAgICAgICAgbGV0IGkgPSAwXG4gICAgICAgIGxpbmVzLnB1c2goYCMjIOacrOWRqOW3peS9nGApXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBsaW5lcy5wdXNoKGAjIyMjIyAkeysraX0uICR7ZGF0YVtrZXldLm5hbWV977yI55So5pe277yaJHtkYXRhW2tleV0uaG91cnN9aO+8iWApXG4gICAgICAgICAgICBsaW5lcy5wdXNoKGAtIOi/m+W6pu+8mmApXG4gICAgICAgICAgICBkYXRhW2tleV0uY29tbWVudHMubWFwKCh0ZXh0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFxuL2csIFwiIFwiKVxuICAgICAgICAgICAgICAgIGxpbmVzLnB1c2goYC0gJHt0ZXh0fWApXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxpbmVzLnB1c2goJycpXG4gICAgICAgIH1cbiAgICAgICAgbGluZXMubWFwKChsaW5lKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhsaW5lKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8v5qC55o2u55yL5p2/5ZCN56ew77yM6I635Y+W55yL5p2/SURcbiAgICBhc3luYyBnZXRCb2FyZElkKG5hbWUpIHtcbiAgICAgICAgbGV0IG1lbWJlciA9IGF3YWl0IHRoaXMudHJlbGxvLm1ha2VSZXF1ZXN0KCdnZXQnLCBgLzEvdG9rZW5zLyR7dGhpcy50b2tlbn0vbWVtYmVyYClcbiAgICAgICAgbGV0IGZpZWxkcyA9ICduYW1lLGlkJ1xuICAgICAgICBsZXQgYm9hcmRzID0gYXdhaXQgdGhpcy50cmVsbG8ubWFrZVJlcXVlc3QoJ2dldCcsIGAvMS9tZW1iZXJzLyR7bWVtYmVyLmlkfS9ib2FyZHNgLHtmaWVsZHN9KVxuICAgICAgICBsZXQgYm9hcmQgPSBib2FyZHMuZmluZChib2FyZCA9PiBib2FyZC5uYW1lID09IG5hbWUpXG4gICAgICAgIHJldHVybiBib2FyZC5pZFxuICAgIH1cblxuICAgIC8v5qC55o2u55yL5p2/SUTvvIzojrflj5bnnIvmnb/nmoTmiYDmnInmiJDlkZjmlbDmja5cbiAgICBhc3luYyBnZXRCb2FyZE1lbWJlcnMoYm9hcmRJZCkge1xuICAgICAgICBsZXQgbWVtYmVycyA9IGF3YWl0IHRoaXMudHJlbGxvLm1ha2VSZXF1ZXN0KCdnZXQnLCBgLzEvYm9hcmRzLyR7Ym9hcmRJZH0vbWVtYmVyc2ApXG4gICAgICAgIHJldHVybiBtZW1iZXJzXG4gICAgfVxuXG4gICAgLy/ojrflj5bmiJDlkZjku45zaW5jZeaXtumXtOeCuei1t+eahOaJgOaciea0u+WKqFxuICAgIGFzeW5jIGdldE1lbWJlckFjdGlvbnMobWVtYmVySWQsIHNpbmNlKSB7XG4gICAgICAgIGxldCBmaWx0ZXIgPSAnY29tbWVudENhcmQnLFxuICAgICAgICAgICAgbGltaXQgPSAxMDAwLFxuICAgICAgICAgICAgZmllbGRzID0gJ2RhdGEsZGF0ZSdcbiAgICAgICAgbGV0IGFjdGlvbnMgPSBhd2FpdCB0aGlzLnRyZWxsby5tYWtlUmVxdWVzdCgnZ2V0JywgYC8xL21lbWJlcnMvJHttZW1iZXJJZH0vYWN0aW9uc2AsIHtcbiAgICAgICAgICAgIGZpbHRlcixcbiAgICAgICAgICAgIGxpbWl0LFxuICAgICAgICAgICAgc2luY2UsXG4gICAgICAgICAgICBmaWVsZHNcbiAgICAgICAgfSlcbiAgICAgICAgbGV0IGNhcmRBY3Rpb25zID0gdGhpcy5nZXRBY3Rpb25zQnlDYXJkKGFjdGlvbnMsIHNpbmNlKVxuICAgICAgICB0aGlzLmNvbnZlcnQoY2FyZEFjdGlvbnMpXG4gICAgfVxuXG4gICAgLy/ojrflj5bmjInljaHniYfliIbnu4TnmoTmtLvliqhcbiAgICBnZXRBY3Rpb25zQnlDYXJkKGFjdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGFjdGlvbnMucmVkdWNlKChwcmUsIGN1cnJlbnQpID0+IHtcbiAgICAgICAgICAgIGxldCBpZCA9IGN1cnJlbnQuZGF0YS5jYXJkLmlkXG4gICAgICAgICAgICBsZXQgY29tbWVudCA9IGN1cnJlbnQuZGF0YS50ZXh0XG4gICAgICAgICAgICBsZXQgaG91cnMgPSB0aGlzLmdldFRvdGFsSG91cihjb21tZW50KVxuICAgICAgICAgICAgaWYgKHByZVtpZF0pIHtcbiAgICAgICAgICAgICAgICBwcmVbaWRdLmNvbW1lbnRzLnB1c2goY29tbWVudClcbiAgICAgICAgICAgICAgICBwcmVbaWRdLmhvdXJzICs9IGhvdXJzXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByZVtpZF0gPSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGN1cnJlbnQuZGF0YS5jYXJkLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnRzOiBbY29tbWVudF0sXG4gICAgICAgICAgICAgICAgICAgIGhvdXJzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByZVxuICAgICAgICB9LCB7fSlcbiAgICB9XG5cbiAgICAvL+agueaNruWtl+espuS4suiuoeeul+aAu+eUqOaXtu+8iOS+i+Wmgu+8muWvueaOpUAuNWgg5L+u5pS5YnVnQDEuNWjvvIlcbiAgICBnZXRUb3RhbEhvdXIoc3RyKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoSG91ciA9IG5ldyBSZWdFeHAoXCIoPzw9QCkuKj8oPz0oaHxAKSlcIiwgJ2dpJykgLy/ljLnphY1A5byA5aS077yMaOaIlkDnu5PlsL7nmoTlrZfnrKbkuLJcbiAgICAgICAgY29uc3QgaG91ckFyciA9IHN0ci5tYXRjaChtYXRjaEhvdXIpXG4gICAgICAgIHJldHVybiBob3VyQXJyLnJlZHVjZSgoYWNjLCBjdXIpID0+IGFjYyArIHBhcnNlRmxvYXQoY3VyKSwgMClcbiAgICB9XG5cbiAgICAvL+iOt+WPluWwj+e7hOaIkOWRmOaVsOaNrlxuICAgIGZpbHRlckJvYXJkTWVtYmVycyhtZW1iZXJzLCB1c2VybmFtZUFycikge1xuICAgICAgICByZXR1cm4gbWVtYmVycy5maWx0ZXIobWVtYmVyID0+IHVzZXJuYW1lQXJyLnNvbWUodXNlcm5hbWUgPT4gbWVtYmVyLnVzZXJuYW1lID09IHVzZXJuYW1lKSlcbiAgICB9XG5cbn0iXX0=