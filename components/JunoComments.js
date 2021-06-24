import React, { Fragment } from 'react';
import PropTypes from "prop-types"; 
import {connect} from 'react-redux';

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
    }

    componentDidMount() {
        this.props.dispatch( DataLoad(this.props.dispatch) );
    }

    addComment = () => {
        this.setState({workMode: 2});
    }

    textChanged = (e) => {
        this.setState({areaValue: e.target.value});
    }

    saveComment = () => {
        this.props.dispatch(userComment_add(this.state.areaValue));
        this.setState({workMode: 1});
    }

    cancel = () => {
        this.setState({workMode: 1});
    }

    render() {
        if ( this.props.counters.loadingStat<=1 ) return <div className="lo">загрузка...</div>;
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
                            <textarea value={this.state.areaValue} onChange = {this.textChanged}></textarea>
                            <div>
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