import {create} from 'zustand'

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