import {Component} from 'react';
export default class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            list:[],
            single:{
                title:'',
                content:'',
                date:''
            }
        }
    }

    getList(){
        setTimeout(()=>{
            this.setState({
                list:[{
                    title:'editor.md国产markdown编辑器使用实例',
                    date:'2017-06-06 00:00:00'
                },{
                    title:'editor.md国产markdown编辑器使用实例',
                    date:'2017-06-06 00:00:00'
                },{
                    title:'editor.md国产markdown编辑器使用实例',
                    date:'2017-06-06 00:00:00'
                },{
                    title:'editor.md国产markdown编辑器使用实例',
                    date:'2017-06-06 00:00:00'
                },{
                    title:'editor.md国产markdown编辑器使用实例',
                    date:'2017-06-06 00:00:00'
                }]
            })
        },2000)
    }

    getSingle(id){
        this.setState({
            single:{
                title:'title',
                content:'<p>asdasdasdasd</p>',
                date:'2017-10-10 00:00:00'
            }
        })
    }

    componentDidMount(){
        this.getList();
        this.getSingle();
    }





    render(){
        return (
            <div className="layout-right">
                <PostList dataSources={this.state.list}/>
                <PostContent dataSources={this.state.single}/>
            </div>

        )
    }
}


class PostList extends Component {
    render(){
        return (
            <div className="layout-post-list">
                <div className="ui search">
                    <div className="ui icon input fluid">
                        <input className="prompt" type="text" placeholder="Common passwords..."/>
                        <i className="search icon"></i>
                    </div>
                    <div className="results"></div>
                </div>
                <div className="ui relaxed divided list">
                    {this.props.dataSources.map((item)=>{
                        return (<div className="item">
                            <div className="content">
                              <a className="header"> {item.title}</a>
                              <div className="description">{item.date}</div>
                            </div>
                        </div>)
                    })}
                </div>
            </div>
        )
    }
}

class PostContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            isEdit:!false,
            article:this.props.article
        }
    }

    changeEdit(){
        this.setState({
            isEdit:!this.state.isEdit
        });
    }

    editContent(content){
        console.log(content);
        this.setState({
            article:content,
            isEdit:!this.state.isEdit
        })
    }
    render(){
        return (
            <div className="layout-post-content">
                <div className="ui buttons">
                    <button className="ui button primary"><i className="icon plus"></i>添加文章</button>
                    <button className="ui button green" onClick={this.changeEdit.bind(this)}><i className="icon unhide"></i>预览</button>
                    <button className="ui button teal" onClick={this.changeEdit.bind(this)}><i className="icon edit"></i>修改</button>
                </div>
                {
                    this.state.isEdit ? <PostEdit editContent={this.editContent.bind(this)} dataSources={this.state.article}/> : <PostArticle dataSources={this.state.article}/>
                }
            </div>
        )
    }
}

class PostEdit extends Component {
    getContent(){
        this.props.editContent(this.editor.getData());
    }
    componentDidMount(){
        this.editor = CKEDITOR.replace('editor1');
        $(this.dateInput).datepicker({
            language: 'zh-CN',
            format:'yyyy-mm-dd'
        });
    }
    render(){
        return (
            <div className="ui form tiny post-editor">
                <div className="fields">
                    <div className="ten wide field">
                      <label>标题</label>
                      <input type="text" placeholder="First Name"/>
                    </div>
                    <div className="six wide field">
                      <label>关键字</label>
                      <input type="text" placeholder="First Name"/>
                    </div>
                </div>
                <div className="fields">
                    <div className="wide six field">
                        <label>时间</label>
                        <input ref={(input)=>{this.dateInput = input}}/>
                    </div>
                </div>
                <div name="editor1" id="editor1" rows="20" cols="80" dangerouslySetInnerHTML={{__html:this.props.dataSources}}></div>
                <div className="ui vertical segment"><button className="ui button pink" onClick={this.getContent.bind(this)}><i className="icon send"></i>发布</button></div>
            </div>
        )
    }
}
class PostArticle extends Component {
    render(){
        return (
            <div className="ui vertical segment post-pre" dangerouslySetInnerHTML={{__html:this.props.dataSources}}></div>
        )
    }
}
