import { Button, View, StyleSheet, Text, Dimensions } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect } from 'react';
import ButtonMenu from '../libs/element';

const { width } = Dimensions.get('window');
const buttonWidth = width * 0.065;  // Ajusta a largura do botão baseado no tamanho da tela
const spaceWidth = width * 0.4;     // Largura maior para a barra de espaço

const Keyboard = ({ ft_bock, ip, port }) => {
    const [isAlt, setIsAlt] = React.useState(false);  // Estado booleano para alternar entre layouts

    useEffect(() => {
        // Muda a orientação para paisagem (horizontal)
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }, []);

    // Função para enviar o botão pressionado
    const ft_click = (btn: string) => {
        fetch(`http://${ip}:${port}/api/keyboard/${btn}`)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err));
    };

    const rows = [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'backspace'],
        ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[ ]', '|'],
        ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"'],
        ['< >', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '{ }', '/', 'enter']
    ];

    const rows2 = [
        ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '=', 'backspace'],
        ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'ç', '\\'],
        ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '\''],
        ['~', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', 'enter']
    ];

    const ft_plus = () => {
        setIsAlt(!isAlt);  // Alterna o estado entre true e false
    };

    const currentLayout = isAlt ? rows2 : rows;  // Escolhe o layout baseado no estado

    return (
        <View style={styles.container}>
            {/* Renderiza cada linha de botões */}
            {currentLayout.map((row, rowIndex) => (
                <View style={styles.row} key={rowIndex}>
                    {row.map((item, index) => (
                        item === 'backspace' ? (
                            <ButtonMenu flexDirection='row' key={index} style={styles.button} width={20} height={20} color={"#ddd"} onPress={() => ft_click(item)} source={require('./images/delete.png')} />
                        ) : item === 'enter' ? (
                            <ButtonMenu flexDirection='row' key={index} style={styles.button} width={25} height={25} color={"#ddd"} onPress={() => ft_click(item)} source={require('./images/enter.png')} />
                        ) : (
                            <ButtonMenu key={index} style={[styles.button, item === 'CapsLock' ? styles.capsLock : null]} onPress={() => ft_click(item)}>
                                <Text style={styles.buttonText}>{item}</Text>
                            </ButtonMenu>
                        )
                    ))}
                </View>
            ))}

            {/* Linha adicional com botões especiais */}
            <View style={styles.row}>
                <ButtonMenu flexDirection='row' style={styles.button} width={27} height={26} color={"#fff"} source={require('./images/super.png')} onPress={() => ft_click('super')} />
                <ButtonMenu style={styles.button} onPress={ft_plus}>
                    <Text style={styles.buttonText}>fn</Text>
                </ButtonMenu>
                <ButtonMenu style={styles.space} onPress={() => ft_click('space')}>
                    <Text style={styles.buttonText}>Space</Text>
                </ButtonMenu>
                <ButtonMenu style={styles.button} onPress={() => ft_click('?')}>
                    <Text style={styles.buttonText}>?</Text>
                </ButtonMenu>
                <ButtonMenu flexDirection='row' style={styles.button} width={27} height={27} color={"#fff"} source={require('./images/home.png')} onPress={() => ft_bock()} />
            </View>

            <ButtonMenu flexDirection='row' style={styles.setting} width={22} height={22} color={"#fff"} source={require('./images/setting.png')} onPress={() => ft_bock()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(40, 40, 40)',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 3,
    },
    button: {
        width: buttonWidth,
        backgroundColor: 'rgb(45, 45, 45)',
        padding: 10,
        borderColor: 'rgb(50, 50, 50)',
        borderWidth: 2,
        margin: 5,
        borderRadius: 2,
        alignItems: 'center',
    },
    setting: {
        position: 'absolute',
        bottom: '10%',
        right: '2%',
    },
    capsLock: {
        width: 100,
    },
    space: {
        width: spaceWidth,
        backgroundColor: 'rgb(45, 45, 45)',
        borderColor: 'rgb(50, 50, 50)',
        borderWidth: 3,
        padding: 10,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#ededed',
    },
});

export default Keyboard;
