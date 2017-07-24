import {Component} from 'react';
import dom from 'react-dom';

import Post from './components/post.jsx';

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
        return <Post/>
    }
}




const app = document.getElementById('app');
dom.render(<App/>,app);
