import { Text, View, StyleSheet, TouchableOpacity, Modal } from 'react-native';

export const AlertModal = ({ error, onPress }) => {
    return (
            <Modal
            animationType="slide"
            onRequestClose={onPress}
            >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>{error}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>Ok</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            </Modal>
        );
    };

const styles = StyleSheet.create({
            modalOverlay: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            modalContainer: {
                width: 300,
                backgroundColor: '#fff',
                borderRadius: 10,
                padding: 20,
                alignItems: 'center',
            },
            modalTitle: {
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 10,
            },
            modalMessage: {
                fontSize: 16,
                marginBottom: 20,
                textAlign: 'center',
            },
            buttonContainer: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
            },
            button: {
                flex: 1,
                padding: 10,
                margin: 5,
                backgroundColor: '#2196F3',
                borderRadius: 5,
                alignItems: 'center',
            },
            buttonText: {
                color: '#fff',
                fontWeight: 'bold',
            },
    });