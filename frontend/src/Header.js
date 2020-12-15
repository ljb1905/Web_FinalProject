import React, { Component } from "react";
import { Navbar, Button, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Header extends Component {
    state = {
        buttonDisplay: "none"
    };

    componentDidMount() {
        if ($.cookie("login_id")) {
            this.setState({
                buttonDisplay: "block"
            });
        } else {
            this.setState({
                buttonDisplay: "none"
            });
        }
    }

    logout = () => {
        axios
            .get("http://localhost:8080/member/logout", {
                headers
            })
            .then(returnData => {
                if (returnData.data.message) {
                    $.removeCookie("login_id");
                    alert("로그아웃 되었습니다!");
                    window.location.href = "/";
                }
            });
    };
    render() {
        const buttonStyle = {
            margin: "0px 5px 0px 10px",
            display: this.state.buttonDisplay
        };

        return (
            <div>
                <Navbar>
                    <Navbar.Brand href="/" style={{fontWeight:'Bold'}}>
                        기업 리뷰 사이트 CR7
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <NavLink to="/">
                            <Button style={buttonStyle} variant="primary">
                                게시판
                            </Button>
                        </NavLink>
                        <NavLink to="/search">
                            <Button style={buttonStyle} variant="primary">
                                통계 보기
                            </Button>
                        </NavLink>
                        <Button style={buttonStyle} onClick={this.logout} variant="primary">
                            로그아웃
                        </Button>
                    </Navbar.Collapse>
                </Navbar>
                <Image src="./img/main.jpg" fluid width='100%'/>
            </div>
        );
    }
}

export default Header;
