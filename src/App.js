import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  var [funcShow, setFuncShow] = useState(true);
  var [classShow, setClassShow] = useState(true);
  useEffect(function () {});
  return (
    <div className="container">
      <h2>Hello World</h2>
      <input
        type="button"
        value="remove func"
        onClick={function () {
          setFuncShow(false);
        }}
      ></input>
      <input
        type="button"
        value="remove class"
        onClick={function () {
          setClassShow(false);
        }}
      ></input>
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  );
}

var funStyle = "color:blue";
var funcId = 0;
function FuncComp(props) {
  var numberState = useState(props.initNumber);
  var number = numberState[0];
  var setNumber = numberState[1];
  var [test, setTest] = useState(props.initNumber);
  var [date, setDate] = useState(new Date().toString());

  // side effect : 여러개 설치 가능
  useEffect(
    function () {
      console.log(
        "%cfunc => useEffect number (componentDidMount & componentDidUpdate) " +
          ++funcId,
        funStyle
      );
      document.title = test;
    },
    [test]
  );

  useEffect(function () {
    console.log(
      "%cfunc => useEffect number (componentDidMount) " + ++funcId,
      funStyle
    );
    document.title = test;
    return function () {
      console.log(
        "%cfunc => useEffect number (componentWillUnMount) " + ++funcId,
        funStyle
      );
    };
  }, []);

  console.log("%cfunc => render " + ++funcId, funStyle);

  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {test}</p>
      <p>Date : {date}</p>
      <input
        type="button"
        value="random"
        onClick={function () {
          setTest(Math.random());
        }}
      ></input>
      <input
        type="button"
        value="date"
        onClick={function () {
          setDate(new Date().toString());
        }}
      ></input>
    </div>
  );
}

var classStyle = "color:red";
class ClassComp extends React.Component {
  state = {
    number: this.props.initNumber,
    date: new Date().toString(),
  };
  componentWillMount() {
    console.log("%cclass => componentWillMount", classStyle);
  }
  componentDidMount() {
    console.log("%cclass => componentDidMount", classStyle);
  }
  componentDidUpdate() {
    console.log("%cclass => componentDidUpdate", classStyle);
  }
  render() {
    console.log("%cclass => render", classStyle);
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>
        <input
          type="button"
          value="random"
          onClick={function () {
            this.setState({ number: Math.random() });
          }.bind(this)}
        ></input>
        <input
          type="button"
          value="date"
          onClick={function () {
            this.setState({ date: new Date().toString() });
          }.bind(this)}
        ></input>
      </div>
    );
  }
}

export default App;
