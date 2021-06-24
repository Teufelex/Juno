import React, { Fragment } from 'react';
import PropTypes from "prop-types";

import JunoContacts from '../components/JunoContacts';
import {CONTACTS} from '../AppData';

import './Page_Contacts.css';

class ContactsPage extends React.PureComponent {


    render() {
        return( 
            <div className = "ContactsPage">
                <JunoContacts contacts = {CONTACTS} />
            </div>
        )
    }
}

export default ContactsPage;