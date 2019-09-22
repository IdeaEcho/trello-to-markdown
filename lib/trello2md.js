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

    if (key == 'your_key' || !key) {
      throw new Error('请修改config.js文件，将your_key替换成你的key。');
    }

    if (key == 'your_token' || !token) {
      throw new Error('请修改config.js文件，将your_token替换成你的token。');
    }

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
                if (!(name == 'your_board_name' || !name)) {
                  _context.next = 2;
                  break;
                }

                throw new Error('请修改config.js文件，将your_board_name替换成期望的看板名称。');

              case 2:
                _context.next = 4;
                return this.trello.makeRequest('get', "/1/tokens/".concat(this.token, "/member"));

              case 4:
                member = _context.sent;
                fields = 'name,id';
                _context.next = 8;
                return this.trello.makeRequest('get', "/1/members/".concat(member.id, "/boards"), {
                  fields: fields
                });

              case 8:
                boards = _context.sent;
                board = boards.find(function (board) {
                  return board.name == name;
                });
                return _context.abrupt("return", board.id);

              case 11:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cmVsbG8ybWQuanMiXSwibmFtZXMiOlsiVHJlbGxvMm1kIiwia2V5IiwidG9rZW4iLCJFcnJvciIsInRyZWxsbyIsIlRyZWxsbyIsImRhdGEiLCJsaW5lcyIsImkiLCJwdXNoIiwibmFtZSIsImhvdXJzIiwiY29tbWVudHMiLCJtYXAiLCJ0ZXh0IiwicmVwbGFjZSIsImxpbmUiLCJjb25zb2xlIiwibG9nIiwibWFrZVJlcXVlc3QiLCJtZW1iZXIiLCJmaWVsZHMiLCJpZCIsImJvYXJkcyIsImJvYXJkIiwiZmluZCIsImJvYXJkSWQiLCJtZW1iZXJzIiwibWVtYmVySWQiLCJzaW5jZSIsImZpbHRlciIsImxpbWl0IiwiYWN0aW9ucyIsImNhcmRBY3Rpb25zIiwiZ2V0QWN0aW9uc0J5Q2FyZCIsImNvbnZlcnQiLCJyZWR1Y2UiLCJwcmUiLCJjdXJyZW50IiwiY3VycmVudEJvYXJkSWQiLCJjYXJkIiwiY29tbWVudCIsImdldFRvdGFsSG91ciIsInN0ciIsIm1hdGNoSG91ciIsIlJlZ0V4cCIsImhvdXJBcnIiLCJtYXRjaCIsImFjYyIsImN1ciIsInBhcnNlRmxvYXQiLCJ1c2VybmFtZUFyciIsInNvbWUiLCJ1c2VybmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7SUFDcUJBLFM7OztBQUNqQixxQkFBWUMsR0FBWixFQUFpQkMsS0FBakIsRUFBd0I7QUFBQTs7QUFDcEIsUUFBSUQsR0FBRyxJQUFJLFVBQVAsSUFBcUIsQ0FBQ0EsR0FBMUIsRUFBK0I7QUFDM0IsWUFBTSxJQUFJRSxLQUFKLENBQVUsbUNBQVYsQ0FBTjtBQUNIOztBQUNELFFBQUlGLEdBQUcsSUFBSSxZQUFQLElBQXVCLENBQUNDLEtBQTVCLEVBQW1DO0FBQy9CLFlBQU0sSUFBSUMsS0FBSixDQUFVLHVDQUFWLENBQU47QUFDSDs7QUFDRCxTQUFLRixHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLRSxNQUFMLEdBQWMsSUFBSUMsa0JBQUosQ0FBV0osR0FBWCxFQUFnQkMsS0FBaEIsQ0FBZDtBQUNIOzs7OzRCQUVPSSxJLEVBQU07QUFDVixVQUFJQyxLQUFLLEdBQUcsRUFBWjtBQUNBLFVBQUlDLENBQUMsR0FBRyxDQUFSOztBQUNBLFdBQUssSUFBSVAsR0FBVCxJQUFnQkssSUFBaEIsRUFBc0I7QUFDbEJDLFFBQUFBLEtBQUssQ0FBQ0UsSUFBTixpQkFBb0IsRUFBRUQsQ0FBdEIsZUFBNEJGLElBQUksQ0FBQ0wsR0FBRCxDQUFKLENBQVVTLElBQXRDLHFDQUFpREosSUFBSSxDQUFDTCxHQUFELENBQUosQ0FBVVUsS0FBM0Q7QUFDQUosUUFBQUEsS0FBSyxDQUFDRSxJQUFOO0FBQ0FILFFBQUFBLElBQUksQ0FBQ0wsR0FBRCxDQUFKLENBQVVXLFFBQVYsQ0FBbUJDLEdBQW5CLENBQXVCLFVBQUNDLElBQUQsRUFBVTtBQUM3QkEsVUFBQUEsSUFBSSxHQUFHQSxJQUFJLENBQUNDLE9BQUwsQ0FBYSxLQUFiLEVBQW9CLEdBQXBCLENBQVA7QUFDQVIsVUFBQUEsS0FBSyxDQUFDRSxJQUFOLGFBQWdCSyxJQUFoQjtBQUNILFNBSEQ7QUFJQVAsUUFBQUEsS0FBSyxDQUFDRSxJQUFOLENBQVcsRUFBWDtBQUNIOztBQUNERixNQUFBQSxLQUFLLENBQUNNLEdBQU4sQ0FBVSxVQUFDRyxJQUFELEVBQVU7QUFDaEJDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixJQUFaO0FBQ0gsT0FGRDtBQUdILEssQ0FFRDs7Ozs7OztvREFDaUJOLEk7Ozs7OztzQkFDVEEsSUFBSSxJQUFJLGlCQUFSLElBQTZCLENBQUNBLEk7Ozs7O3NCQUN4QixJQUFJUCxLQUFKLENBQVUsNENBQVYsQzs7Ozt1QkFFUyxLQUFLQyxNQUFMLENBQVllLFdBQVosQ0FBd0IsS0FBeEIsc0JBQTRDLEtBQUtqQixLQUFqRCxhOzs7QUFBZmtCLGdCQUFBQSxNO0FBQ0FDLGdCQUFBQSxNLEdBQVMsUzs7dUJBQ00sS0FBS2pCLE1BQUwsQ0FBWWUsV0FBWixDQUF3QixLQUF4Qix1QkFBNkNDLE1BQU0sQ0FBQ0UsRUFBcEQsY0FBaUU7QUFDaEZELGtCQUFBQSxNQUFNLEVBQU5BO0FBRGdGLGlCQUFqRSxDOzs7QUFBZkUsZ0JBQUFBLE07QUFHQUMsZ0JBQUFBLEssR0FBUUQsTUFBTSxDQUFDRSxJQUFQLENBQVksVUFBQUQsS0FBSztBQUFBLHlCQUFJQSxLQUFLLENBQUNkLElBQU4sSUFBY0EsSUFBbEI7QUFBQSxpQkFBakIsQztpREFDTGMsS0FBSyxDQUFDRixFOzs7Ozs7Ozs7Ozs7Ozs7UUFHakI7Ozs7Ozs7cURBQ3NCSSxPOzs7Ozs7O3VCQUNFLEtBQUt0QixNQUFMLENBQVllLFdBQVosQ0FBd0IsS0FBeEIsc0JBQTRDTyxPQUE1QyxjOzs7QUFBaEJDLGdCQUFBQSxPO2tEQUNHQSxPOzs7Ozs7Ozs7Ozs7Ozs7UUFHWDs7Ozs7OztxREFDdUJELE8sRUFBU0UsUSxFQUFVQyxLOzs7Ozs7QUFDbENDLGdCQUFBQSxNLEdBQVMsYSxFQUNUQyxLLEdBQVEsSSxFQUNSVixNLEdBQVMsVzs7dUJBQ08sS0FBS2pCLE1BQUwsQ0FBWWUsV0FBWixDQUF3QixLQUF4Qix1QkFBNkNTLFFBQTdDLGVBQWlFO0FBQ2pGRSxrQkFBQUEsTUFBTSxFQUFOQSxNQURpRjtBQUVqRkMsa0JBQUFBLEtBQUssRUFBTEEsS0FGaUY7QUFHakZGLGtCQUFBQSxLQUFLLEVBQUxBLEtBSGlGO0FBSWpGUixrQkFBQUEsTUFBTSxFQUFOQTtBQUppRixpQkFBakUsQzs7O0FBQWhCVyxnQkFBQUEsTztBQU1BQyxnQkFBQUEsVyxHQUFjLEtBQUtDLGdCQUFMLENBQXNCUixPQUF0QixFQUErQk0sT0FBL0IsQztBQUNsQixxQkFBS0csT0FBTCxDQUFhRixXQUFiOzs7Ozs7Ozs7Ozs7Ozs7UUFHSjs7OztxQ0FDaUJQLE8sRUFBU00sTyxFQUFTO0FBQUE7O0FBQy9CLGFBQU9BLE9BQU8sQ0FBQ0ksTUFBUixDQUFlLFVBQUNDLEdBQUQsRUFBTUMsT0FBTixFQUFrQjtBQUNwQyxZQUFJQyxjQUFjLEdBQUdELE9BQU8sQ0FBQ2hDLElBQVIsQ0FBYWtCLEtBQWIsQ0FBbUJGLEVBQXhDO0FBQ0EsWUFBSWlCLGNBQWMsSUFBSWIsT0FBdEIsRUFBK0IsT0FBT1csR0FBUDtBQUMvQixZQUFJZixFQUFFLEdBQUdnQixPQUFPLENBQUNoQyxJQUFSLENBQWFrQyxJQUFiLENBQWtCbEIsRUFBM0I7QUFDQSxZQUFJbUIsT0FBTyxHQUFHSCxPQUFPLENBQUNoQyxJQUFSLENBQWFRLElBQTNCOztBQUNBLFlBQUlILEtBQUssR0FBRyxLQUFJLENBQUMrQixZQUFMLENBQWtCRCxPQUFsQixDQUFaOztBQUNBLFlBQUlKLEdBQUcsQ0FBQ2YsRUFBRCxDQUFQLEVBQWE7QUFDVGUsVUFBQUEsR0FBRyxDQUFDZixFQUFELENBQUgsQ0FBUVYsUUFBUixDQUFpQkgsSUFBakIsQ0FBc0JnQyxPQUF0QjtBQUNBSixVQUFBQSxHQUFHLENBQUNmLEVBQUQsQ0FBSCxDQUFRWCxLQUFSLElBQWlCQSxLQUFqQjtBQUNILFNBSEQsTUFHTztBQUNIMEIsVUFBQUEsR0FBRyxDQUFDZixFQUFELENBQUgsR0FBVTtBQUNOWixZQUFBQSxJQUFJLEVBQUU0QixPQUFPLENBQUNoQyxJQUFSLENBQWFrQyxJQUFiLENBQWtCOUIsSUFEbEI7QUFFTkUsWUFBQUEsUUFBUSxFQUFFLENBQUM2QixPQUFELENBRko7QUFHTjlCLFlBQUFBLEtBQUssRUFBTEE7QUFITSxXQUFWO0FBS0g7O0FBQ0QsZUFBTzBCLEdBQVA7QUFDSCxPQWpCTSxFQWlCSixFQWpCSSxDQUFQO0FBa0JILEssQ0FFRDs7OztpQ0FDYU0sRyxFQUFLO0FBQ2QsVUFBTUMsU0FBUyxHQUFHLElBQUlDLE1BQUosQ0FBVyxvQkFBWCxFQUFpQyxJQUFqQyxDQUFsQixDQURjLENBQzJDOztBQUN6RCxVQUFNQyxPQUFPLEdBQUdILEdBQUcsQ0FBQ0ksS0FBSixDQUFVSCxTQUFWLEtBQXdCLEVBQXhDO0FBQ0EsYUFBT0UsT0FBTyxDQUFDVixNQUFSLENBQWUsVUFBQ1ksR0FBRCxFQUFNQyxHQUFOO0FBQUEsZUFBY0QsR0FBRyxHQUFHRSxVQUFVLENBQUNELEdBQUQsQ0FBOUI7QUFBQSxPQUFmLEVBQW9ELENBQXBELENBQVA7QUFDSCxLLENBRUQ7Ozs7dUNBQ21CdEIsTyxFQUFTd0IsVyxFQUFhO0FBQ3JDLGFBQU94QixPQUFPLENBQUNHLE1BQVIsQ0FBZSxVQUFBVixNQUFNO0FBQUEsZUFBSStCLFdBQVcsQ0FBQ0MsSUFBWixDQUFpQixVQUFBQyxRQUFRO0FBQUEsaUJBQUlqQyxNQUFNLENBQUNpQyxRQUFQLElBQW1CQSxRQUF2QjtBQUFBLFNBQXpCLENBQUo7QUFBQSxPQUFyQixDQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVHJlbGxvIGZyb20gJ3RyZWxsbydcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyZWxsbzJtZCB7XG4gICAgY29uc3RydWN0b3Ioa2V5LCB0b2tlbikge1xuICAgICAgICBpZiAoa2V5ID09ICd5b3VyX2tleScgfHwgIWtleSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCfor7fkv67mlLljb25maWcuanPmlofku7bvvIzlsIZ5b3VyX2tleeabv+aNouaIkOS9oOeahGtleeOAgicpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleSA9PSAneW91cl90b2tlbicgfHwgIXRva2VuKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ+ivt+S/ruaUuWNvbmZpZy5qc+aWh+S7tu+8jOWwhnlvdXJfdG9rZW7mm7/mjaLmiJDkvaDnmoR0b2tlbuOAgicpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5rZXkgPSBrZXlcbiAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuXG4gICAgICAgIHRoaXMudHJlbGxvID0gbmV3IFRyZWxsbyhrZXksIHRva2VuKVxuICAgIH1cblxuICAgIGNvbnZlcnQoZGF0YSkge1xuICAgICAgICBsZXQgbGluZXMgPSBbXVxuICAgICAgICBsZXQgaSA9IDBcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGRhdGEpIHtcbiAgICAgICAgICAgIGxpbmVzLnB1c2goYCMjIyMjICR7KytpfS4gJHtkYXRhW2tleV0ubmFtZX3vvIjnlKjml7bvvJoke2RhdGFba2V5XS5ob3Vyc31o77yJYClcbiAgICAgICAgICAgIGxpbmVzLnB1c2goYC0g6L+b5bqm77yaYClcbiAgICAgICAgICAgIGRhdGFba2V5XS5jb21tZW50cy5tYXAoKHRleHQpID0+IHtcbiAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXG4vZywgXCIgXCIpXG4gICAgICAgICAgICAgICAgbGluZXMucHVzaChgLSAke3RleHR9YClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBsaW5lcy5wdXNoKCcnKVxuICAgICAgICB9XG4gICAgICAgIGxpbmVzLm1hcCgobGluZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobGluZSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvL+agueaNrueci+adv+WQjeensO+8jOiOt+WPlueci+adv0lEXG4gICAgYXN5bmMgZ2V0Qm9hcmRJZChuYW1lKSB7XG4gICAgICAgIGlmIChuYW1lID09ICd5b3VyX2JvYXJkX25hbWUnIHx8ICFuYW1lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ+ivt+S/ruaUuWNvbmZpZy5qc+aWh+S7tu+8jOWwhnlvdXJfYm9hcmRfbmFtZeabv+aNouaIkOacn+acm+eahOeci+adv+WQjeensOOAgicpXG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1lbWJlciA9IGF3YWl0IHRoaXMudHJlbGxvLm1ha2VSZXF1ZXN0KCdnZXQnLCBgLzEvdG9rZW5zLyR7dGhpcy50b2tlbn0vbWVtYmVyYClcbiAgICAgICAgbGV0IGZpZWxkcyA9ICduYW1lLGlkJ1xuICAgICAgICBsZXQgYm9hcmRzID0gYXdhaXQgdGhpcy50cmVsbG8ubWFrZVJlcXVlc3QoJ2dldCcsIGAvMS9tZW1iZXJzLyR7bWVtYmVyLmlkfS9ib2FyZHNgLCB7XG4gICAgICAgICAgICBmaWVsZHNcbiAgICAgICAgfSlcbiAgICAgICAgbGV0IGJvYXJkID0gYm9hcmRzLmZpbmQoYm9hcmQgPT4gYm9hcmQubmFtZSA9PSBuYW1lKVxuICAgICAgICByZXR1cm4gYm9hcmQuaWRcbiAgICB9XG5cbiAgICAvL+agueaNrueci+adv0lE77yM6I635Y+W55yL5p2/55qE5omA5pyJ5oiQ5ZGY5pWw5o2uXG4gICAgYXN5bmMgZ2V0Qm9hcmRNZW1iZXJzKGJvYXJkSWQpIHtcbiAgICAgICAgbGV0IG1lbWJlcnMgPSBhd2FpdCB0aGlzLnRyZWxsby5tYWtlUmVxdWVzdCgnZ2V0JywgYC8xL2JvYXJkcy8ke2JvYXJkSWR9L21lbWJlcnNgKVxuICAgICAgICByZXR1cm4gbWVtYmVyc1xuICAgIH1cblxuICAgIC8v6I635Y+W5oiQ5ZGY5LuOc2luY2Xml7bpl7TngrnotbfnmoTmiYDmnInmtLvliqhcbiAgICBhc3luYyBnZXRNZW1iZXJBY3Rpb25zKGJvYXJkSWQsIG1lbWJlcklkLCBzaW5jZSkge1xuICAgICAgICBsZXQgZmlsdGVyID0gJ2NvbW1lbnRDYXJkJyxcbiAgICAgICAgICAgIGxpbWl0ID0gMTAwMCxcbiAgICAgICAgICAgIGZpZWxkcyA9ICdkYXRhLGRhdGUnXG4gICAgICAgIGxldCBhY3Rpb25zID0gYXdhaXQgdGhpcy50cmVsbG8ubWFrZVJlcXVlc3QoJ2dldCcsIGAvMS9tZW1iZXJzLyR7bWVtYmVySWR9L2FjdGlvbnNgLCB7XG4gICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICBsaW1pdCxcbiAgICAgICAgICAgIHNpbmNlLFxuICAgICAgICAgICAgZmllbGRzXG4gICAgICAgIH0pXG4gICAgICAgIGxldCBjYXJkQWN0aW9ucyA9IHRoaXMuZ2V0QWN0aW9uc0J5Q2FyZChib2FyZElkLCBhY3Rpb25zKVxuICAgICAgICB0aGlzLmNvbnZlcnQoY2FyZEFjdGlvbnMpXG4gICAgfVxuXG4gICAgLy/ojrflj5bmjInljaHniYfliIbnu4TnmoTmtLvliqhcbiAgICBnZXRBY3Rpb25zQnlDYXJkKGJvYXJkSWQsIGFjdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGFjdGlvbnMucmVkdWNlKChwcmUsIGN1cnJlbnQpID0+IHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50Qm9hcmRJZCA9IGN1cnJlbnQuZGF0YS5ib2FyZC5pZFxuICAgICAgICAgICAgaWYgKGN1cnJlbnRCb2FyZElkICE9IGJvYXJkSWQpIHJldHVybiBwcmVcbiAgICAgICAgICAgIGxldCBpZCA9IGN1cnJlbnQuZGF0YS5jYXJkLmlkXG4gICAgICAgICAgICBsZXQgY29tbWVudCA9IGN1cnJlbnQuZGF0YS50ZXh0XG4gICAgICAgICAgICBsZXQgaG91cnMgPSB0aGlzLmdldFRvdGFsSG91cihjb21tZW50KVxuICAgICAgICAgICAgaWYgKHByZVtpZF0pIHtcbiAgICAgICAgICAgICAgICBwcmVbaWRdLmNvbW1lbnRzLnB1c2goY29tbWVudClcbiAgICAgICAgICAgICAgICBwcmVbaWRdLmhvdXJzICs9IGhvdXJzXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByZVtpZF0gPSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGN1cnJlbnQuZGF0YS5jYXJkLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnRzOiBbY29tbWVudF0sXG4gICAgICAgICAgICAgICAgICAgIGhvdXJzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByZVxuICAgICAgICB9LCB7fSlcbiAgICB9XG5cbiAgICAvL+agueaNruWtl+espuS4suiuoeeul+aAu+eUqOaXtu+8iOS+i+Wmgu+8muWvueaOpUAuNWgg5L+u5pS5YnVnQDEuNWjvvIlcbiAgICBnZXRUb3RhbEhvdXIoc3RyKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoSG91ciA9IG5ldyBSZWdFeHAoXCIoPzw9QCkuKj8oPz0oaHxAKSlcIiwgJ2dpJykgLy/ljLnphY1A5byA5aS077yMaOaIlkDnu5PlsL7nmoTlrZfnrKbkuLJcbiAgICAgICAgY29uc3QgaG91ckFyciA9IHN0ci5tYXRjaChtYXRjaEhvdXIpIHx8IFtdXG4gICAgICAgIHJldHVybiBob3VyQXJyLnJlZHVjZSgoYWNjLCBjdXIpID0+IGFjYyArIHBhcnNlRmxvYXQoY3VyKSwgMClcbiAgICB9XG5cbiAgICAvL+iOt+WPluWwj+e7hOaIkOWRmOaVsOaNrlxuICAgIGZpbHRlckJvYXJkTWVtYmVycyhtZW1iZXJzLCB1c2VybmFtZUFycikge1xuICAgICAgICByZXR1cm4gbWVtYmVycy5maWx0ZXIobWVtYmVyID0+IHVzZXJuYW1lQXJyLnNvbWUodXNlcm5hbWUgPT4gbWVtYmVyLnVzZXJuYW1lID09IHVzZXJuYW1lKSlcbiAgICB9XG5cbn0iXX0=