import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SignupForm from './components/SignupForm'
import SigninForm from './components/SigninForm'
import firebase from 'firebase'
import { firebaseConfig } from './utilities'

export default class App extends React.Component {

  componentDidMount() {
    firebase.initializeApp(firebaseConfig)
  }

  render() {
    return (
      <View style={styles.container}>
        <SignupForm />
        <View style={{marginVertical: 30}} />
        <SigninForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
