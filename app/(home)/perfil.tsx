import { Link } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Perfil() {
  return (
    <View style={styles.container}>

      <Link href={{ pathname: '/(login)/Login' }} asChild>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Iniciar Sesion</Text>
        </TouchableOpacity>
      </Link>

      <Link
        href={{pathname:'/(moviles2)/profile'}}
        asChild
      >
      <TouchableOpacity style={styles.option} >
        <Text style={styles.optionText}>Aplicacion de moviles</Text>
      </TouchableOpacity>
      </Link>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Ayuda</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Ubicaciones</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.option, styles.logout]}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  option: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  logout: {
    backgroundColor: '#ffdddd',
  },
  logoutText: {
    fontSize: 18,
    color: '#d00',
    fontWeight: '600',
  },
});
