import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './style';

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

export default DetailsScreen;