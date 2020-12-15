import React, { Component } from "react";
import CKEditor from "ckeditor4-react";
import { Button, Form, Table} from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class BoardWriteForm extends Component {
    state = {
        data: "",
        writer: "",
        coName: "",
        doWhat:"",
        mylevel:"",
        colevel:"",
        bpoint:"",
        mpoint:"",
        gpoint:""
    };

    componentDidMount() {
        if (this.props.location.query !== undefined) {
            this.boardTitle.value = this.props.location.query.title;
        }
    }

    componentWillMount(){
        if (this.props.location.query !== undefined) {
            this.setState({
                data: this.props.location.query.content
            });
        }
    }

    writeBoard = () => {
        let url;
        let send_param;


        const boardTitle = this.boardTitle.value;
        const boardContent = this.state.data;
        const boardWriter = this.state.writer;
        const boardCoName = this.state.coName;
        const boarddoWhat = this.state.doWhat;
        const boardmylevel = this.state.mylevel;
        const boardcolevel = this.state.colevel;
        const boardbpoint = this.state.bpoint;
        const boardmpoint = this.state.mpoint;
        const boardgpoint = this.state.gpoint;

        if (boardTitle === undefined || boardTitle === "") {
            alert("글 제목을 입력해주세요.");
            boardTitle.focus();
            return;
        } else if (boardContent === undefined || boardContent === "") {
            alert("글 내용을 입력해주세요.");
            boardContent.focus();
        }

        if (this.props.location.query !== undefined) {
            url = "http://localhost:8080/board/update";
            send_param = {
                headers,
                "_id" : this.props.location.query._id,
                "title": boardTitle,
                "content": boardContent,
                "writer": boardWriter,
                "coName" : boardCoName,
                "doWhat": boarddoWhat,
                "mylevel": boardmylevel,
                "colevel": boardcolevel,
                "bpoint": boardbpoint,
                "mpoint": boardmpoint,
                "gpoint": boardgpoint
            };
        } else {
            url = "http://localhost:8080/board/write";
            send_param = {
                headers,
                "_id" : $.cookie("login_id"),
                "title": boardTitle,
                "content": boardContent,
                "writer": boardWriter,
                "coName" : boardCoName,
                "doWhat": boarddoWhat,
                "mylevel": boardmylevel,
                "colevel": boardcolevel,
                "bpoint": boardbpoint,
                "mpoint": boardmpoint,
                "gpoint": boardgpoint
            };

        }

        axios
            .post(url, send_param)
            //정상 수행
            .then(returnData => {
                if (returnData.data.message) {
                    alert(returnData.data.message);
                    window.location.href = "/";
                } else {
                    alert("글쓰기 실패");
                }
            })
            //에러
            .catch(err => {
                console.log(err);
            });
    };

    onEditorChange = evt => {
        this.setState({
            data: evt.editor.getData()
        });
    };


    render() {
        const divStyle = {
            margin: 50
        };
        const titleStyle = {
            marginBottom: 5
        };
        const buttonStyle = {
            marginTop: 5
        };
        const newStyle ={
            margin:3
        }

        return (
            <div style={divStyle} className="App">
                <h2>게시글</h2>
                <Form.Control
                    type="text"
                    style={titleStyle}
                    placeholder="글 제목"
                    ref={ref => (this.boardTitle = ref)}
                />
                <Table striped bordered hover>
                    <tr align="center">
                    <div style={newStyle} class="row">
                        <span>
                        <td>
                        <label style={newStyle}>기업 이름 </label>
                        <input type="text" className="text" value={this.state.coName} onChange={(e)=>this.setState({coName:e.target.value})}/>
                        </td>
                        <td colSpan="4">
                        <label style={newStyle}>직급 / 직책 </label>
                        <input type="text" className="text" value={this.state.mylevel} onChange={(e)=>this.setState({mylevel:e.target.value})}/>
                        </td>
                        <td colSpan="4">
                        <label style={newStyle}>담당 업무 </label>
                        <input type="text" className="text" value={this.state.doWhat} onChange={(e)=>this.setState({doWhat:e.target.value})}/>
                        </td>
                        </span>
                    </div>
                    </tr>
                    <tr>
                        <span>
                        <td>
                    <div style={newStyle} className="row">
                        <label style={newStyle}>회사 크기</label>
                    </div>
                    <div style={newStyle} class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"
                               value="대기업" onChange={(e)=>this.setState({colevel:e.target.value})}/>
                        <label className="form-check-label" htmlFor="exampleRadios1">
                            대기업
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2"
                               value="중견기업" onChange={(e) => this.setState({colevel: e.target.value})} />
                        <label className="form-check-label" htmlFor="exampleRadios2">
                            중견기업
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3"
                               value="중소기업" onChange={(e) => this.setState({colevel: e.target.value})} />
                        <label className="form-check-label" htmlFor="exampleRadios2">
                            중소기업
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4"
                               value="강소기업" onChange={(e) => this.setState({colevel: e.target.value})} />
                        <label className="form-check-label" htmlFor="exampleRadios2">
                            강소기업
                        </label>
                    </div>
                        </td>
                        <td>
                            <div style={newStyle} className="row">
                                <label style={newStyle}>복지 점수</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                       id="inlineRadio1" value="1" onChange={(e) => this.setState({bpoint: e.target.value})}/>
                                    <label className="form-check-label" htmlFor="inlineRadio1">1</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                       id="inlineRadio2" value="2" onChange={(e) => this.setState({bpoint: e.target.value})}/>
                                    <label className="form-check-label" htmlFor="inlineRadio2">2</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                       id="inlineRadio3" value="3" onChange={(e) => this.setState({bpoint: e.target.value})}/>
                                    <label className="form-check-label" htmlFor="inlineRadio3">3</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                       id="inlineRadio3" value="4" onChange={(e) => this.setState({bpoint: e.target.value})}/>
                                <label className="form-check-label" htmlFor="inlineRadio4">4</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                       id="inlineRadio3" value="5" onChange={(e) => this.setState({bpoint: e.target.value})}/>
                                <label className="form-check-label" htmlFor="inlineRadio5">5</label>
                            </div>
                        </td>
                        <td>
                            <div style={newStyle} className="row">
                                <label style={newStyle}>문화 점수</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions2"
                                       id="inlineRadio11" value="1" onChange={(e) => this.setState({mpoint: e.target.value})}/>
                                <label className="form-check-label" htmlFor="inlineRadio1">1</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions2"
                                       id="inlineRadio22" value="2" onChange={(e) => this.setState({mpoint: e.target.value})}/>
                                <label className="form-check-label" htmlFor="inlineRadio2">2</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions2"
                                       id="inlineRadio33" value="3" onChange={(e) => this.setState({mpoint: e.target.value})}/>
                                <label className="form-check-label" htmlFor="inlineRadio3">3</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions2"
                                       id="inlineRadio44" value="4" onChange={(e) => this.setState({mpoint: e.target.value})}/>
                                <label className="form-check-label" htmlFor="inlineRadio4">4</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions2"
                                       id="inlineRadio55" value="5" onChange={(e) => this.setState({mpoint: e.target.value})}/>
                                <label className="form-check-label" htmlFor="inlineRadio5">5</label>
                            </div>
                        </td>
                        <td>
                            <div style={newStyle} className="row">
                                <label style={newStyle}>공평 점수</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions3"
                                       id="inlineRadio111" value="1" onChange={(e) => this.setState({gpoint: e.target.value})}/>
                                <label className="form-check-label" htmlFor="inlineRadio1">1</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions3"
                                       id="inlineRadio222" value="2" onChange={(e) => this.setState({gpoint: e.target.value})}/>
                                <label className="form-check-label" htmlFor="inlineRadio2">2</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions3"
                                       id="inlineRadio333" value="3" onChange={(e) => this.setState({gpoint: e.target.value})}/>
                                <label className="form-check-label" htmlFor="inlineRadio3">3</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions3"
                                       id="inlineRadio444" value="4" onChange={(e) => this.setState({gpoint: e.target.value})}/>
                                <label className="form-check-label" htmlFor="inlineRadio4">4</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions3"
                                       id="inlineRadio555" value="5" onChange={(e) => this.setState({gpoint: e.target.value})}/>
                                <label className="form-check-label" htmlFor="inlineRadio5">5</label>
                            </div>
                        </td>
                            </span>
                    </tr>
                    <tr>
                    <div style={newStyle} class="form-group">
                        <label for="exampleFormControlFile1">이력서 첨부</label>
                        <form action='/upload' method='post' encType='multipart/form-data'>
                            <input type='file' name='userfile'/>
                            <input type='submit'/>
                        </form>

                    </div>
                    </tr>
                </Table>
                <CKEditor
                data={this.state.data}
                onChange={this.onEditorChange}
                config={
                    {
                        ckfinder:{
                            uploadUrl:'/uploads'
                        }
                    }
                }
                />

                <Button style={buttonStyle} onClick={this.writeBoard} block>
                    저장하기
                </Button>
            </div>
        );
    }
}

export default BoardWriteForm;
