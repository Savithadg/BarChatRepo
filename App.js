import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import InputComponent from "./components/InputComponent";
import AddNewRowComponent from "./components/AddNewRowComponent";
import NewCode from "./components/NewCode";
import ChatExample from "./components/ChatExample";

import { useEffect, useState } from "react";

const datas = [[10, 40, 30, 20, 50, 10]];
var i = 0;

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    changeData();
  }, []);

  const changeData = () => {
    setData(datas[i++]);
    if (i === datas.length) i = 0;
  };

  return (
    <div className="App">
      <ChatExample width={600} height={400} data={data} />
    </div>
  );
}
