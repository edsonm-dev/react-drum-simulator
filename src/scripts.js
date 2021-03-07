var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var buttons = [{ keyName: "Q",
  url: "https://www.fesliyanstudios.com/play-mp3/6711",
  class: "drum-pad", drumName: "Hi-Hat-Open1" }, { keyName: "W",
  url: "https://www.fesliyanstudios.com/play-mp3/6700",
  class: "drum-pad", drumName: "Hi-Hat-Closed" }, { keyName: "E",
  url: "https://www.fesliyanstudios.com/play-mp3/6714",
  class: "drum-pad", drumName: "Hi-Hat-Open2" }, { keyName: "A",
  url: "https://www.fesliyanstudios.com/play-mp3/6659",
  class: "drum-pad", drumName: "Bass-Drum-6" }, { keyName: "S",
  url: "https://www.fesliyanstudios.com/play-mp3/6655",
  class: "drum-pad", drumName: "Bass-Drum-3" }, { keyName: "D",
  url: "https://www.fesliyanstudios.com/play-mp3/6780",
  class: "drum-pad", drumName: "Splash-Cymbal-Short" }, { keyName: "Z",
  url: "https://www.fesliyanstudios.com/play-mp3/6774",
  class: "drum-pad", drumName: "Snare-Drum-6" }, { keyName: "X",
  url: "https://www.fesliyanstudios.com/play-mp3/6768",
  class: "drum-pad", drumName: "Snare-Drum-3" }, { keyName: "C",
  url: "https://www.fesliyanstudios.com/play-mp3/6677",
  class: "drum-pad", drumName: "Drum-Stick" }];

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = { class: "drum-pad",
      sliderVal: 0.3,
      display: "" };

    _this.adjustVolume = _this.adjustVolume.bind(_this);
    _this.setDisplay = _this.setDisplay.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        { id: "displayPad" },
        buttons.map(function (button, i) {
          return React.createElement(Drum, { key: i, id: button.drumName /*button.keyName + "drum"*/,
            btn: button.keyName, url: button.url, vol: _this2.state.sliderVal, show: _this2.setDisplay
          });
        }),
        React.createElement(
          "div",
          { id: "display" },
          React.createElement(
            "h3",
            null,
            this.state.display
          )
        ),
        React.createElement(VolumeControl, { val: this.state.sliderVal, change: this.adjustVolume })
      );
    }
  }, {
    key: "setDisplay",
    value: function setDisplay(e) {
      var _this3 = this;

      this.setState({ display: e });

      setTimeout(function () {
        _this3.setState({ display: "" });
      }, 1000);
    }
  }, {
    key: "adjustVolume",
    value: function adjustVolume(e) {
      //console.log(e.target.value)
      this.setState({ sliderVal: e.target.value });
    }
  }]);

  return App;
}(React.Component);

var Drum = function (_React$Component2) {
  _inherits(Drum, _React$Component2);

  function Drum(props) {
    _classCallCheck(this, Drum);

    var _this4 = _possibleConstructorReturn(this, (Drum.__proto__ || Object.getPrototypeOf(Drum)).call(this, props));

    _this4.state = { class: "drum-pad" };

    _this4.handleKey = _this4.handleKey.bind(_this4);
    _this4.playAudio = _this4.playAudio.bind(_this4);
    _this4.highlight = _this4.highlight.bind(_this4);
    return _this4;
  }

  _createClass(Drum, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { onClick: this.playAudio, className: this.state.class, id: this.props.id },
        React.createElement(
          "h3",
          null,
          this.props.btn
        ),
        React.createElement("audio", { id: this.props.btn,
          src: this.props.url, className: "clip" })
      );
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener("keydown", this.handleKey);
    }
  }, {
    key: "handleKey",
    value: function handleKey(e) {

      if (e.key.toUpperCase() == this.props.btn) {
        this.playAudio();
      }
    }
  }, {
    key: "playAudio",
    value: function playAudio(e) {
      console.log(this.props.btn);
      var pressedButton = document.getElementById(this.props.btn);
      this.props.show(this.props.id);
      pressedButton.currentTime = 0;
      pressedButton.volume = this.props.vol;
      pressedButton.play();
      this.highlight(pressedButton);
    }
  }, {
    key: "highlight",
    value: function highlight() {
      var _this5 = this;

      this.setState({ class: "drum-pad-highlight" });

      setTimeout(function () {

        _this5.setState({ class: "drum-pad" });
      }, 100);
    }
  }]);

  return Drum;
}(React.Component);

var VolumeControl = function (_React$Component3) {
  _inherits(VolumeControl, _React$Component3);

  function VolumeControl() {
    _classCallCheck(this, VolumeControl);

    return _possibleConstructorReturn(this, (VolumeControl.__proto__ || Object.getPrototypeOf(VolumeControl)).apply(this, arguments));
  }

  _createClass(VolumeControl, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "volume" },
        React.createElement("input", { type: "range", min: "0", max: "1", step: "0.01", value: this.props.val, onChange: this.props.change })
      );
    }
  }]);

  return VolumeControl;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("drum-machine"));