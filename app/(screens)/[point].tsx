// app/[point].tsx

import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import MapView, { Marker, Polyline, LatLng } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

// Importamos nuestras variables de entorno sin error
import { GOOGLE_MAPS_KEY, BACKEND_URL } from '@env';
import { useLocalSearchParams } from 'expo-router';

export default function PackageScreen() {
  const params = useLocalSearchParams();
  const rawPoint = params.point as string | undefined;
  const point: LatLng | null = rawPoint
    ? JSON.parse(decodeURIComponent(rawPoint))
    : null;

  const mapRef = useRef<MapView>(null);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [heading, setHeading] = useState<number>(0);
  const [routePoints, setRoutePoints] = useState<LatLng[]>([]);
  const [instruction, setInstruction] = useState<string | null>(null);

  useEffect(() => {
    if (!point) return;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permiso de ubicación denegado');
        return;
      }

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 5,
          mayShowUserSettingsDialog: true,
        },
        (location) => {
          const coords: LatLng = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          setUserLocation(coords);
          setHeading(location.coords.heading ?? 0);
          getRoute(coords, point);
        }
      );

      return () => subscription.remove();
    })();
  }, [point]);

  const getRoute = async (origin: LatLng, destination: LatLng) => {
    try {
      // Usamos BACKEND_URL de @env
      const response = await axios.post(`http://192.168.0.148:3000/api/routes`, {
        origin,
        destination,
        // Si necesitas pasar la API key al backend, podrías usar GOOGLE_MAPS_KEY aquí:
        // apiKey: GOOGLE_MAPS_KEY,
      });

      const routeData = response.data.routes[0];
      const polyline = routeData.polyline.encodedPolyline;
      const instructions =
        routeData.legs?.[0]?.steps?.[0]?.navigationInstruction?.instructions;
      if (instructions) {
        setInstruction(instructions);
      }

      const decoded = decodePolyline(polyline);
      setRoutePoints(decoded);

      if (mapRef.current && decoded.length > 0) {
        mapRef.current.fitToCoordinates(decoded, {
          edgePadding: { top: 50, right: 50, bottom: 300, left: 50 },
          animated: true,
        });
      }
    } catch (error) {
      console.error('Error obteniendo la ruta:', error);
    }
  };

  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            ...userLocation,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={false}
        >
          {/* Marcador del usuario con flecha rotada */}
          <Marker
            coordinate={userLocation}
            anchor={{ x: 0.5, y: 0.5 }}
            flat
            rotation={heading}
          >
            <Image
              source={require('../../assets/arrow.png')}
              style={{
                width: 40,
                height: 40,
                transform: [{ rotate: `${heading}deg` }],
              }}
            />
          </Marker>

          {/* Marcador del destino */}
          {point && <Marker coordinate={point} title="Destino" />}

          {/* Polilínea de la ruta */}
          {routePoints.length > 0 && (
            <Polyline
              coordinates={routePoints}
              strokeWidth={5}
              strokeColor="blue"
            />
          )}
        </MapView>
      )}

      {/* Instrucción de navegación */}
      {instruction && (
        <View style={styles.instructionBox}>
          <Text style={styles.instructionText}>{instruction}</Text>
        </View>
      )}
    </View>
  );
}

function decodePolyline(encoded: string): LatLng[] {
  let index = 0,
    lat = 0,
    lng = 0;
  const coordinates: LatLng[] = [];

  while (index < encoded.length) {
    let b,
      shift = 0,
      result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    coordinates.push({
      latitude: lat / 1e5,
      longitude: lng / 1e5,
    });
  }

  return coordinates;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  instructionBox: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  instructionText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
