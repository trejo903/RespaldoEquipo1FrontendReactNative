import InformacionPerfil, { InformacionPerfilType } from "@/components/InformacionPerfil";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function Profile(){
    const{id}=useLocalSearchParams()
    const [datos,setDatos]=useState<InformacionPerfilType>()
    useEffect(()=>{
        const obtenerPerfilPorID=async()=>{
            try {
                const req = await fetch(`https://equipo1backendcorreosdemexico.onrender.com/api/profile/${id}`)
                const json = await req.json()
                setDatos(json)
            } catch (error) {
                console.log("Sucedio un error")
            }
        }
        obtenerPerfilPorID()
    },[])
    console.log(datos)
    if(datos)return(
            <InformacionPerfil datos={datos}/>
    )
}