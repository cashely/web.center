import {Component} from 'react';
import {Ajax} from './functions/ajax.js';
export default class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            pId:null,
            list:[],
            single:{
                title:'',
                content:'',
                date:''
            }
        }
    }

    getList(keys){
        return Ajax({
                url:!!keys ? '/post?_k='+keys : '/post',
                method:'GET'
            }).then((result)=>{
                if(result.statu === 1){
                    this.setState({
                        list:result.datas
                    })
                    return result.datas[0]._id;
                }else{
                    alert(result.message);
                }
            })
    }


    search(keys){
        this.getList(keys);
    }

    getSingle(id){
        Ajax({
            url:`/post/${id}`,
            method:'GET'
        }).then((result)=>{
            this.setState({
                pId:id,
                single:result.datas
            })
        }).catch((error)=>{
            alert(error);
        })

    }

    addSingle(obj){
        return Ajax({
                    url:'/post',
                    method:'POST',
                    datas:{
                        title:obj.title,
                        content:obj.content,
                        keyWords:obj.keywords,
                        date:obj.date
                    }
                });
    }

    editSingle(obj){
        return Ajax({
            url:`/post/${this.state.pId}`,
            method:'PUT',
            datas:obj
        })
    }

    clearSingle(){
        this.setState({
            single:{
                title:'',
                content:'',
                date:''
            }
        })
    }

    componentDidMount(){
        this.getList()
        .then((id)=>{
            this.getSingle(id);
        });
    }





    render(){
        return (
            <div className="layout-right">
                <PostList pid={this.state.pId} dataSources={this.state.list} search={this.search.bind(this)} loadSingle={this.getSingle.bind(this)}/>
                <PostContent dataSources={this.state.single} editSingle={this.editSingle.bind(this)} addSingle={this.addSingle.bind(this)} clearSingle={this.clearSingle.bind(this)}/>
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
                        <input className="prompt" ref={input=>this.keys=input} onChange={()=>this.props.search(this.keys.value)} type="text" placeholder="请输入需要搜索的关键词..."/>
                        <i className="search icon"></i>
                    </div>
                    <div className="results"></div>
                </div>
                <div className="ui divided selection list">
                    {this.props.dataSources.map((item)=>{
                        return (<div className={item._id === this.props.pid ? 'item active' : 'item' }>
                            <div className="content" onClick={()=>this.props.loadSingle(item._id)}>
                              <a className="header" dangerouslySetInnerHTML={{__html:item.title.replace(new RegExp(this.keys.value),'<span>'+this.keys.value+'</span>')}}></a>
                              <div className="description">{item.date.substr(0,10)}</div>
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
            rightStatu:'normal'
        }
    }

    changeEdit(){
        this.setState({
            rightStatu:'edit'
        });
    }

    editSingle(obj){
        this.props.editSingle(obj).then(()=>{
            this.setState({
                rightStatu:'normal'
            })
        })
    }

    addSingle(obj){
        this.props.addSingle(obj).then(()=>{
            this.setState({
                rightStatu:'normal'
            })
        })
    }
    addPost(){
        // this.props.clearSingle();
        this.setState({
            rightStatu:'add'
        });
    }

    reBack(){
        this.setState({
            rightStatu:'normal'
        })
    }

    render(){
        let rightBox = (()=>{
            switch(this.state.rightStatu){
                case 'edit' : return <PostEdit editAction={this.editSingle.bind(this)} dataSources={this.props.dataSources}/>;
                case 'add' : return <PostAdd addAction={this.addSingle.bind(this)} dataSources={this.props.dataSources}/>;
                case 'normal' : return <PostArticle dataSources={this.props.dataSources}/>;
            }
        })()

        return (
            <div className="layout-post-content">
                <div className="ui buttons">
                    <button className="ui button primary" onClick={this.addPost.bind(this)}><i className="icon plus"></i>添加文章</button>
                    <button className="ui button green" onClick={this.reBack.bind(this)}><i className="icon unhide"></i>预览</button>
                    <button className="ui button teal" onClick={this.changeEdit.bind(this)}><i className="icon edit"></i>修改</button>
                </div>
                {rightBox}
            </div>
        )
    }
}

class PostEdit extends Component {
    constructor(props){
        super(props);
    }

    editAction(){
        this.props.editAction({
            title:this.title.value,
            date:this.dateInput.value,
            keyWords:this.keyWords.value,
            content:this.editor.getData()
        });
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
                      <input ref={input=>this.title = input} type="text" defaultValue={this.props.dataSources.title} placeholder="First Name"/>
                    </div>
                    <div className="six wide field">
                      <label>关键字</label>
                      <input ref={input=>this.keyWords=input}  type="text" placeholder="First Name"/>
                    </div>
                </div>
                <div className="fields">
                    <div className="wide six field">
                        <label>时间</label>
                        <input defaultValue={this.props.dataSources.date} ref={(input)=>{this.dateInput = input}}/>
                    </div>
                </div>
                <div name="editor1" id="editor1" rows="20" cols="80" dangerouslySetInnerHTML={{__html:this.props.dataSources.content}}></div>
                <div className="ui vertical segment"><button className="ui button pink" onClick={this.editAction.bind(this)}><i className="icon send"></i>发布</button></div>
            </div>
        )
    }
}

class PostAdd extends Component {
    constructor(props){
        super(props);
    }

    addAction(){
        this.props.addAction({
            title:this.title.value,
            date:this.dateInput.value,
            keyWords:this.keyWords.value,
            content:this.editor.getData()
        });
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
                      <input ref={input=>this.title = input} type="text" placeholder="First Name"/>
                    </div>
                    <div className="six wide field">
                      <label>关键字</label>
                      <input ref={input=>this.keyWords=input}  type="text" placeholder="First Name"/>
                    </div>
                </div>
                <div className="fields">
                    <div className="wide six field">
                        <label>时间</label>
                        <input ref={(input)=>{this.dateInput = input}}/>
                    </div>
                </div>
                <div name="editor1" id="editor1" rows="20" cols="80"></div>
                <div className="ui vertical segment"><button className="ui button pink" onClick={this.addAction.bind(this)}><i className="icon send"></i>发布</button></div>
            </div>
        )
    }
}

class PostArticle extends Component {
    render(){
        return (
            <div className="ui vertical segment post-pre" dangerouslySetInnerHTML={{__html:this.props.dataSources.content}}></div>
        )
    }
}
