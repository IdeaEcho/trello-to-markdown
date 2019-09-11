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
      lines.push("## \u672C\u5468\u5DE5\u4F5C");

      for (var key in data) {
        lines.push("##### ".concat(data[key].name, "\uFF08\u7528\u65F6\uFF1A").concat(data[key].hours, "h\uFF09"));
        lines.push("- \u8FDB\u5EA6\uFF1A");
        data[key].comments.map(function (text) {
          lines.push("- ".concat(text));
        });
        lines.push('');
      }

      lines.map(function (line) {
        console.log(line);
      });
    } //获取评论，根据卡片分组

  }, {
    key: "getCommentsByCard",
    value: function getCommentsByCard(actions) {
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
    }
  }, {
    key: "getTotalHour",
    value: function getTotalHour(str) {
      var matchHour = new RegExp("(?<=@).*?(?=(h|@))", 'gi'); //匹配@开头，h或@结尾的字符串

      var hourArr = str.match(matchHour);
      return hourArr.reduce(function (acc, cur) {
        return acc + parseFloat(cur);
      }, 0);
    } //获取某个成员的所有评论

  }, {
    key: "getMemberActions",
    value: function () {
      var _getMemberActions = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(memberId, since) {
        var filter, limit, fields, actions, comments;
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
                comments = this.getCommentsByCard(actions, since);
                this.convert(comments);

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
    }()
  }]);
  return Trello2md;
}();

exports["default"] = Trello2md;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cmVsbG8ybWQuanMiXSwibmFtZXMiOlsiVHJlbGxvMm1kIiwia2V5IiwidG9rZW4iLCJ0cmVsbG8iLCJUcmVsbG8iLCJkYXRhIiwibGluZXMiLCJwdXNoIiwibmFtZSIsImhvdXJzIiwiY29tbWVudHMiLCJtYXAiLCJ0ZXh0IiwibGluZSIsImNvbnNvbGUiLCJsb2ciLCJhY3Rpb25zIiwicmVkdWNlIiwicHJlIiwiY3VycmVudCIsImlkIiwiY2FyZCIsImNvbW1lbnQiLCJnZXRUb3RhbEhvdXIiLCJzdHIiLCJtYXRjaEhvdXIiLCJSZWdFeHAiLCJob3VyQXJyIiwibWF0Y2giLCJhY2MiLCJjdXIiLCJwYXJzZUZsb2F0IiwibWVtYmVySWQiLCJzaW5jZSIsImZpbHRlciIsImxpbWl0IiwiZmllbGRzIiwibWFrZVJlcXVlc3QiLCJnZXRDb21tZW50c0J5Q2FyZCIsImNvbnZlcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0lBQ3FCQSxTOzs7QUFDakIscUJBQVlDLEdBQVosRUFBaUJDLEtBQWpCLEVBQXdCO0FBQUE7QUFDcEIsU0FBS0MsTUFBTCxHQUFjLElBQUlDLGtCQUFKLENBQVdILEdBQVgsRUFBZ0JDLEtBQWhCLENBQWQ7QUFDSDs7Ozs0QkFFT0csSSxFQUFNO0FBQ1YsVUFBSUMsS0FBSyxHQUFHLEVBQVo7QUFDQUEsTUFBQUEsS0FBSyxDQUFDQyxJQUFOOztBQUNBLFdBQUssSUFBSU4sR0FBVCxJQUFnQkksSUFBaEIsRUFBc0I7QUFDbEJDLFFBQUFBLEtBQUssQ0FBQ0MsSUFBTixpQkFBb0JGLElBQUksQ0FBQ0osR0FBRCxDQUFKLENBQVVPLElBQTlCLHFDQUF5Q0gsSUFBSSxDQUFDSixHQUFELENBQUosQ0FBVVEsS0FBbkQ7QUFDQUgsUUFBQUEsS0FBSyxDQUFDQyxJQUFOO0FBQ0FGLFFBQUFBLElBQUksQ0FBQ0osR0FBRCxDQUFKLENBQVVTLFFBQVYsQ0FBbUJDLEdBQW5CLENBQXVCLFVBQUNDLElBQUQsRUFBVTtBQUM3Qk4sVUFBQUEsS0FBSyxDQUFDQyxJQUFOLGFBQWdCSyxJQUFoQjtBQUNILFNBRkQ7QUFHQU4sUUFBQUEsS0FBSyxDQUFDQyxJQUFOLENBQVcsRUFBWDtBQUNIOztBQUNERCxNQUFBQSxLQUFLLENBQUNLLEdBQU4sQ0FBVSxVQUFDRSxJQUFELEVBQVU7QUFDaEJDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixJQUFaO0FBQ0gsT0FGRDtBQUdILEssQ0FFRDs7OztzQ0FDa0JHLE8sRUFBUztBQUFBOztBQUN2QixhQUFPQSxPQUFPLENBQUNDLE1BQVIsQ0FBZSxVQUFDQyxHQUFELEVBQU1DLE9BQU4sRUFBa0I7QUFDcEMsWUFBSUMsRUFBRSxHQUFHRCxPQUFPLENBQUNkLElBQVIsQ0FBYWdCLElBQWIsQ0FBa0JELEVBQTNCO0FBQ0EsWUFBSUUsT0FBTyxHQUFHSCxPQUFPLENBQUNkLElBQVIsQ0FBYU8sSUFBM0I7O0FBQ0EsWUFBSUgsS0FBSyxHQUFHLEtBQUksQ0FBQ2MsWUFBTCxDQUFrQkQsT0FBbEIsQ0FBWjs7QUFDQSxZQUFJSixHQUFHLENBQUNFLEVBQUQsQ0FBUCxFQUFhO0FBQ1RGLFVBQUFBLEdBQUcsQ0FBQ0UsRUFBRCxDQUFILENBQVFWLFFBQVIsQ0FBaUJILElBQWpCLENBQXNCZSxPQUF0QjtBQUNBSixVQUFBQSxHQUFHLENBQUNFLEVBQUQsQ0FBSCxDQUFRWCxLQUFSLElBQWlCQSxLQUFqQjtBQUNILFNBSEQsTUFHTztBQUNIUyxVQUFBQSxHQUFHLENBQUNFLEVBQUQsQ0FBSCxHQUFVO0FBQ05aLFlBQUFBLElBQUksRUFBRVcsT0FBTyxDQUFDZCxJQUFSLENBQWFnQixJQUFiLENBQWtCYixJQURsQjtBQUVORSxZQUFBQSxRQUFRLEVBQUUsQ0FBQ1ksT0FBRCxDQUZKO0FBR05iLFlBQUFBLEtBQUssRUFBTEE7QUFITSxXQUFWO0FBS0g7O0FBQ0QsZUFBT1MsR0FBUDtBQUNILE9BZk0sRUFlSixFQWZJLENBQVA7QUFnQkg7OztpQ0FFWU0sRyxFQUFLO0FBQ2QsVUFBTUMsU0FBUyxHQUFHLElBQUlDLE1BQUosQ0FBVyxvQkFBWCxFQUFpQyxJQUFqQyxDQUFsQixDQURjLENBQzJDOztBQUN6RCxVQUFNQyxPQUFPLEdBQUdILEdBQUcsQ0FBQ0ksS0FBSixDQUFVSCxTQUFWLENBQWhCO0FBQ0EsYUFBT0UsT0FBTyxDQUFDVixNQUFSLENBQWUsVUFBQ1ksR0FBRCxFQUFNQyxHQUFOO0FBQUEsZUFBY0QsR0FBRyxHQUFHRSxVQUFVLENBQUNELEdBQUQsQ0FBOUI7QUFBQSxPQUFmLEVBQW9ELENBQXBELENBQVA7QUFDSCxLLENBRUQ7Ozs7Ozs7b0RBQ3VCRSxRLEVBQVVDLEs7Ozs7OztBQUN6QkMsZ0JBQUFBLE0sR0FBUyxhLEVBQ1RDLEssR0FBUSxJLEVBQ1JDLE0sR0FBUyxXOzt1QkFDTyxLQUFLakMsTUFBTCxDQUFZa0MsV0FBWixDQUF3QixLQUF4Qix1QkFBNkNMLFFBQTdDLGVBQWlFO0FBQ2pGRSxrQkFBQUEsTUFBTSxFQUFOQSxNQURpRjtBQUVqRkMsa0JBQUFBLEtBQUssRUFBTEEsS0FGaUY7QUFHakZGLGtCQUFBQSxLQUFLLEVBQUxBLEtBSGlGO0FBSWpGRyxrQkFBQUEsTUFBTSxFQUFOQTtBQUppRixpQkFBakUsQzs7O0FBQWhCcEIsZ0JBQUFBLE87QUFNQU4sZ0JBQUFBLFEsR0FBVyxLQUFLNEIsaUJBQUwsQ0FBdUJ0QixPQUF2QixFQUFnQ2lCLEtBQWhDLEM7QUFDZixxQkFBS00sT0FBTCxDQUFhN0IsUUFBYiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUcmVsbG8gZnJvbSAndHJlbGxvJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJlbGxvMm1kIHtcclxuICAgIGNvbnN0cnVjdG9yKGtleSwgdG9rZW4pIHtcclxuICAgICAgICB0aGlzLnRyZWxsbyA9IG5ldyBUcmVsbG8oa2V5LCB0b2tlbik7XHJcbiAgICB9XHJcblxyXG4gICAgY29udmVydChkYXRhKSB7XHJcbiAgICAgICAgbGV0IGxpbmVzID0gW107XHJcbiAgICAgICAgbGluZXMucHVzaChgIyMg5pys5ZGo5bel5L2cYClcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICBsaW5lcy5wdXNoKGAjIyMjIyAke2RhdGFba2V5XS5uYW1lfe+8iOeUqOaXtu+8miR7ZGF0YVtrZXldLmhvdXJzfWjvvIlgKVxyXG4gICAgICAgICAgICBsaW5lcy5wdXNoKGAtIOi/m+W6pu+8mmApXHJcbiAgICAgICAgICAgIGRhdGFba2V5XS5jb21tZW50cy5tYXAoKHRleHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGxpbmVzLnB1c2goYC0gJHt0ZXh0fWApXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsaW5lcy5wdXNoKCcnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBsaW5lcy5tYXAoKGxpbmUpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobGluZSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+iOt+WPluivhOiuuu+8jOagueaNruWNoeeJh+WIhue7hFxyXG4gICAgZ2V0Q29tbWVudHNCeUNhcmQoYWN0aW9ucykge1xyXG4gICAgICAgIHJldHVybiBhY3Rpb25zLnJlZHVjZSgocHJlLCBjdXJyZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IGN1cnJlbnQuZGF0YS5jYXJkLmlkXHJcbiAgICAgICAgICAgIGxldCBjb21tZW50ID0gY3VycmVudC5kYXRhLnRleHRcclxuICAgICAgICAgICAgbGV0IGhvdXJzID0gdGhpcy5nZXRUb3RhbEhvdXIoY29tbWVudClcclxuICAgICAgICAgICAgaWYgKHByZVtpZF0pIHtcclxuICAgICAgICAgICAgICAgIHByZVtpZF0uY29tbWVudHMucHVzaChjb21tZW50KVxyXG4gICAgICAgICAgICAgICAgcHJlW2lkXS5ob3VycyArPSBob3Vyc1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcHJlW2lkXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBjdXJyZW50LmRhdGEuY2FyZC5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnRzOiBbY29tbWVudF0sXHJcbiAgICAgICAgICAgICAgICAgICAgaG91cnNcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcHJlXHJcbiAgICAgICAgfSwge30pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VG90YWxIb3VyKHN0cikge1xyXG4gICAgICAgIGNvbnN0IG1hdGNoSG91ciA9IG5ldyBSZWdFeHAoXCIoPzw9QCkuKj8oPz0oaHxAKSlcIiwgJ2dpJykgLy/ljLnphY1A5byA5aS077yMaOaIlkDnu5PlsL7nmoTlrZfnrKbkuLJcclxuICAgICAgICBjb25zdCBob3VyQXJyID0gc3RyLm1hdGNoKG1hdGNoSG91cilcclxuICAgICAgICByZXR1cm4gaG91ckFyci5yZWR1Y2UoKGFjYywgY3VyKSA9PiBhY2MgKyBwYXJzZUZsb2F0KGN1ciksIDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5p+Q5Liq5oiQ5ZGY55qE5omA5pyJ6K+E6K66XHJcbiAgICBhc3luYyBnZXRNZW1iZXJBY3Rpb25zKG1lbWJlcklkLCBzaW5jZSkge1xyXG4gICAgICAgIGxldCBmaWx0ZXIgPSAnY29tbWVudENhcmQnLFxyXG4gICAgICAgICAgICBsaW1pdCA9IDEwMDAsXHJcbiAgICAgICAgICAgIGZpZWxkcyA9ICdkYXRhLGRhdGUnXHJcbiAgICAgICAgbGV0IGFjdGlvbnMgPSBhd2FpdCB0aGlzLnRyZWxsby5tYWtlUmVxdWVzdCgnZ2V0JywgYC8xL21lbWJlcnMvJHttZW1iZXJJZH0vYWN0aW9uc2AsIHtcclxuICAgICAgICAgICAgZmlsdGVyLFxyXG4gICAgICAgICAgICBsaW1pdCxcclxuICAgICAgICAgICAgc2luY2UsXHJcbiAgICAgICAgICAgIGZpZWxkc1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbGV0IGNvbW1lbnRzID0gdGhpcy5nZXRDb21tZW50c0J5Q2FyZChhY3Rpb25zLCBzaW5jZSk7XHJcbiAgICAgICAgdGhpcy5jb252ZXJ0KGNvbW1lbnRzKTtcclxuICAgIH1cclxufSJdfQ==