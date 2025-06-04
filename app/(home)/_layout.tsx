import { useRoute } from "@react-navigation/native";
import { Link, Stack, Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";

export default function RootLayout() {
  const router = useRoute()
  return <Tabs screenOptions={{headerShown:true}}>
    <Tabs.Screen
    options={{
      title:'Lista de productos',
      headerRight:()=>(
        <Link
          href={'/carrito'}
          asChild
        >
          <TouchableOpacity style={styles.botonCarrito}>
            <Text style={styles.textoBotonCarrito}>Carrito</Text>
          </TouchableOpacity>
        </Link>
      )
    }}
    name="index"/>
    <Tabs.Screen name="notificaciones"/>
    <Tabs.Screen name="pedidos"/>
  </Tabs>
}


const styles = StyleSheet.create({
  botonCarrito:{
    marginRight:16,
    paddingHorizontal:8,
    paddingVertical:4,
    borderRadius:4,
    backgroundColor:'1e88e5'
  },
  textoBotonCarrito:{
    color:'#000',
    fontSize:15,
    fontWeight:'600'
  }
})