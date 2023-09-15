// screens/SignupScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Handle signup logic here (e.g., API calls, user creation)
    // You would typically validate user input and navigate accordingly.
  };

  return (
    <View>
      <Text>Signup Screen</Text>
      <TextInput
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignup} />
      <Text onPress={() => navigation.navigate('Login')}>Login</Text>
    </View>
  );
}

export default SignupScreen;
