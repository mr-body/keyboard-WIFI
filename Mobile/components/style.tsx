import { StyleSheet } from 'react-native';

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
    },
    headerTitle: {
        fontWeight: 'bold',
    },
});

export default styles;