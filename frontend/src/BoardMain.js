import React, { Component } from "react";
import {Table, Button, Navbar} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import $ from "jquery";
import {} from "jquery.cookie";
import axios from "axios";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class BoardDetail extends Component {
    state = {
        board: []
    };

    componentDidMount() {
        if (this.props.location.query !== undefined) {
            this.getDetail();
        } else {
            window.location.href = "/";
        }
    }

    deleteBoard = _id => {
        const send_param = {
            headers,
            _id
        };
        if (window.confirm("정말 삭제하시겠습니까?")) {
            axios
                .post("http://localhost:8080/board/delete", send_param)
                //정상 수행
                .then(returnData => {
                    alert("게시글이 삭제 되었습니다.");
                    window.location.href = "/";
                })
                //에러
                .catch(err => {
                    console.log(err);
                    alert("글 삭제 실패");
                });
        }
    };

    getDetail = () => {
        const send_param = {
            headers,
            _id: this.props.location.query._id
        };
        const marginBottom = {
            marginBottom: 5
        };
        const buttonStyle = {
            margin: "0px 5px 0px 10px",
            display: this.state.buttonDisplay
        };
        axios
            .post("http://localhost:8080/board/detail", send_param)
            //본인이 작성한 글 확인
            .then(returnData => {
                if (returnData.data.board[0]) {
                    if(($.cookie("login_id")===returnData.data.board[0].writer)){
                    const board = (
                        <div>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <td colSpan="3" style={{backgroundColor:"antiquewhite"}} align="center">
                                    제목
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="3">
                                        {returnData.data.board[0].title}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="3" style={{backgroundColor:"antiquewhite"}} align="center">
                                    기업명
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="3">
                                        {returnData.data.board[0].coName}
                                    </td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th>직급 / 직책</th>
                                    <th>업무</th>
                                    <th>회사 크기</th>
                                </tr>
                                <tr>
                                    <td>{returnData.data.board[0].mylevel}</td>
                                    <td>{returnData.data.board[0].doWhat}</td>
                                    <td>{returnData.data.board[0].colevel}</td>
                                </tr>
                                <tr>
                                    <th>복지 점수</th>
                                    <th>문화 점수</th>
                                    <th>공평 점수</th>
                                </tr>
                                <tr>
                                    <td>{returnData.data.board[0].bpoint}</td>
                                    <td>{returnData.data.board[0].mpoint}</td>
                                    <td>{returnData.data.board[0].gpoint}</td>
                                </tr>
                                <tr>
                                    <td colSpan="3" style={{backgroundColor:"antiquewhite"}} align="center">
                                    내용
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="3"
                                        dangerouslySetInnerHTML={{
                                            __html: returnData.data.board[0].content
                                        }}
                                    />
                                </tr>
                                </tbody>
                            </Table>
                            <div>
                                <Navbar>
                                    <Navbar.Toggle />
                                    <Navbar.Collapse className="justify-content-end">
                                        <NavLink to={{
                                            pathname: "/boardWrite",
                                            query: {
                                                title: returnData.data.board[0].title,
                                                content: returnData.data.board[0].content,
                                                _id: this.props.location.query._id,
                                                coName : returnData.data.board[0].coName,
                                                doWhat : returnData.data.board[0].doWhat,
                                                mylevel : returnData.data.board[0].mylevel,
                                                colevel : returnData.data.board[0].colevel,
                                                bpoint : returnData.data.board[0].bpoint,
                                                mpoint : returnData.data.board[0].mpoint,
                                                gpoint : returnData.data.board[0].gpoint
                                            }
                                        }}
                                        >
                                            <Button style={buttonStyle} variant="primary">
                                                글 수정
                                            </Button>
                                        </NavLink>
                                        <Button style={buttonStyle} onClick={this.deleteBoard.bind(
                                            null,
                                            this.props.location.query._id
                                        )} variant="primary">
                                            글 삭제
                                        </Button>
                                    </Navbar.Collapse>
                                </Navbar>
                            </div>
                        </div>
                    );
                    this.setState({
                        board: board
                    });
                    } else{ //본인이 아닐때
                        {
                            const board = (
                                <div>
                                    <Table striped bordered hover>
                                        <thead>
                                        <tr>
                                            <td colSpan="3" style={{backgroundColor:"antiquewhite"}} align="center">
                                                제목
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3">
                                                {returnData.data.board[0].title}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" style={{backgroundColor:"antiquewhite"}} align="center">
                                                기업명
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3">
                                                {returnData.data.board[0].coName}
                                            </td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <th>직급 / 직책</th>
                                            <th>업무</th>
                                            <th>회사 크기</th>
                                        </tr>
                                        <tr>
                                            <td>{returnData.data.board[0].mylevel}</td>
                                            <td>{returnData.data.board[0].doWhat}</td>
                                            <td>{returnData.data.board[0].colevel}</td>
                                        </tr>
                                        <tr>
                                            <th>복지 점수</th>
                                            <th>문화 점수</th>
                                            <th>공평 점수</th>
                                        </tr>
                                        <tr>
                                            <td>{returnData.data.board[0].bpoint}</td>
                                            <td>{returnData.data.board[0].mpoint}</td>
                                            <td>{returnData.data.board[0].gpoint}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" style={{backgroundColor:"antiquewhite"}} align="center">
                                                내용
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3"
                                                dangerouslySetInnerHTML={{
                                                    __html: returnData.data.board[0].content
                                                }}
                                            />
                                        </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            );
                            this.setState({
                                board: board
                            });
                        }
                    }
                } else {
                    alert("글 상세 조회 실패");
                }
            })
            //에러
            .catch(err => {
                console.log(err);
            });
    };

    //onClick={this.getBoard.bind(null,this.props._id)}
    render() {
        const divStyle = {
            margin: 50
        };
        return <div style={divStyle}>{this.state.board}</div>;
    }
}

export default BoardDetail;
