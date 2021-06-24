import React, { Fragment } from 'react';
import PropTypes from "prop-types"; 

import './JunoContacts.css';

class JunoContacts extends React.PureComponent {

    render() {
        let contactArr = [];
        this.props.contacts.forEach(b => {
            let block = 
            <div className = "ContactsPage__MilkyWrapper" key={b.code}>
                <span>{b.name}: </span>
                <ul>
                    <li>
                        <span>Phone number:</span>
                        <span>{b.phone}</span>
                    </li>    
                    <li>
                        <span>Adress:</span> 
                        <span>{b.adress}</span>
                    </li>    
                    <li>
                        <span>email:</span> 
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