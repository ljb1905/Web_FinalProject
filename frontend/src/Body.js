import React, { Component } from "react";
import Login from "./Login";
import BoardForm from "./BoardForm";
import Write from "./Write";
import BoardMain from "./BoardMain";
import {Route} from "react-router-dom";
import $ from "jquery";
import {} from "jquery.cookie";
import BoardSearch from "./BoardSearch"

class Body extends Component {
  render() {
    let resultForm;
    function getResultForm() {
      // 로그인 체크
      if ($.cookie("login_id")) {
        resultForm = <Route exact path="/" component={BoardForm}/>;
        return resultForm;
      } else {
        resultForm = <Route exact path="/" component={Login}/>;
        return resultForm;
      }
    }
    getResultForm();
    return (
        <div>
          <Route path="/boardWrite" component={Write}/>
          <Route path="/board/detail" component={BoardMain}/>
          <Route path="/search" component={BoardSearch}/>
          {resultForm}
        </div>
    );
  }
}

export default Body;
