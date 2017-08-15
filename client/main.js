import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';



import App from '/imports/components/App';
import './main.html';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

Meteor.startup(() => {
  ReactDOM.render((
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  ), document.getElementById('render-target'));
});
const AppBarExampleIcon = () => (
  <AppBar
    title="Title"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
);

