import React, { Component } from "react";
import {Button, Form, Navbar, Table} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
//다른 두개의 localhost를 동일 접근으로 허용
const headers = { withCredentials: true };


class BoardRow extends Component {
    render() {
        return (
            <tr>
                <td>
                    <NavLink
                        to={{ pathname: "/board/detail", query: { _id: this.props._id } }}
                    >
                        {this.props.title}
                    </NavLink>
                </td>
                <td>
                    <NavLink
                        to={{ pathname: "/board/detail", query: { _id: this.props._id } }}
                    >
                        {this.props.coName}
                    </NavLink>
                </td>
                <td>
                    <NavLink
                        to={{ pathname: "/board/detail", query: { _id: this.props._id } }}
                    >
                        {this.props.createdAt.substring(0, 10)}
                    </NavLink>
                </td>

                <td>
                    <NavLink
                        to={{ pathname: "/board/detail", query: { _id: this.props._id } }}
                    >
                        {this.props.writer}
                    </NavLink>
                </td>
            </tr>
        );
    }
}

function findwriter(id,userlist){
    for(let i=0;i<userlist.length;i++)
        if(userlist[i]._id===id)
            return userlist[i].name;
}

class BoardForm extends Component {
    state = {
        boardList: []
    };

    componentDidMount() {
        this.getBoardList();
    }


    getBoardList = () => {
        const send_param = {
            headers
        };
        axios
            .post("http://localhost:8080/board/getBoardList", send_param)
            .then(returnData => {
                let boardList;
                console.log(returnData.data.list.length);
                if (returnData.data.list.length > 0) {
                    const boards = returnData.data.list;
                    const tmp = returnData.data.user;
                    boardList = boards.map(item => (
                        <BoardRow
                            key={Date.now() + Math.random() * 500}
                            _id={item._id}
                            createdAt={item.createdAt}
                            title={item.title}
                            writer = {findwriter(item.writer,tmp)}
                            coName = {item.coName}
                        />
                    ));
                    this.setState({
                        boardList: boardList
                    });
                } else {
                    boardList = (
                        <tr>
                            <td colSpan="4">작성한 게시글이 존재하지 않습니다.</td>
                        </tr>
                    );
                    this.setState({
                        boardList: boardList
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        const divStyle = {
            margin: 50
        };

        const buttonStyle = {
            margin: "0px 5px 0px 10px",
            display: this.state.buttonDisplay
        };

        return (
            <div>
                <div style={divStyle}>
                    <h2>게시판</h2>
                    <Navbar className="justify-content-end">
                        <NavLink to="/boardWrite">
                            <Button style={buttonStyle} variant="primary">
                                글쓰기
                            </Button>
                        </NavLink>
                    </Navbar>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>글 제목</th>
                            <th>기업 이름</th>
                            <th>작성 날짜</th>
                            <th>작성자</th>
                        </tr>
                        </thead>
                        <tbody>{this.state.boardList}</tbody>
                    </Table>


                </div>
            </div>
        );
    }
}

export default BoardForm;
