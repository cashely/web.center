import {Component} from 'react';
import dom from 'react-dom';

import {Route,Router,hashHistory,IndexRedirect,Link} from 'react-router';

import Post from './components/post.jsx';
import Soft from './components/soft.jsx';

class App extends Component {
    render(){
        return (
                <Router history={hashHistory}>
                    <Route path="/" component={Index}>
                        <IndexRedirect to="/post"/>
                        <Route component={Post} path="post"/>
                        <Route component={Soft} path="soft"/>
                    </Route>
                </Router>
        )
    }
}

class Index extends Component {
    render(){
        return (
                <div className="layout">
                    <Left/>
                    {this.props.children}
                </div>
        )
    }
}

class Left extends Component {
    render(){
        return (
            <div className="layout-left">
                <div className="ui middle aligned selection list">
                    <Link to="/post" activeClassName="active" className="item">
                        <i className="code icon"></i>
                        <div className="content">
                          <div className="header">文章管理</div>
                        </div>
                    </Link>
                    <Link to="/soft" activeClassName="active" className="item">
                        <i className="cube icon"></i>
                        <div className="content">
                          <div className="header">下载工具</div>
                        </div>
                    </Link>
                    <Link className="item" activeClassName="active">
                        <i className="attach icon"></i>
                        <div className="content">
                          <div className="header">链接收藏</div>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}




const app = document.getElementById('app');
dom.render(<App/>,app);
