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
    } //获取memberId成员从since时间点起的所有活动

  }, {
    key: "getMemberActions",
    value: function () {
      var _getMemberActions = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(memberId, since) {
        var filter, limit, fields, actions, cardActions;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                filter = 'commentCard', limit = 1000, fields = 'data,date';
                _context.next = 3;
                return this.trello.makeRequest('get', "/1/members/".concat(memberId, "/actions"), {
                  filter: filter,
                  limit: limit,
                  since: since,
                  fields: fields
                });

              case 3:
                actions = _context.sent;
                cardActions = this.getActionsByCard(actions, since);
                this.convert(cardActions);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getMemberActions(_x, _x2) {
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
    } //根据boardId，获取看板的所有成员的memberId

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

      function getBoardMembers(_x3) {
        return _getBoardMembers.apply(this, arguments);
      }

      return getBoardMembers;
    }()
  }, {
    key: "getSingleMember",
    value: function getSingleMember(members, username) {
      return members.filter(function (member) {
        return member.username == username;
      });
    }
  }, {
    key: "getTeamMembers",
    value: function getTeamMembers(members, usernameArr) {
      return members.filter(function (member) {
        return usernameArr.some(function (item) {
          return member.username == item;
        });
      });
    }
  }]);
  return Trello2md;
}();

exports["default"] = Trello2md;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cmVsbG8ybWQuanMiXSwibmFtZXMiOlsiVHJlbGxvMm1kIiwia2V5IiwidG9rZW4iLCJ0cmVsbG8iLCJUcmVsbG8iLCJkYXRhIiwibGluZXMiLCJpIiwicHVzaCIsIm5hbWUiLCJob3VycyIsImNvbW1lbnRzIiwibWFwIiwidGV4dCIsInJlcGxhY2UiLCJsaW5lIiwiY29uc29sZSIsImxvZyIsIm1lbWJlcklkIiwic2luY2UiLCJmaWx0ZXIiLCJsaW1pdCIsImZpZWxkcyIsIm1ha2VSZXF1ZXN0IiwiYWN0aW9ucyIsImNhcmRBY3Rpb25zIiwiZ2V0QWN0aW9uc0J5Q2FyZCIsImNvbnZlcnQiLCJyZWR1Y2UiLCJwcmUiLCJjdXJyZW50IiwiaWQiLCJjYXJkIiwiY29tbWVudCIsImdldFRvdGFsSG91ciIsInN0ciIsIm1hdGNoSG91ciIsIlJlZ0V4cCIsImhvdXJBcnIiLCJtYXRjaCIsImFjYyIsImN1ciIsInBhcnNlRmxvYXQiLCJib2FyZElkIiwibWVtYmVycyIsInVzZXJuYW1lIiwibWVtYmVyIiwidXNlcm5hbWVBcnIiLCJzb21lIiwiaXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7SUFDcUJBLFM7OztBQUNqQixxQkFBWUMsR0FBWixFQUFpQkMsS0FBakIsRUFBd0I7QUFBQTtBQUNwQixTQUFLQyxNQUFMLEdBQWMsSUFBSUMsa0JBQUosQ0FBV0gsR0FBWCxFQUFnQkMsS0FBaEIsQ0FBZDtBQUNIOzs7OzRCQUVPRyxJLEVBQU07QUFDVixVQUFJQyxLQUFLLEdBQUcsRUFBWjtBQUNBLFVBQUlDLENBQUMsR0FBRyxDQUFSO0FBQ0FELE1BQUFBLEtBQUssQ0FBQ0UsSUFBTjs7QUFDQSxXQUFLLElBQUlQLEdBQVQsSUFBZ0JJLElBQWhCLEVBQXNCO0FBQ2xCQyxRQUFBQSxLQUFLLENBQUNFLElBQU4saUJBQW9CLEVBQUVELENBQXRCLGVBQTRCRixJQUFJLENBQUNKLEdBQUQsQ0FBSixDQUFVUSxJQUF0QyxxQ0FBaURKLElBQUksQ0FBQ0osR0FBRCxDQUFKLENBQVVTLEtBQTNEO0FBQ0FKLFFBQUFBLEtBQUssQ0FBQ0UsSUFBTjtBQUNBSCxRQUFBQSxJQUFJLENBQUNKLEdBQUQsQ0FBSixDQUFVVSxRQUFWLENBQW1CQyxHQUFuQixDQUF1QixVQUFDQyxJQUFELEVBQVU7QUFDN0JBLFVBQUFBLElBQUksR0FBR0EsSUFBSSxDQUFDQyxPQUFMLENBQWEsS0FBYixFQUFtQixHQUFuQixDQUFQO0FBQ0FSLFVBQUFBLEtBQUssQ0FBQ0UsSUFBTixhQUFnQkssSUFBaEI7QUFDSCxTQUhEO0FBSUFQLFFBQUFBLEtBQUssQ0FBQ0UsSUFBTixDQUFXLEVBQVg7QUFDSDs7QUFDREYsTUFBQUEsS0FBSyxDQUFDTSxHQUFOLENBQVUsVUFBQ0csSUFBRCxFQUFVO0FBQ2hCQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsSUFBWjtBQUNILE9BRkQ7QUFHSCxLLENBRUQ7Ozs7Ozs7b0RBQ3VCRyxRLEVBQVVDLEs7Ozs7OztBQUN6QkMsZ0JBQUFBLE0sR0FBUyxhLEVBQ1RDLEssR0FBUSxJLEVBQ1JDLE0sR0FBUyxXOzt1QkFDTyxLQUFLbkIsTUFBTCxDQUFZb0IsV0FBWixDQUF3QixLQUF4Qix1QkFBNkNMLFFBQTdDLGVBQWlFO0FBQ2pGRSxrQkFBQUEsTUFBTSxFQUFOQSxNQURpRjtBQUVqRkMsa0JBQUFBLEtBQUssRUFBTEEsS0FGaUY7QUFHakZGLGtCQUFBQSxLQUFLLEVBQUxBLEtBSGlGO0FBSWpGRyxrQkFBQUEsTUFBTSxFQUFOQTtBQUppRixpQkFBakUsQzs7O0FBQWhCRSxnQkFBQUEsTztBQU1BQyxnQkFBQUEsVyxHQUFjLEtBQUtDLGdCQUFMLENBQXNCRixPQUF0QixFQUErQkwsS0FBL0IsQztBQUNsQixxQkFBS1EsT0FBTCxDQUFhRixXQUFiOzs7Ozs7Ozs7Ozs7Ozs7UUFHSjs7OztxQ0FDaUJELE8sRUFBUztBQUFBOztBQUN0QixhQUFPQSxPQUFPLENBQUNJLE1BQVIsQ0FBZSxVQUFDQyxHQUFELEVBQU1DLE9BQU4sRUFBa0I7QUFDcEMsWUFBSUMsRUFBRSxHQUFHRCxPQUFPLENBQUN6QixJQUFSLENBQWEyQixJQUFiLENBQWtCRCxFQUEzQjtBQUNBLFlBQUlFLE9BQU8sR0FBR0gsT0FBTyxDQUFDekIsSUFBUixDQUFhUSxJQUEzQjs7QUFDQSxZQUFJSCxLQUFLLEdBQUcsS0FBSSxDQUFDd0IsWUFBTCxDQUFrQkQsT0FBbEIsQ0FBWjs7QUFDQSxZQUFJSixHQUFHLENBQUNFLEVBQUQsQ0FBUCxFQUFhO0FBQ1RGLFVBQUFBLEdBQUcsQ0FBQ0UsRUFBRCxDQUFILENBQVFwQixRQUFSLENBQWlCSCxJQUFqQixDQUFzQnlCLE9BQXRCO0FBQ0FKLFVBQUFBLEdBQUcsQ0FBQ0UsRUFBRCxDQUFILENBQVFyQixLQUFSLElBQWlCQSxLQUFqQjtBQUNILFNBSEQsTUFHTztBQUNIbUIsVUFBQUEsR0FBRyxDQUFDRSxFQUFELENBQUgsR0FBVTtBQUNOdEIsWUFBQUEsSUFBSSxFQUFFcUIsT0FBTyxDQUFDekIsSUFBUixDQUFhMkIsSUFBYixDQUFrQnZCLElBRGxCO0FBRU5FLFlBQUFBLFFBQVEsRUFBRSxDQUFDc0IsT0FBRCxDQUZKO0FBR052QixZQUFBQSxLQUFLLEVBQUxBO0FBSE0sV0FBVjtBQUtIOztBQUNELGVBQU9tQixHQUFQO0FBQ0gsT0FmTSxFQWVKLEVBZkksQ0FBUDtBQWdCSCxLLENBRUQ7Ozs7aUNBQ2FNLEcsRUFBSztBQUNkLFVBQU1DLFNBQVMsR0FBRyxJQUFJQyxNQUFKLENBQVcsb0JBQVgsRUFBaUMsSUFBakMsQ0FBbEIsQ0FEYyxDQUMyQzs7QUFDekQsVUFBTUMsT0FBTyxHQUFHSCxHQUFHLENBQUNJLEtBQUosQ0FBVUgsU0FBVixDQUFoQjtBQUNBLGFBQU9FLE9BQU8sQ0FBQ1YsTUFBUixDQUFlLFVBQUNZLEdBQUQsRUFBTUMsR0FBTjtBQUFBLGVBQWNELEdBQUcsR0FBR0UsVUFBVSxDQUFDRCxHQUFELENBQTlCO0FBQUEsT0FBZixFQUFvRCxDQUFwRCxDQUFQO0FBQ0gsSyxDQUVEOzs7Ozs7O3FEQUNzQkUsTzs7Ozs7Ozt1QkFDRSxLQUFLeEMsTUFBTCxDQUFZb0IsV0FBWixDQUF3QixLQUF4QixzQkFBNENvQixPQUE1QyxjOzs7QUFBaEJDLGdCQUFBQSxPO2tEQUNHQSxPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7b0NBR0tBLE8sRUFBUUMsUSxFQUFVO0FBQzlCLGFBQU9ELE9BQU8sQ0FBQ3hCLE1BQVIsQ0FBZSxVQUFBMEIsTUFBTTtBQUFBLGVBQUlBLE1BQU0sQ0FBQ0QsUUFBUCxJQUFpQkEsUUFBckI7QUFBQSxPQUFyQixDQUFQO0FBQ0g7OzttQ0FFY0QsTyxFQUFRRyxXLEVBQWE7QUFDaEMsYUFBT0gsT0FBTyxDQUFDeEIsTUFBUixDQUFlLFVBQUEwQixNQUFNO0FBQUEsZUFBSUMsV0FBVyxDQUFDQyxJQUFaLENBQWlCLFVBQUFDLElBQUk7QUFBQSxpQkFBRUgsTUFBTSxDQUFDRCxRQUFQLElBQWlCSSxJQUFuQjtBQUFBLFNBQXJCLENBQUo7QUFBQSxPQUFyQixDQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVHJlbGxvIGZyb20gJ3RyZWxsbyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmVsbG8ybWQge1xuICAgIGNvbnN0cnVjdG9yKGtleSwgdG9rZW4pIHtcbiAgICAgICAgdGhpcy50cmVsbG8gPSBuZXcgVHJlbGxvKGtleSwgdG9rZW4pO1xuICAgIH1cblxuICAgIGNvbnZlcnQoZGF0YSkge1xuICAgICAgICBsZXQgbGluZXMgPSBbXTtcbiAgICAgICAgbGV0IGkgPSAwXG4gICAgICAgIGxpbmVzLnB1c2goYCMjIOacrOWRqOW3peS9nGApXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBsaW5lcy5wdXNoKGAjIyMjIyAkeysraX0uICR7ZGF0YVtrZXldLm5hbWV977yI55So5pe277yaJHtkYXRhW2tleV0uaG91cnN9aO+8iWApXG4gICAgICAgICAgICBsaW5lcy5wdXNoKGAtIOi/m+W6pu+8mmApXG4gICAgICAgICAgICBkYXRhW2tleV0uY29tbWVudHMubWFwKCh0ZXh0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFxuL2csXCIgXCIpXG4gICAgICAgICAgICAgICAgbGluZXMucHVzaChgLSAke3RleHR9YClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGluZXMucHVzaCgnJylcbiAgICAgICAgfVxuICAgICAgICBsaW5lcy5tYXAoKGxpbmUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxpbmUpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy/ojrflj5ZtZW1iZXJJZOaIkOWRmOS7jnNpbmNl5pe26Ze054K56LW355qE5omA5pyJ5rS75YqoXG4gICAgYXN5bmMgZ2V0TWVtYmVyQWN0aW9ucyhtZW1iZXJJZCwgc2luY2UpIHtcbiAgICAgICAgbGV0IGZpbHRlciA9ICdjb21tZW50Q2FyZCcsXG4gICAgICAgICAgICBsaW1pdCA9IDEwMDAsXG4gICAgICAgICAgICBmaWVsZHMgPSAnZGF0YSxkYXRlJ1xuICAgICAgICBsZXQgYWN0aW9ucyA9IGF3YWl0IHRoaXMudHJlbGxvLm1ha2VSZXF1ZXN0KCdnZXQnLCBgLzEvbWVtYmVycy8ke21lbWJlcklkfS9hY3Rpb25zYCwge1xuICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgbGltaXQsXG4gICAgICAgICAgICBzaW5jZSxcbiAgICAgICAgICAgIGZpZWxkc1xuICAgICAgICB9KVxuICAgICAgICBsZXQgY2FyZEFjdGlvbnMgPSB0aGlzLmdldEFjdGlvbnNCeUNhcmQoYWN0aW9ucywgc2luY2UpXG4gICAgICAgIHRoaXMuY29udmVydChjYXJkQWN0aW9ucylcbiAgICB9XG5cbiAgICAvL+iOt+WPluaMieWNoeeJh+WIhue7hOeahOa0u+WKqFxuICAgIGdldEFjdGlvbnNCeUNhcmQoYWN0aW9ucykge1xuICAgICAgICByZXR1cm4gYWN0aW9ucy5yZWR1Y2UoKHByZSwgY3VycmVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IGlkID0gY3VycmVudC5kYXRhLmNhcmQuaWRcbiAgICAgICAgICAgIGxldCBjb21tZW50ID0gY3VycmVudC5kYXRhLnRleHRcbiAgICAgICAgICAgIGxldCBob3VycyA9IHRoaXMuZ2V0VG90YWxIb3VyKGNvbW1lbnQpXG4gICAgICAgICAgICBpZiAocHJlW2lkXSkge1xuICAgICAgICAgICAgICAgIHByZVtpZF0uY29tbWVudHMucHVzaChjb21tZW50KVxuICAgICAgICAgICAgICAgIHByZVtpZF0uaG91cnMgKz0gaG91cnNcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJlW2lkXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogY3VycmVudC5kYXRhLmNhcmQubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudHM6IFtjb21tZW50XSxcbiAgICAgICAgICAgICAgICAgICAgaG91cnNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJlXG4gICAgICAgIH0sIHt9KVxuICAgIH1cblxuICAgIC8v5qC55o2u5a2X56ym5Liy6K6h566X5oC755So5pe277yI5L6L5aaC77ya5a+55o6lQC41aCDkv67mlLlidWdAMS41aO+8iVxuICAgIGdldFRvdGFsSG91cihzdHIpIHtcbiAgICAgICAgY29uc3QgbWF0Y2hIb3VyID0gbmV3IFJlZ0V4cChcIig/PD1AKS4qPyg/PShofEApKVwiLCAnZ2knKSAvL+WMuemFjUDlvIDlpLTvvIxo5oiWQOe7k+WwvueahOWtl+espuS4slxuICAgICAgICBjb25zdCBob3VyQXJyID0gc3RyLm1hdGNoKG1hdGNoSG91cilcbiAgICAgICAgcmV0dXJuIGhvdXJBcnIucmVkdWNlKChhY2MsIGN1cikgPT4gYWNjICsgcGFyc2VGbG9hdChjdXIpLCAwKVxuICAgIH1cblxuICAgIC8v5qC55o2uYm9hcmRJZO+8jOiOt+WPlueci+adv+eahOaJgOacieaIkOWRmOeahG1lbWJlcklkXG4gICAgYXN5bmMgZ2V0Qm9hcmRNZW1iZXJzKGJvYXJkSWQpIHtcbiAgICAgICAgbGV0IG1lbWJlcnMgPSBhd2FpdCB0aGlzLnRyZWxsby5tYWtlUmVxdWVzdCgnZ2V0JywgYC8xL2JvYXJkcy8ke2JvYXJkSWR9L21lbWJlcnNgKVxuICAgICAgICByZXR1cm4gbWVtYmVyc1xuICAgIH1cblxuICAgIGdldFNpbmdsZU1lbWJlcihtZW1iZXJzLHVzZXJuYW1lKSB7XG4gICAgICAgIHJldHVybiBtZW1iZXJzLmZpbHRlcihtZW1iZXIgPT4gbWVtYmVyLnVzZXJuYW1lPT11c2VybmFtZSlcbiAgICB9XG5cbiAgICBnZXRUZWFtTWVtYmVycyhtZW1iZXJzLHVzZXJuYW1lQXJyKSB7XG4gICAgICAgIHJldHVybiBtZW1iZXJzLmZpbHRlcihtZW1iZXIgPT4gdXNlcm5hbWVBcnIuc29tZShpdGVtPT5tZW1iZXIudXNlcm5hbWU9PWl0ZW0pKVxuICAgIH1cbn0iXX0=