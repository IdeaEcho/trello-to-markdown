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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cmVsbG8ybWQuanMiXSwibmFtZXMiOlsiVHJlbGxvMm1kIiwia2V5IiwidG9rZW4iLCJ0cmVsbG8iLCJUcmVsbG8iLCJkYXRhIiwibGluZXMiLCJpIiwicHVzaCIsIm5hbWUiLCJob3VycyIsImNvbW1lbnRzIiwibWFwIiwidGV4dCIsImxpbmUiLCJjb25zb2xlIiwibG9nIiwiYWN0aW9ucyIsInJlZHVjZSIsInByZSIsImN1cnJlbnQiLCJpZCIsImNhcmQiLCJjb21tZW50IiwiZ2V0VG90YWxIb3VyIiwic3RyIiwibWF0Y2hIb3VyIiwiUmVnRXhwIiwiaG91ckFyciIsIm1hdGNoIiwiYWNjIiwiY3VyIiwicGFyc2VGbG9hdCIsIm1lbWJlcklkIiwic2luY2UiLCJmaWx0ZXIiLCJsaW1pdCIsImZpZWxkcyIsIm1ha2VSZXF1ZXN0IiwiZ2V0Q29tbWVudHNCeUNhcmQiLCJjb252ZXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQUNxQkEsUzs7O0FBQ2pCLHFCQUFZQyxHQUFaLEVBQWlCQyxLQUFqQixFQUF3QjtBQUFBO0FBQ3BCLFNBQUtDLE1BQUwsR0FBYyxJQUFJQyxrQkFBSixDQUFXSCxHQUFYLEVBQWdCQyxLQUFoQixDQUFkO0FBQ0g7Ozs7NEJBRU9HLEksRUFBTTtBQUNWLFVBQUlDLEtBQUssR0FBRyxFQUFaO0FBQ0EsVUFBSUMsQ0FBQyxHQUFHLENBQVI7QUFDQUQsTUFBQUEsS0FBSyxDQUFDRSxJQUFOOztBQUNBLFdBQUssSUFBSVAsR0FBVCxJQUFnQkksSUFBaEIsRUFBc0I7QUFDbEJDLFFBQUFBLEtBQUssQ0FBQ0UsSUFBTixpQkFBb0IsRUFBRUQsQ0FBdEIsZUFBNEJGLElBQUksQ0FBQ0osR0FBRCxDQUFKLENBQVVRLElBQXRDLHFDQUFpREosSUFBSSxDQUFDSixHQUFELENBQUosQ0FBVVMsS0FBM0Q7QUFDQUosUUFBQUEsS0FBSyxDQUFDRSxJQUFOO0FBQ0FILFFBQUFBLElBQUksQ0FBQ0osR0FBRCxDQUFKLENBQVVVLFFBQVYsQ0FBbUJDLEdBQW5CLENBQXVCLFVBQUNDLElBQUQsRUFBVTtBQUM3QlAsVUFBQUEsS0FBSyxDQUFDRSxJQUFOLGFBQWdCSyxJQUFoQjtBQUNILFNBRkQ7QUFHQVAsUUFBQUEsS0FBSyxDQUFDRSxJQUFOLENBQVcsRUFBWDtBQUNIOztBQUNERixNQUFBQSxLQUFLLENBQUNNLEdBQU4sQ0FBVSxVQUFDRSxJQUFELEVBQVU7QUFDaEJDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixJQUFaO0FBQ0gsT0FGRDtBQUdILEssQ0FFRDs7OztzQ0FDa0JHLE8sRUFBUztBQUFBOztBQUN2QixhQUFPQSxPQUFPLENBQUNDLE1BQVIsQ0FBZSxVQUFDQyxHQUFELEVBQU1DLE9BQU4sRUFBa0I7QUFDcEMsWUFBSUMsRUFBRSxHQUFHRCxPQUFPLENBQUNmLElBQVIsQ0FBYWlCLElBQWIsQ0FBa0JELEVBQTNCO0FBQ0EsWUFBSUUsT0FBTyxHQUFHSCxPQUFPLENBQUNmLElBQVIsQ0FBYVEsSUFBM0I7O0FBQ0EsWUFBSUgsS0FBSyxHQUFHLEtBQUksQ0FBQ2MsWUFBTCxDQUFrQkQsT0FBbEIsQ0FBWjs7QUFDQSxZQUFJSixHQUFHLENBQUNFLEVBQUQsQ0FBUCxFQUFhO0FBQ1RGLFVBQUFBLEdBQUcsQ0FBQ0UsRUFBRCxDQUFILENBQVFWLFFBQVIsQ0FBaUJILElBQWpCLENBQXNCZSxPQUF0QjtBQUNBSixVQUFBQSxHQUFHLENBQUNFLEVBQUQsQ0FBSCxDQUFRWCxLQUFSLElBQWlCQSxLQUFqQjtBQUNILFNBSEQsTUFHTztBQUNIUyxVQUFBQSxHQUFHLENBQUNFLEVBQUQsQ0FBSCxHQUFVO0FBQ05aLFlBQUFBLElBQUksRUFBRVcsT0FBTyxDQUFDZixJQUFSLENBQWFpQixJQUFiLENBQWtCYixJQURsQjtBQUVORSxZQUFBQSxRQUFRLEVBQUUsQ0FBQ1ksT0FBRCxDQUZKO0FBR05iLFlBQUFBLEtBQUssRUFBTEE7QUFITSxXQUFWO0FBS0g7O0FBQ0QsZUFBT1MsR0FBUDtBQUNILE9BZk0sRUFlSixFQWZJLENBQVA7QUFnQkg7OztpQ0FFWU0sRyxFQUFLO0FBQ2QsVUFBTUMsU0FBUyxHQUFHLElBQUlDLE1BQUosQ0FBVyxvQkFBWCxFQUFpQyxJQUFqQyxDQUFsQixDQURjLENBQzJDOztBQUN6RCxVQUFNQyxPQUFPLEdBQUdILEdBQUcsQ0FBQ0ksS0FBSixDQUFVSCxTQUFWLENBQWhCO0FBQ0EsYUFBT0UsT0FBTyxDQUFDVixNQUFSLENBQWUsVUFBQ1ksR0FBRCxFQUFNQyxHQUFOO0FBQUEsZUFBY0QsR0FBRyxHQUFHRSxVQUFVLENBQUNELEdBQUQsQ0FBOUI7QUFBQSxPQUFmLEVBQW9ELENBQXBELENBQVA7QUFDSCxLLENBRUQ7Ozs7Ozs7b0RBQ3VCRSxRLEVBQVVDLEs7Ozs7OztBQUN6QkMsZ0JBQUFBLE0sR0FBUyxhLEVBQ1RDLEssR0FBUSxJLEVBQ1JDLE0sR0FBUyxXOzt1QkFDTyxLQUFLbEMsTUFBTCxDQUFZbUMsV0FBWixDQUF3QixLQUF4Qix1QkFBNkNMLFFBQTdDLGVBQWlFO0FBQ2pGRSxrQkFBQUEsTUFBTSxFQUFOQSxNQURpRjtBQUVqRkMsa0JBQUFBLEtBQUssRUFBTEEsS0FGaUY7QUFHakZGLGtCQUFBQSxLQUFLLEVBQUxBLEtBSGlGO0FBSWpGRyxrQkFBQUEsTUFBTSxFQUFOQTtBQUppRixpQkFBakUsQzs7O0FBQWhCcEIsZ0JBQUFBLE87QUFNQU4sZ0JBQUFBLFEsR0FBVyxLQUFLNEIsaUJBQUwsQ0FBdUJ0QixPQUF2QixFQUFnQ2lCLEtBQWhDLEM7QUFDZixxQkFBS00sT0FBTCxDQUFhN0IsUUFBYiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUcmVsbG8gZnJvbSAndHJlbGxvJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJlbGxvMm1kIHtcclxuICAgIGNvbnN0cnVjdG9yKGtleSwgdG9rZW4pIHtcclxuICAgICAgICB0aGlzLnRyZWxsbyA9IG5ldyBUcmVsbG8oa2V5LCB0b2tlbik7XHJcbiAgICB9XHJcblxyXG4gICAgY29udmVydChkYXRhKSB7XHJcbiAgICAgICAgbGV0IGxpbmVzID0gW107XHJcbiAgICAgICAgbGV0IGkgPSAwXHJcbiAgICAgICAgbGluZXMucHVzaChgIyMg5pys5ZGo5bel5L2cYClcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICBsaW5lcy5wdXNoKGAjIyMjIyAkeysraX0uICR7ZGF0YVtrZXldLm5hbWV977yI55So5pe277yaJHtkYXRhW2tleV0uaG91cnN9aO+8iWApXHJcbiAgICAgICAgICAgIGxpbmVzLnB1c2goYC0g6L+b5bqm77yaYClcclxuICAgICAgICAgICAgZGF0YVtrZXldLmNvbW1lbnRzLm1hcCgodGV4dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGluZXMucHVzaChgLSAke3RleHR9YClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxpbmVzLnB1c2goJycpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxpbmVzLm1hcCgobGluZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhsaW5lKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v6I635Y+W6K+E6K6677yM5qC55o2u5Y2h54mH5YiG57uEXHJcbiAgICBnZXRDb21tZW50c0J5Q2FyZChhY3Rpb25zKSB7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbnMucmVkdWNlKChwcmUsIGN1cnJlbnQpID0+IHtcclxuICAgICAgICAgICAgbGV0IGlkID0gY3VycmVudC5kYXRhLmNhcmQuaWRcclxuICAgICAgICAgICAgbGV0IGNvbW1lbnQgPSBjdXJyZW50LmRhdGEudGV4dFxyXG4gICAgICAgICAgICBsZXQgaG91cnMgPSB0aGlzLmdldFRvdGFsSG91cihjb21tZW50KVxyXG4gICAgICAgICAgICBpZiAocHJlW2lkXSkge1xyXG4gICAgICAgICAgICAgICAgcHJlW2lkXS5jb21tZW50cy5wdXNoKGNvbW1lbnQpXHJcbiAgICAgICAgICAgICAgICBwcmVbaWRdLmhvdXJzICs9IGhvdXJzXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwcmVbaWRdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGN1cnJlbnQuZGF0YS5jYXJkLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudHM6IFtjb21tZW50XSxcclxuICAgICAgICAgICAgICAgICAgICBob3Vyc1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwcmVcclxuICAgICAgICB9LCB7fSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRUb3RhbEhvdXIoc3RyKSB7XHJcbiAgICAgICAgY29uc3QgbWF0Y2hIb3VyID0gbmV3IFJlZ0V4cChcIig/PD1AKS4qPyg/PShofEApKVwiLCAnZ2knKSAvL+WMuemFjUDlvIDlpLTvvIxo5oiWQOe7k+WwvueahOWtl+espuS4slxyXG4gICAgICAgIGNvbnN0IGhvdXJBcnIgPSBzdHIubWF0Y2gobWF0Y2hIb3VyKVxyXG4gICAgICAgIHJldHVybiBob3VyQXJyLnJlZHVjZSgoYWNjLCBjdXIpID0+IGFjYyArIHBhcnNlRmxvYXQoY3VyKSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bmn5DkuKrmiJDlkZjnmoTmiYDmnInor4TorrpcclxuICAgIGFzeW5jIGdldE1lbWJlckFjdGlvbnMobWVtYmVySWQsIHNpbmNlKSB7XHJcbiAgICAgICAgbGV0IGZpbHRlciA9ICdjb21tZW50Q2FyZCcsXHJcbiAgICAgICAgICAgIGxpbWl0ID0gMTAwMCxcclxuICAgICAgICAgICAgZmllbGRzID0gJ2RhdGEsZGF0ZSdcclxuICAgICAgICBsZXQgYWN0aW9ucyA9IGF3YWl0IHRoaXMudHJlbGxvLm1ha2VSZXF1ZXN0KCdnZXQnLCBgLzEvbWVtYmVycy8ke21lbWJlcklkfS9hY3Rpb25zYCwge1xyXG4gICAgICAgICAgICBmaWx0ZXIsXHJcbiAgICAgICAgICAgIGxpbWl0LFxyXG4gICAgICAgICAgICBzaW5jZSxcclxuICAgICAgICAgICAgZmllbGRzXHJcbiAgICAgICAgfSlcclxuICAgICAgICBsZXQgY29tbWVudHMgPSB0aGlzLmdldENvbW1lbnRzQnlDYXJkKGFjdGlvbnMsIHNpbmNlKTtcclxuICAgICAgICB0aGlzLmNvbnZlcnQoY29tbWVudHMpO1xyXG4gICAgfVxyXG59Il19