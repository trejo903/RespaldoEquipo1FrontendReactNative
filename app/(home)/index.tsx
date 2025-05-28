import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, RefreshControl } from "react-native";

export default function Index() {
  const [datos, setDatos] = useState([]);
  const[refreshing,setRefreshing]=useState(false)
  const obtenerPerfiles = async () => {
    try {
      const req = await fetch("https://equipo1backendcorreosdemexico.onrender.com/api/profile");
      const json = await req.json();
      setDatos(json);
    } catch (error) {
      console.log("Sucedió un error");
    }
  };

  const onRefresh=async()=>{
    setRefreshing(true)
    await obtenerPerfiles()
    setRefreshing(false)
  }

  useEffect(() => {
    obtenerPerfiles();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: "#f5f5f5", flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>
        Lista de Perfiles
      </Text>

      {datos.length === 0 ? (
        <Text style={{ textAlign: "center", fontSize: 16 }}>Cargando perfiles...</Text>
      ) : (
        datos.map((perfil: { id: number; nombre: string; numero: string }, index) => (
          <Link
            key={perfil.id}
            href={{
              pathname: `/(users)/profile`,
              params: { id: perfil.id.toString() },
            }}
            asChild
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#ffffff",
                padding: 16,
                borderRadius: 12,
                marginBottom: 12,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "600", color: "#333" }}>
                {perfil.nombre}
              </Text>
              <Text style={{ fontSize: 14, color: "#666" }}>Número: {perfil.numero}</Text>
            </TouchableOpacity>
          </Link>
        ))
      )}
    </ScrollView>
  );
}
