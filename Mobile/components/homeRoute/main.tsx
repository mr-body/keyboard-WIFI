import { View, Text } from 'react-native';
import styles from '../style';

const FirstRoute = ({ navigation }) => {
    return (
        <View style={styles.centeredView}>
            <Text style={styles.homeText}>HOME</Text>
        </View>
    )
};
export default FirstRoute