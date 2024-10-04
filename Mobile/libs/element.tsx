import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
const ButtonMenu = ({ children, onPress, style, source, color, width = 0, height = 0, flexDirection = 'column', fontSize = 10 }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[style, {flexDirection}, styles.buttonMenu]}>
            <Image source={source} style={[styles.image, {width, height}, {tintColor: color}]} />
            <Text style={[{fontSize}, {color}]}>{children}</Text>
        </TouchableOpacity>
    );
};

const Textpersona = ({ children, onPress, style, source, color, width = 30, height = 30, flexDirection = 'column', fontSize = 10 }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[style, {flexDirection}, styles.buttonMenu]}>
            <Image source={source} style={[styles.image, {width, height}, {tintColor: color}]} />
            <Text style={[{fontSize}, {color}]}>{children}</Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    buttonMenu: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    image: {
        resizeMode: 'contain'
    }
});

export default ButtonMenu

