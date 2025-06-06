import {create} from 'zustand'

export const backend = "http://192.168.0.148:3000"

type CartType={
    id: number,
    nombre: string,
    descripcion: string,
    imagen: string,
    inventario: number,
    precio: string
}

interface Store{
    carrito:CartType[],
    total:number
    agregarAlCarrito:(producto:CartType)=>void
}


export const useStore = create<Store>(()=>({
    carrito:[],
    total:0,
    agregarAlCarrito:(producto)=>{
        console.log(producto)
    }
}))