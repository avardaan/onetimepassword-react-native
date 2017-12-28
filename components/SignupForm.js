import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements'
import axios from 'axios'

// base url to hit cloud functions for this particular project
const ROOT_URL = 'https://us-central1-udemy-firebase-otp.cloudfunctions.net'

class SignupForm extends Component {
  /*
  constructor(props) {
    super(props)

    this.state = {
      phone: ''
    }
  }
  */
  // new ES7 syntax, equivalent to code above -> usual constructor drill
  state = { phone: '' }

  // if we set this up as an arrow function instead of vanilla syntax, we don't have to maintain/bind context
  // when we pass it as an event handler
  /* PROMISE THEN/CATCH VERSION
  handleSubmit = () => {
    axios.post(`${ROOT_URL}/createUser`, {
      phone: this.state.phone
    })
      .then(() => {
        axios.post(`${ROOT_URL}/requestOneTimePassword`, {
          phone: this.state.phone
        })
      })
      .catch(err => {
        alert(err)
      })
  }
  */

  // ASYNC/AWAIT VERSION
  handleSubmit = async () => {
    // MAKE NETWORK (HTTP) REQUEST to cloud function!! :O
    // made a post request to createUser and passed it an object with a .phone attribute
    // which is the phone number that the user entered
    try {
      await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone })
      // make a post request to send a code to the phone number
      await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone })
    }
    catch (err) {
      alert(err)
    }
    /*
    adding await keyword doesn't make it synchronous, it just hides all the .then and .catch syntax
    it's just syntactic sugar for proceeding only once the returned promise resolves
    */

  }

  render() {
    return (
      <View>
        <View style={{ marginBottom: 15 }}>
          <FormLabel>
          Enter Phone Number
          </FormLabel>
          <FormInput
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
          />
          <Button
          title="Submit"
          onPress={this.handleSubmit}
          />
        </View>
      </View>
    );
  }
}

export default SignupForm;
