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

var _util = require("util");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cmVsbG8ybWQuanMiXSwibmFtZXMiOlsiVHJlbGxvMm1kIiwia2V5IiwidG9rZW4iLCJ0cmVsbG8iLCJUcmVsbG8iLCJkYXRhIiwibGluZXMiLCJpIiwicHVzaCIsIm5hbWUiLCJob3VycyIsImNvbW1lbnRzIiwibWFwIiwidGV4dCIsInJlcGxhY2UiLCJsaW5lIiwiY29uc29sZSIsImxvZyIsIm1ha2VSZXF1ZXN0IiwibWVtYmVyIiwiZmllbGRzIiwiaWQiLCJib2FyZHMiLCJib2FyZCIsImZpbmQiLCJib2FyZElkIiwibWVtYmVycyIsIm1lbWJlcklkIiwic2luY2UiLCJmaWx0ZXIiLCJsaW1pdCIsImFjdGlvbnMiLCJjYXJkQWN0aW9ucyIsImdldEFjdGlvbnNCeUNhcmQiLCJjb252ZXJ0IiwicmVkdWNlIiwicHJlIiwiY3VycmVudCIsImNhcmQiLCJjb21tZW50IiwiZ2V0VG90YWxIb3VyIiwic3RyIiwibWF0Y2hIb3VyIiwiUmVnRXhwIiwiaG91ckFyciIsIm1hdGNoIiwiYWNjIiwiY3VyIiwicGFyc2VGbG9hdCIsInVzZXJuYW1lQXJyIiwic29tZSIsInVzZXJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztJQUNxQkEsUzs7O0FBQ2pCLHFCQUFZQyxHQUFaLEVBQWlCQyxLQUFqQixFQUF3QjtBQUFBO0FBQ3BCLFNBQUtELEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxJQUFJQyxrQkFBSixDQUFXSCxHQUFYLEVBQWdCQyxLQUFoQixDQUFkO0FBQ0g7Ozs7NEJBRU9HLEksRUFBTTtBQUNWLFVBQUlDLEtBQUssR0FBRyxFQUFaO0FBQ0EsVUFBSUMsQ0FBQyxHQUFHLENBQVI7O0FBQ0EsV0FBSyxJQUFJTixHQUFULElBQWdCSSxJQUFoQixFQUFzQjtBQUNsQkMsUUFBQUEsS0FBSyxDQUFDRSxJQUFOLGlCQUFvQixFQUFFRCxDQUF0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S0FBUixJQUFpQkEsS0FBakI7QUFDSCxTQUhELE1BR087QUFDSDBCLFVBQUFBLEdBQUcsQ0FBQ2YsRUFBRCxDQUFILEdBQVU7QUFDTlosWUFBQUEsSUFBSSxFQUFFNEIsT0FBTyxDQUFDaEMsSUFBUixDQUFhaUMsSUFBYixDQUFrQjdCLElBRGxCO0FBRU5FLFlBQUFBLFFBQVEsRUFBRSxDQUFDNEIsT0FBRCxDQUZKO0FBR043QixZQUFBQSxLQUFLLEVBQUxBO0FBSE0sV0FBVjtBQUtIOztBQUNELGVBQU8wQixHQUFQO0FBQ0gsT0FmTSxFQWVKLEVBZkksQ0FBUDtBQWdCSCxLLENBRUQ7Ozs7aUNBQ2FLLEcsRUFBSztBQUNkLFVBQU1DLFNBQVMsR0FBRyxJQUFJQyxNQUFKLENBQVcsb0JBQVgsRUFBaUMsSUFBakMsQ0FBbEIsQ0FEYyxDQUMyQzs7QUFDekQsVUFBTUMsT0FBTyxHQUFHSCxHQUFHLENBQUNJLEtBQUosQ0FBVUgsU0FBVixLQUF3QixFQUF4QztBQUNBLGFBQU9FLE9BQU8sQ0FBQ1QsTUFBUixDQUFlLFVBQUNXLEdBQUQsRUFBTUMsR0FBTjtBQUFBLGVBQWNELEdBQUcsR0FBR0UsVUFBVSxDQUFDRCxHQUFELENBQTlCO0FBQUEsT0FBZixFQUFvRCxDQUFwRCxDQUFQO0FBQ0gsSyxDQUVEOzs7O3VDQUNtQnJCLE8sRUFBU3VCLFcsRUFBYTtBQUNyQyxhQUFPdkIsT0FBTyxDQUFDRyxNQUFSLENBQWUsVUFBQVYsTUFBTTtBQUFBLGVBQUk4QixXQUFXLENBQUNDLElBQVosQ0FBaUIsVUFBQUMsUUFBUTtBQUFBLGlCQUFJaEMsTUFBTSxDQUFDZ0MsUUFBUCxJQUFtQkEsUUFBdkI7QUFBQSxTQUF6QixDQUFKO0FBQUEsT0FBckIsQ0FBUDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRyZWxsbyBmcm9tICd0cmVsbG8nO1xyXG5pbXBvcnQgeyBsb2cgfSBmcm9tICd1dGlsJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJlbGxvMm1kIHtcclxuICAgIGNvbnN0cnVjdG9yKGtleSwgdG9rZW4pIHtcclxuICAgICAgICB0aGlzLmtleSA9IGtleVxyXG4gICAgICAgIHRoaXMudG9rZW4gPSB0b2tlblxyXG4gICAgICAgIHRoaXMudHJlbGxvID0gbmV3IFRyZWxsbyhrZXksIHRva2VuKTtcclxuICAgIH1cclxuXHJcbiAgICBjb252ZXJ0KGRhdGEpIHtcclxuICAgICAgICBsZXQgbGluZXMgPSBbXTtcclxuICAgICAgICBsZXQgaSA9IDBcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICBsaW5lcy5wdXNoKGAjIyMjIyAkeysraX0uICR7ZGF0YVtrZXldLm5hbWV977yI55So5pe277yaJHtkYXRhW2tleV0uaG91cnN9aO+8iWApXHJcbiAgICAgICAgICAgIGxpbmVzLnB1c2goYC0g6L+b5bqm77yaYClcclxuICAgICAgICAgICAgZGF0YVtrZXldLmNvbW1lbnRzLm1hcCgodGV4dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFxuL2csIFwiIFwiKVxyXG4gICAgICAgICAgICAgICAgbGluZXMucHVzaChgLSAke3RleHR9YClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxpbmVzLnB1c2goJycpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxpbmVzLm1hcCgobGluZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhsaW5lKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy/moLnmja7nnIvmnb/lkI3np7DvvIzojrflj5bnnIvmnb9JRFxyXG4gICAgYXN5bmMgZ2V0Qm9hcmRJZChuYW1lKSB7XHJcbiAgICAgICAgbGV0IG1lbWJlciA9IGF3YWl0IHRoaXMudHJlbGxvLm1ha2VSZXF1ZXN0KCdnZXQnLCBgLzEvdG9rZW5zLyR7dGhpcy50b2tlbn0vbWVtYmVyYClcclxuICAgICAgICBsZXQgZmllbGRzID0gJ25hbWUsaWQnXHJcbiAgICAgICAgbGV0IGJvYXJkcyA9IGF3YWl0IHRoaXMudHJlbGxvLm1ha2VSZXF1ZXN0KCdnZXQnLCBgLzEvbWVtYmVycy8ke21lbWJlci5pZH0vYm9hcmRzYCx7ZmllbGRzfSlcclxuICAgICAgICBsZXQgYm9hcmQgPSBib2FyZHMuZmluZChib2FyZCA9PiBib2FyZC5uYW1lID09IG5hbWUpXHJcbiAgICAgICAgcmV0dXJuIGJvYXJkLmlkXHJcbiAgICB9XHJcblxyXG4gICAgLy/moLnmja7nnIvmnb9JRO+8jOiOt+WPlueci+adv+eahOaJgOacieaIkOWRmOaVsOaNrlxyXG4gICAgYXN5bmMgZ2V0Qm9hcmRNZW1iZXJzKGJvYXJkSWQpIHtcclxuICAgICAgICBsZXQgbWVtYmVycyA9IGF3YWl0IHRoaXMudHJlbGxvLm1ha2VSZXF1ZXN0KCdnZXQnLCBgLzEvYm9hcmRzLyR7Ym9hcmRJZH0vbWVtYmVyc2ApXHJcbiAgICAgICAgcmV0dXJuIG1lbWJlcnNcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluaIkOWRmOS7jnNpbmNl5pe26Ze054K56LW355qE5omA5pyJ5rS75YqoXHJcbiAgICBhc3luYyBnZXRNZW1iZXJBY3Rpb25zKG1lbWJlcklkLCBzaW5jZSkge1xyXG4gICAgICAgIGxldCBmaWx0ZXIgPSAnY29tbWVudENhcmQnLFxyXG4gICAgICAgICAgICBsaW1pdCA9IDEwMDAsXHJcbiAgICAgICAgICAgIGZpZWxkcyA9ICdkYXRhLGRhdGUnXHJcbiAgICAgICAgbGV0IGFjdGlvbnMgPSBhd2FpdCB0aGlzLnRyZWxsby5tYWtlUmVxdWVzdCgnZ2V0JywgYC8xL21lbWJlcnMvJHttZW1iZXJJZH0vYWN0aW9uc2AsIHtcclxuICAgICAgICAgICAgZmlsdGVyLFxyXG4gICAgICAgICAgICBsaW1pdCxcclxuICAgICAgICAgICAgc2luY2UsXHJcbiAgICAgICAgICAgIGZpZWxkc1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbGV0IGNhcmRBY3Rpb25zID0gdGhpcy5nZXRBY3Rpb25zQnlDYXJkKGFjdGlvbnMsIHNpbmNlKVxyXG4gICAgICAgIHRoaXMuY29udmVydChjYXJkQWN0aW9ucylcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluaMieWNoeeJh+WIhue7hOeahOa0u+WKqFxyXG4gICAgZ2V0QWN0aW9uc0J5Q2FyZChhY3Rpb25zKSB7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbnMucmVkdWNlKChwcmUsIGN1cnJlbnQpID0+IHtcclxuICAgICAgICAgICAgbGV0IGlkID0gY3VycmVudC5kYXRhLmNhcmQuaWRcclxuICAgICAgICAgICAgbGV0IGNvbW1lbnQgPSBjdXJyZW50LmRhdGEudGV4dFxyXG4gICAgICAgICAgICBsZXQgaG91cnMgPSB0aGlzLmdldFRvdGFsSG91cihjb21tZW50KVxyXG4gICAgICAgICAgICBpZiAocHJlW2lkXSkge1xyXG4gICAgICAgICAgICAgICAgcHJlW2lkXS5jb21tZW50cy5wdXNoKGNvbW1lbnQpXHJcbiAgICAgICAgICAgICAgICBwcmVbaWRdLmhvdXJzICs9IGhvdXJzXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwcmVbaWRdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGN1cnJlbnQuZGF0YS5jYXJkLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudHM6IFtjb21tZW50XSxcclxuICAgICAgICAgICAgICAgICAgICBob3Vyc1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwcmVcclxuICAgICAgICB9LCB7fSlcclxuICAgIH1cclxuXHJcbiAgICAvL+agueaNruWtl+espuS4suiuoeeul+aAu+eUqOaXtu+8iOS+i+Wmgu+8muWvueaOpUAuNWgg5L+u5pS5YnVnQDEuNWjvvIlcclxuICAgIGdldFRvdGFsSG91cihzdHIpIHtcclxuICAgICAgICBjb25zdCBtYXRjaEhvdXIgPSBuZXcgUmVnRXhwKFwiKD88PUApLio/KD89KGh8QCkpXCIsICdnaScpIC8v5Yy56YWNQOW8gOWktO+8jGjmiJZA57uT5bC+55qE5a2X56ym5LiyXHJcbiAgICAgICAgY29uc3QgaG91ckFyciA9IHN0ci5tYXRjaChtYXRjaEhvdXIpIHx8IFtdXHJcbiAgICAgICAgcmV0dXJuIGhvdXJBcnIucmVkdWNlKChhY2MsIGN1cikgPT4gYWNjICsgcGFyc2VGbG9hdChjdXIpLCAwKVxyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5bCP57uE5oiQ5ZGY5pWw5o2uXHJcbiAgICBmaWx0ZXJCb2FyZE1lbWJlcnMobWVtYmVycywgdXNlcm5hbWVBcnIpIHtcclxuICAgICAgICByZXR1cm4gbWVtYmVycy5maWx0ZXIobWVtYmVyID0+IHVzZXJuYW1lQXJyLnNvbWUodXNlcm5hbWUgPT4gbWVtYmVyLnVzZXJuYW1lID09IHVzZXJuYW1lKSlcclxuICAgIH1cclxuXHJcbn0iXX0=