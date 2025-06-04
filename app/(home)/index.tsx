import { useStore } from "@/src/store";
import { Button } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
} from "react-native";

type Products={
  id: number,
  nombre: string,
  descripcion: string,
  imagen: string,
  inventario: number,
  precio: string
}

export default function Index() {
  const agregarAlCarrito= useStore(state=>state.agregarAlCarrito)
  const [datos, setDatos] = useState<Products[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const obtenerProductos = async () => {
    try {
      const req = await fetch("http://192.168.0.149:3000/api/products");
      const json = await req.json();
      setDatos(json);
    } catch (error) {
      console.log("Sucedió un error");
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await obtenerProductos();
    setRefreshing(false);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: "#f9f9f9",
        flexGrow: 1,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >


      {datos.length === 0 ? (
        <Text style={{ textAlign: "center", fontSize: 16 }}>
          Cargando productos...
        </Text>
      ) : (
        datos.map((producto) => (
          <Link
            key={producto.id}
            href={{
              pathname: `/(users)/profile`,
              params: { id: producto.id.toString() },
            }}
            asChild
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                borderRadius: 12,
                marginBottom: 16,
                padding: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: `${producto.imagen}` }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 10,
                  marginRight: 16,
                  backgroundColor: "#eee",
                }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>
                  {producto.nombre}
                </Text>
                <Text style={{ fontSize: 14, color: "#777", marginTop: 4 }}>
                  {producto.descripcion}
                </Text>
                <Text style={{ fontSize: 14, color: "#555", marginTop: 4 }}>
                  Inventario: {producto.inventario}
                </Text>
                <Text style={{ fontSize: 16, color: "#1e88e5", marginTop: 6 }}>
                  ${producto.precio}
                </Text>
                <Button
                title="Agregar"
                onPress={()=>{
                  agregarAlCarrito(producto)
                }}
              />
              </View>
            </TouchableOpacity>
          </Link>
        ))
      )}
    </ScrollView>
  );
}
