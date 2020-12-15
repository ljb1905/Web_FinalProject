import React from "react";
import ReactDOM from "react-dom";
import {HashRouter} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
//디자인용 bootstrap 사용
import Header from "./Header";
import Body from "./Body";

ReactDOM.render(
    <HashRouter>
        <Header/>
        <Body/>
    </HashRouter>,
    document.querySelector("#container")
);
