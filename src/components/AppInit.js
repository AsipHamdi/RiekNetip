import React, { Component } from 'react';
import firebase from '@firebase/app';
import Main from './Main';
import '@firebase/auth';
import { connect } from 'react-redux'
import { alreadyLogin,notLoginYet } from '../actions'

class AppInit extends Component {

  componentDidMount() {
    // Initialize Firebase

    var config = {
      apiKey: "AIzaSyA0NFYXUB42BBoY8LziWQUaN3Q3AYm4d8Q",
      authDomain: "manager-asip.firebaseapp.com",
      databaseURL: "https://manager-asip.firebaseio.com",
      projectId: "manager-asip",
      storageBucket: "manager-asip.appspot.com",
      messagingSenderId: "535621814518"
    };
    console.log(firebase.apps.length)
    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    } 

    firebase.auth().onAuthStateChanged((user) => {
        if(user) {
            this.props.alreadyLogin(user);
        } else{
            this.props.notLoginYet();
        }
    });
        
  }


  render() {
    return (
          <Main />
    );
  }
}


export default connect(null, { alreadyLogin, notLoginYet })(AppInit)