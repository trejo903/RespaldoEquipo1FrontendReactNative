// app/screens/Perfil.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Perfil() {
  // Ejemplo de punto que queremos enviar a la pantalla dinámica
  const miPunto = { latitude: 24.05, longitude: -104.65 };
  const puntoStr = encodeURIComponent(JSON.stringify(miPunto));

  return (
    <View style={styles.container}>
      {/* Enlace a la pantalla de inicio de sesión */}
      <Link href={{ pathname: '/(login)/Login' }} style={styles.option}>
        <Text style={styles.optionText}>Iniciar Sesión</Text>
      </Link>

      {/* Enlace a /profile (subgrupo moviles2) */}
      <Link href={{ pathname: '/(moviles2)/profile' }} style={styles.option}>
        <Text style={styles.optionText}>Aplicación de Móviles</Text>
      </Link>

      {/* Enlace a HomeScreen (estática) */}
      <Link href={{ pathname: '/(screens)/HomeScreen' }} style={styles.option}>
        <Text style={styles.optionText}>Hacia HomeScreen</Text>
      </Link>

      {/* Enlace a la pantalla dinámica [point].tsx, pasándole el parámetro point */}
      <Link
        href={{
          pathname: '/(screens)/[point]',
          params: { point: puntoStr }
        }}
        style={styles.option}
      >
        <Text style={styles.optionText}>Hacia PackageScreen</Text>
      </Link>

      {/* Botón de Cerrar Sesión (sin enlace) */}
      <View style={[styles.option, styles.logout]}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </View>
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
  option: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  logout: {
    backgroundColor: '#ffdddd',
    marginTop: 30,
  },
  logoutText: {
    fontSize: 18,
    color: '#d00',
    fontWeight: '600',
  },
});
