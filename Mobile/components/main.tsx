import * as React from 'react';
import { View, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './style';

import HomeScreen from './home';
import DetailsScreen from './details';
import ScannerScreen from './scan';
import Banner from './banner';

// Stack Navigator setup
const Stack = createNativeStackNavigator();

const Main = ({ft_bock, url, port, setUrl, setPort}) => {

  const ft_bock_home = () => {
    ft_bock('Home');
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Banner"
          component={Banner}
          options={({ navigation }) => ({
            headerRight: () => (
              <View style={styles.headerRight}>
                <Button
                  title="Definicoes"
                  style={styles.headerButton}
                  onPress={() => navigation.navigate('Home')}
                />
                <Button
                  title="Home"
                  style={styles.headerButton}
                  onPress={() => ft_bock_home()}
                />
              </View>
            ),
            title: 'Digital Keyboard',
            headerStyle: styles.header,
            headerTintColor: '#fff',
            headerTitleStyle: styles.headerTitle,
          })}
        />


        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Digital Keyboard',
            headerStyle: styles.header,
            headerTintColor: '#fff',
            headerTitleStyle: styles.headerTitle,
          })}
        />


        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: 'Details',
            headerStyle: styles.header,
            headerTintColor: '#fff',
            headerTitleStyle: styles.headerTitle,
          }}
        />

        <Stack.Screen
          name="Scanner"
          component={ScannerScreen}
          options={{
            title: 'Scanner',
            headerStyle: styles.header,
            headerTintColor: '#fff',
            headerTitleStyle: styles.headerTitle,
          }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
