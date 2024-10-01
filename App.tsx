import * as React from 'react';
import { View, Text, Button, StatusBar, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native'; // Importar o NavigationContainer
import { useEffect, useState } from 'react';
import waalexan from './function';

interface Clientes {
  id_cliente: string;
  name: string;
  email: string;
  numero: string;
  data: string;
  view: number;
}

const Order = () => {
  const [data, setData] = useState<Clientes[]>([]); // Inicializa como array vazio
  const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento
  const myLib = waalexan();

  const ft_get_clientes = () => {
    setLoading(true); // Atualiza o estado de carregamento
    const fetchData = async () => {
      try {
        const response = await fetch('https://kumbo.onrender.com/local/clientes/');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Atualiza o estado de carregamento
      }
    };
    fetchData(); // Chama a função para buscar dados
  }

  const ft_delete = (id: string) => {
    setLoading(true); // Atualiza o estado de carregamento
    fetch(`https://kumbo.onrender.com/local/clientes/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false); // Atualiza o estado de carregamento
        ft_get_clientes();
      });
  }

  useEffect(() => {
    ft_get_clientes()
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {loading ? (
        <View>
          <ActivityIndicator size="large" color="#7971ea" />
        </View>
      ) : (
        data.length > 0 ? (
          data.map((item, index) => {
            const dateFormatted = myLib.formatDate(item.data);
            const timeFormatted = myLib.extractTime(item.data);
  
            return (
              <View key={index} style={styles.item}>
                {item.view === 0 && <Text style={{ color: 'red' }}>Novo</Text>}
                <Text>{item.name}</Text>
                <Text>{item.email}</Text>
                <Text>{item.numero}</Text>
                {dateFormatted.length > 0 && (
                  <Text>{`${dateFormatted} - ${timeFormatted}`}</Text>
                )}
                <Button title='Apgar' onPress={() => ft_delete(item.id_cliente)} />
              </View>
            );
          })
        ) : (
          <Text>Nenhum dado encontrado.</Text>
        )
      )}
    </ScrollView>
  );  
};
const Notification = () => {
  return (
    <View>
      <Text>Notification</Text>
    </View>
  )
}

const Home = () => {

  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#7971ea" barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>K U M B O O</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Local" color={"#7971ea"} onPress={() => console.log("Local button pressed")} />
          <Button title="New" color={"#7971ea"} />
        </View>
      </View>
      <NavigationContainer> {/* Envolvendo o Home no NavigationContainer */}
        <View style={{ flex: 1 }}>
          <Tab.Navigator>
            <Tab.Screen name="Pedidos" component={Order} />
            <Tab.Screen name="Notificações" component={Notification} />
          </Tab.Navigator>
        </View>
      </NavigationContainer>
    </View>
  );
};

const App = () => {
  const [route, setRoute] = useState('local');

  return (
    <View style={{ flex: 1 }}>
      <Home />
      <View style={styles.nav}>
        <Button title="Local" onPress={() => setRoute('local')} />
        <Button title="API" onPress={() => setRoute('api')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#7971ea', // Add a background color if needed
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10, // Adjust spacing between buttons if needed
  },
  scrollView: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  item: {
    marginBottom: 15,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  nav: {
    position: 'absolute',
    bottom: 0,
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    width: '100%',
    justifyContent: 'space-around',
  },
});

export default App;
