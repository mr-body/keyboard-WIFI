import * as React from 'react';
import { View, Text, Button} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const Banner = ({ navigation }) => {
  return (
    <View>
      <Text>teste</Text>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};
export default Banner;