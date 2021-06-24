import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Page_Main from './Page_Main';
import Page_About from './Page_About';
import Page_Tours from './Page_Tours';
import Page_Rewiews from './Page_Rewiews';
import Page_Contacts from './Page_Contacts';
import Page_News from './Page_News';
import Page_Cabinet from './Page_Cabinet';

class PagesRouter extends React.Component {
          
  render() {

    return (
      <div>
        <Route path="/" exact component={Page_Main} />
        <Route path="/about" component={Page_About} />
        <Route path="/tours/:trpg" component={Page_Tours} />
        <Route path="/reviews" component={Page_Rewiews} />
        <Route path="/contacts" component={Page_Contacts} />
        <Route path="/news" component={Page_News} />
        <Route path="/cabinet" component={Page_Cabinet} />
      </div>
    );
    
  }

}
    
export default PagesRouter;
    