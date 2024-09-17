import * as React from 'react';
import { View, Text, Button, useWindowDimensions, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

// Component for the first tab (Home)
const FirstRoute = ({ navigation }) => (
  <View style={styles.centeredView}>
    <Text style={styles.homeText}>HOME</Text>
  </View>
);

// Component for the second tab (Notifications)
const SecondRoute = () => (
  <View style={styles.centeredView} />
);

// Component for the third tab (Profile)
const ThirdRoute = () => (
  <View style={styles.centeredView} />
);

const TagRoute = () => (
  <View style={styles.centeredView} />
);

// Tab Navigator setup
const Tab = createMaterialTopTabNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarStyle: styles.tabBar,
        tabBarIconStyle: styles.tabBarIcon,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FirstRoute}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="home" color={color} size={30} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={SecondRoute}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ThirdRoute}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="tag"
        component={TagRoute}
        options={{
          tabBarLabel: 'Tag',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="tag" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Details Screen Component
const DetailsScreen = ({ route, navigation }) => {
  const { valor, nome } = route.params;
  return (
    <View style={styles.centeredView}>
      <Text>Dados</Text>
      <Text>{JSON.stringify(valor)}</Text>
      <Text>{nome}</Text>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Back" onPress={() => navigation.goBack()} />
      <Button title="Go to Home" onPress={() => navigation.popToTop()} />
    </View>
  );
};

const ScannerScreen = ({ route, navigation }) => {
  return (
    <View style={styles.centeredView}>
      <Text>Dados</Text>
    </View>
  );
};

// Stack Navigator setup
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <View style={styles.headerRight}>
                <Button
                  title="Open"
                  onPress={() =>
                    navigation.navigate('Details', {
                      valor: '15',
                      nome: 'Walter Santana',
                    })
                  }
                  style={styles.headerButton}
                />
                <Button
                  title="Scan"
                  style={styles.headerButton}
                  onPress={() =>
                    navigation.navigate('Scanner', {
                      valor: '15',
                      nome: 'Walter Santana',
                    })
                  }
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

// Styles
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  homeText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  tabBar: {
    backgroundColor: '#26803b',
  },
  tabBarLabel: {
    fontSize: 12,
    textTransform: 'capitalize',
    padding: 0,
    color: 'white',
    
  },
  tabBarIcon: {
    alignSelf: 'center',
    marginRight: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    marginRight: 10,
  },
  headerButton: {
    backgroundColor: '#26803b',
  },
  header: {
    backgroundColor: '#39b355',
    boxShadow: 'none',
  },
  headerTitle: {
    fontWeight: 'bold',
  },
});

export default App;
