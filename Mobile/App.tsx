import * as React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

import Keyboard from './components/keyboard';
import { StatusBar } from 'expo-status-bar';
import ButtonMenu from './libs/element';

const Home = ({ setRoute, ip, port, setIp, setPort }) => {
  const [tempIp, setTempIp] = React.useState(ip);
  const [tempPort, setTempPort] = React.useState(port);

  const finish = () => {
    setIp(tempIp);
    setPort(tempPort);
    setRoute('Keyboard');
  };

  return (
    <View style={styles.centeredView}>

      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ fontSize: 30 }}>Teclado digital</Text>
        <Text style={{ fontSize: 20, color: '#ddd' }}>Helena keyboard</Text>
      </View>

      <TextInput style={styles.input} placeholder="IP Address" onChangeText={setTempIp} />
      <TextInput style={styles.input} placeholder="Port" onChangeText={setTempPort} keyboardType="numeric" />

      <ButtonMenu width={20} height={20} flexDirection='row' fontSize={15} color={'#fff'} onPress={finish} style={styles.buttonSetting} source={require('./components/images/icons.png')}>
       <Text style={{marginLeft: 16}}> Abrir teclado</Text>
      </ButtonMenu>

    </View>
  );
}

const App = () => {
  const [route, setRoute] = React.useState('Home');
  const [ip, setIp] = React.useState('127.0.0.1');
  const [port, setPort] = React.useState(1933);

  useEffect(() => {
    // Muda a orientação para paisagem (horizontal)
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
}, []);

  const Route = () => {
    switch (route) {
      case 'Home':
        return <Home setRoute={setRoute} setIp={setIp} ip={ip} port={port} setPort={setPort} />
      case 'Keyboard':
        return <Keyboard ft_bock={setRoute} ip={ip} port={port} />
      default:
        return <Home setRoute={setRoute} setIp={setIp} ip={ip} port={port} setPort={setPort} />
    }
  }

  return (
    <>
      <Route />
      <StatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 40,
    margin: 10,
    padding: 10,
    borderRadius: 30,
    fontSize: 14,
    backgroundColor: '#ddd',
  },
  buttonSetting: {
    position: 'absolute',
    right: '2%',
    bottom: '7%',
    padding: 10,
    width: 200,
    borderRadius: 30,
    flex: 1,
    fontSize: 14,
    backgroundColor: '#26803b',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
