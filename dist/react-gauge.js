'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// http://stackoverflow.com/a/11832950/1337683
function roundTwoDecimals(number) {
  return Math.round(number * 100) / 100;
}

var defaultProps = {
  colors: {
    blue: '#255C69',
    green: '#2A7F40',
    orange: '#AA7139',
    red: '#AA4639'
  },
  width: 500,
  height: 250,
  min: 0,
  max: 100,
  value: 0
};

var ReactGauge = function (_React$Component) {
  _inherits(ReactGauge, _React$Component);

  function ReactGauge(props) {
    _classCallCheck(this, ReactGauge);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactGauge).call(this, props));

    _this.state = {
      width: _this.props.width,
      height: _this.props.height
    };
    window.onresize = _this.resizeGauge.bind(_this);
    return _this;
  }

  _createClass(ReactGauge, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.resizeGauge();
    }
  }, {
    key: 'resizeGauge',
    value: function resizeGauge() {

      var width = this.props.width;
      var height = this.props.height;

      if (window.innerWidth > ReactGauge.defaultProps.width) {
        if (this.state.width < ReactGauge.defaultProps.width) {
          this.setState({
            width: width || ReactGauge.defaultProps.width,
            height: height || ReactGauge.defaultProps.width * .5
          });
        }
      } else {
        this.setState({
          width: width || window.innerWidth,
          height: height || window.innerWidth * .5
        });
      }
    }
  }, {
    key: 'getStyles',
    value: function getStyles() {
      var xLeft = 0;
      var xMiddle = Math.round(this.state.width / 2);
      var xRight = this.state.width;

      var yTop = 0;
      var yMiddle = Math.round(this.state.height / 2);
      var yBottom = this.state.height;

      var percent = this.props.value / this.props.max;
      var degrees = percent * 180;

      // Outer circle
      var outerCircle = {
        r: xMiddle,
        cx: xMiddle,
        cy: yBottom
      };

      // Inner circle
      var innerCircle = {
        r: xMiddle * .8,
        cx: xMiddle,
        cy: yBottom
      };

      // Needle
      var needleCircle = {
        r: Math.round(this.state.width / 10),
        cx: Math.round(this.state.width / 2),
        cy: this.state.height
      };

      var needleWidth = 10;
      var needlePath = {
        d: 'M ' + xMiddle + ' ' + (yBottom - needleWidth) + ' L 0 ' + (yBottom - needleWidth),
        strokeWidth: needleWidth
      };

      var needleStyle = {
        transformOrigin: '100% 50% 0',
        transform: 'rotate(' + degrees + 'deg)',
        OTransition: 'transform 250ms ease-in',
        MozTransition: 'transform 250ms ease-in',
        WebkitTransition: 'transform 250ms ease-in'
      };

      // Text
      var textStyle = {
        text: roundTwoDecimals(percent * 100) + '%',
        x: xMiddle,
        y: yBottom * .6,
        fontSize: this.state.width * .1
      };

      return { outerCircle: outerCircle, innerCircle: innerCircle, needleCircle: needleCircle, needlePath: needlePath, needleStyle: needleStyle, textStyle: textStyle };
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.getStyles();
      var viewBox = "0 0 " + this.state.width + ' ' + this.state.height;
      return _react2.default.createElement(
        'svg',
        { width: this.state.width, viewBox: viewBox, height: this.state.height },
        _react2.default.createElement('circle', { r: styles.outerCircle.r,
          cx: styles.outerCircle.cx,
          cy: styles.outerCircle.cy,
          fill: this.props.colors.blue }),
        _react2.default.createElement('circle', { r: styles.innerCircle.r,
          cx: styles.innerCircle.cx,
          cy: styles.innerCircle.cy,
          fill: 'white' }),
        _react2.default.createElement(
          'text',
          { x: styles.textStyle.x, y: styles.textStyle.y,
            fontSize: styles.textStyle.fontSize,
            fontFamily: 'Arimo',
            textAnchor: 'middle',
            fill: this.props.colors.blue },
          styles.textStyle.text
        ),
        _react2.default.createElement(
          'g',
          { className: 'needle' },
          _react2.default.createElement('circle', { r: styles.needleCircle.r,
            cx: styles.needleCircle.cx,
            cy: styles.needleCircle.cy,
            fill: this.props.colors.red }),
          _react2.default.createElement('path', { style: styles.needleStyle,
            d: styles.needlePath.d,
            stroke: this.props.colors.red,
            strokeWidth: styles.needlePath.strokeWidth })
        )
      );
    }
  }]);

  return ReactGauge;
}(_react2.default.Component);

exports.default = ReactGauge;

ReactGauge.defaultProps = defaultProps;