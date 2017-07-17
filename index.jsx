import {Component} from 'react';
import dom from 'react-dom';



class App extends Component {
    render(){
        return (
                <div className="layout">
                    <Left/>
                    <Right/>
                </div>
        )
    }
}

class Left extends Component {
    render(){
        return (
            <div className="layout-left">
                <div className="ui middle aligned animated list">
                    <div className="item padding">
                        <i className="map marker icon"></i>
                        <div className="content">
                          <div className="header">文章管理</div>
                        </div>
                    </div>
                    <div className="item">
                        <i className="map marker icon"></i>
                        <div className="content">
                          <div className="header">下载工具</div>
                        </div>
                    </div>
                    <div className="item">
                        <i className="map marker icon"></i>
                        <div className="content">
                          <div className="header">链接收藏</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


class Right extends Component {
    render(){
        return (
            <div className="layout-right">
                <div className="ui secondary  menu">
                    <a className="item">
                        Home
                    </a>
                    <a className="item">
                        Messages
                    </a>
                    <a className="item active">
                        Friends
                    </a>
                    <div className="right menu">
                        <div className="item">
                          <div className="ui icon input">
                            <input placeholder="Search..." type="text"/>
                            <i className="search link icon"></i>
                          </div>
                        </div>
                        <a className="ui item">
                          Logout
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

const app = document.getElementById('app');
dom.render(<App/>,app);
