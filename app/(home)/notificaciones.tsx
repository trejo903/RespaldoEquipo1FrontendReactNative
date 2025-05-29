import { View, Text, StyleSheet } from 'react-native';

export default function Notificaciones() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificaciones</Text>
      <Text style={styles.message}>
        Por favor inicia sesión para visualizar tus notificaciones
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
});
