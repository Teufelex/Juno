import React, { Fragment } from 'react';
import PropTypes from "prop-types"; 
import {connect} from 'react-redux';
import { Prompt } from 'react-router';

import {userComment_add} from '../redux/countersAC';
import {DataLoad} from '../redux/fetchThunk';

import './JunoComments.css';

class JunoComments extends React.PureComponent {

    static propTypes = {
        counters: PropTypes.object.isRequired,
    }

    state = {
        workMode: 1, // 1 - read, 2 - add
        areaValue: "",
        isBlocking: false,
    }

    componentDidMount() {
        this.props.dispatch( DataLoad(this.props.dispatch) );
    }

    addComment = () => {
        this.setState({workMode: 2});
    }

    textChanged = (e) => {
        this.setState({areaValue: e.target.value, isBlocking: true});
    }

    saveComment = () => {
        this.props.dispatch(userComment_add(this.state.areaValue));
        this.setState({workMode: 1, areaValue: ""});
    }

    cancel = () => {
        if (this.state.isBlocking) {
            if (confirm("This page has unsaved changes. Are you sure you want to leave?"))
                this.setState({workMode: 1});
        } else {
            this.setState({workMode: 1});
        }
    }

    render() {
        if ( this.props.counters.loadingStat<=1 ) return (
        <div className="loading__wrapper">
            <div className="lds-dual-ring"></div>
        </div>
        );
        if ( this.props.counters.loadingStat===2 ) return "ошибка загрузки данных";

        let commentsArr = [];
        this.props.counters.commentsList.forEach(b => {
            let block = 
            <div className="commentsItem" key={b.code}>
                <img src = {b.photo} alt = "photo" className="commentsItem__photo"/>
                <div className="commentsItem__info">
                    <span className="commentsItem__name">{b.name}</span>
                    <p className="commentsItem__description">{b.text}</p>
                </div>
            </div>;
            commentsArr.push(block);
        });

        return  <div className="Comments">
                    {
                        (this.props.counters.junoUserInit && this.state.workMode === 1) ? 
                        <button 
                        className="Comment__add" 
                        onClick = {this.addComment}
                        >
                            Leave a comment
                        </button> 
                        : ''
                    }
                    {
                        (this.state.workMode === 2) ? 
                        <div>
                            <Prompt
                                when={this.state.isBlocking}
                                message="This page has unsaved changes. Are you sure you want to leave?"
                             />  
                            <textarea value={this.state.areaValue} onChange = {this.textChanged}></textarea>
                            <div className="Comments__buttonWrapper">
                                <button onClick = {this.saveComment}>Send</button>
                                <button onClick = {this.cancel}>Cancel</button>
                            </div>
                        </div>
                        : ''
                    }
                    {commentsArr}
                </div>;
    } 
}

const mapStateToProps = function (state) {
    return {
      counters: state.counters,
    };
};
  
export default connect(mapStateToProps)(JunoComments);