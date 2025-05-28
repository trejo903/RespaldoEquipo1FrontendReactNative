import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return <Tabs screenOptions={{headerShown:true}}>
    <Tabs.Screen name="index"/>
    <Tabs.Screen name="notificaciones"/>
    <Tabs.Screen name="pedidos"/>
  </Tabs>
}
