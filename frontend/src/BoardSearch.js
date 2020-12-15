import React, { Component } from "react";
import {Button, Form, Navbar, Table} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {} from "jquery.cookie";
import HighCharts from './Graph'
import HighCharts2 from './Graph2'
axios.defaults.withCredentials = true;
//다른 두개의 localhost를 동일 접근으로 허용
const headers = { withCredentials: true };

class BoardRow extends React.Component {
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

                <td>
                    <NavLink
                        to={{ pathname: "/board/detail", query: { _id: this.props._id } }}
                    >
                        {this.props.mylevel}
                    </NavLink>
                </td>

                <td>
                    <NavLink
                        to={{ pathname: "/board/detail", query: { _id: this.props._id } }}
                    >
                        {this.props.doWhat}
                    </NavLink>
                </td>

                <td>
                    <NavLink
                        to={{ pathname: "/board/detail", query: { _id: this.props._id } }}
                    >
                        {this.props.bpoint}
                    </NavLink>
                </td>
                <td>
                    <NavLink
                        to={{ pathname: "/board/detail", query: { _id: this.props._id } }}
                    >
                        {this.props.mpoint}
                    </NavLink>
                </td>
                <td>
                    <NavLink
                        to={{ pathname: "/board/detail", query: { _id: this.props._id } }}
                    >
                        {this.props.gpoint}
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
        boardList: [],
        mylevelList: [],
        mylevelcnt: [],
        doWhatList: [],
        doWhatcnt: [],
        bpointsum:0,
        mpointsum:0,
        gpointsum:0,
        pointList: ["복지 점수", "문화 점수", "공평 점수"],
        valList: [],
        cnt:0
    };

    componentDidMount() {
        this.searchBoardList();
    }


    searchBoardList = () => {
        const searchval = this.searchval.value;
        const send_param = {
            headers,
            searchval
        };
        axios
            .post("http://localhost:8080/board/searchBoardList", send_param)
            .then(returnData => {
                let boardList;
                let mylevelList=[];
                let mylevelcnt=[];
                let doWhatList=[];
                let doWhatcnt=[];
                let bpointsum=0;
                let mpointsum=0;
                let gpointsum=0;
                let valList=[];
                let cnt=0;
                if (returnData.data.list.length > 0) {
                    const boards = returnData.data.list;
                    let newboards = boards.slice();
                    const tmp = returnData.data.user;
                    boardList = boards.map(item => (
                        <BoardRow
                            key={Date.now() + Math.random() * 500}
                            _id={item._id}
                            createdAt={item.createdAt}
                            title={item.title}
                            writer = {findwriter(item.writer,tmp)}
                            coName = {item.coName}
                            mylevel = {item.mylevel}
                            doWhat = {item.doWhat}
                            bpoint = {item.bpoint}
                            mpoint = {item.mpoint}
                            gpoint = {item.gpoint}
                        />
                    ));
                    //통계
                    //returnData.data.board[0].writer
                    for (let i=0;i<newboards.length;i++)
                    {
                        mylevelList.push(newboards[i].mylevel);
                        doWhatList.push(newboards[i].doWhat);
                    }
                    let tmpList = [...mylevelList];
                    mylevelList = [...new Set(tmpList)];
                    for(let i=0;i<mylevelList.length;i++)
                    {
                        mylevelcnt.push(tmpList.filter(x=>x===mylevelList[i]).length);
                    }
                    tmpList = [...doWhatList];
                    doWhatList = [...new Set(tmpList)];
                    for(let i=0;i<doWhatList.length;i++)
                    {
                        doWhatcnt.push(tmpList.filter(x=>x===doWhatList[i]).length);
                    }
                    for(let i=0;i<newboards.length;i++)
                    {
                        bpointsum += newboards[i].bpoint;
                        mpointsum += newboards[i].mpoint;
                        gpointsum += newboards[i].gpoint;
                    }
                    bpointsum /= newboards.length;
                    mpointsum /= newboards.length;
                    gpointsum /= newboards.length;
                    cnt = newboards.length;
                    valList.push(bpointsum);
                    valList.push(mpointsum);
                    valList.push(gpointsum);

                    this.setState({
                        boardList: boardList,
                        mylevelList: mylevelList,
                        mylevelcnt: mylevelcnt,
                        doWhatList: doWhatList,
                        doWhatcnt: doWhatcnt,
                        bpointsum: bpointsum,
                        mpointsum: mpointsum,
                        gpointsum: gpointsum,
                        valList: valList,
                        cnt:cnt
                    });
                } else {
                    boardList = (
                        <tr>
                            <td colSpan="9">작성한 게시글이 존재하지 않습니다.</td>
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
                    <Form>
                            <h2>기업 통계 검색</h2>
                            <Form.Group controlId="findForm">
                                <Form.Control
                                    placeholder="기업 입력"
                                    ref={ref=>(this.searchval=ref)}
                                />
                            </Form.Group>
                            <Button style={buttonStyle} onClick={this.searchBoardList} style={{float:'right'}}>
                                검색
                            </Button>
                    </Form>
                    <br/>
                    <br/>
                    <hr/>
                    <h5>{this.state.cnt}개의 검색 결과!</h5>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>글 제목</th>
                            <th>기업 이름</th>
                            <th>작성 날짜</th>
                            <th>작성자</th>
                            <th>직급 / 직책</th>
                            <th>업무</th>
                            <th>복지 점수</th>
                            <th>문화 점수</th>
                            <th>공평 점수</th>
                        </tr>
                        </thead>
                        <tbody>{this.state.boardList}</tbody>
                    </Table>
                    <Navbar className="justify-content-end">
                        <NavLink to="/boardWrite">
                            <Button style={buttonStyle} variant="primary">
                                글쓰기
                            </Button>
                        </NavLink>
                    </Navbar>
                    <hr/>
                    <HighCharts
                        data={this.state.valList}
                        idx={this.state.pointList}
                    />
                    <HighCharts2
                        idx = {this.state.mylevelList}
                        data = {this.state.mylevelcnt}
                        title = "직책 분포"
                    />
                    <HighCharts2
                        idx = {this.state.doWhatList}
                        data = {this.state.doWhatcnt}
                        title = "업무 분포"
                    />
                </div>
            </div>
        );
    }
}

export default BoardForm;
