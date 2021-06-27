import React, { Fragment } from 'react';
import PropTypes from "prop-types"; 

import './JunoContacts.css';

class JunoContacts extends React.PureComponent {

    render() {
        let contactArr = [];
        this.props.contacts.forEach(b => {
            let block = 
            <div className = "ContactsPage__ContactWrapper" key={b.code}>
                <span className="ContactWrapper__title">{b.galaxy} Galaxy: </span>
                <ul className="ContactWrapper__list">
                    <li>
                        <span><b>Phone number: </b></span>
                        <span>{b.phone}</span>
                    </li>    
                    <li>
                        <span><b>Adress: </b></span> 
                        <span>{b.adress}</span>
                    </li>    
                    <li>
                        <span><b>Email: </b></span> 
                        <span>{b.email}</span>
                    </li>    
                </ul> 
            </div>
            contactArr.push(block);
        });

        return contactArr;
    }
}

export default JunoContacts;