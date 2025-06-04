// app/carrito/index.tsx

import { useStore } from "@/src/store";
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

type Product = {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  inventario: number;
  precio: string; // string porque tu JSON lo define así (ej. "15000")
};

export default function CarritoPage() {
   const carrito= useStore(state=>state.carrito)
  // Ejemplo: un solo producto en el carrito; en producción vendrá de tu estado o contexto
  const productoEnCarrito: Product = {
    id: 2,
    nombre: "Televisión Samsung",
    descripcion: "samsung Television",
    imagen:
      "https://res.cloudinary.com/dgpd2ljyh/image/upload/v1748920792/default_nlbjlp.jpg",
    inventario: 10,
    precio: "15000",
  };

  // Cálculo simple de totales (1 unidad en este ejemplo)
  const cantidadEnCarrito = 1;
  const precioNumber = Number(productoEnCarrito.precio);
  const subtotal = precioNumber * cantidadEnCarrito;
  const ahorros = 0;
  const total = subtotal - ahorros;

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER SIMPLE */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Carrito ({cantidadEnCarrito} artículo
          {cantidadEnCarrito > 1 ? "s" : ""})
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* TARJETA GENÉRICA DEL PRODUCTO */}

        

        <View style={styles.productCard}>
          {/* Imagen del producto */}
          <Image
            source={{ uri: productoEnCarrito.imagen }}
            style={styles.productImage}
          />

          {/* Bloque de texto */}
          <View style={styles.productTextContainer}>
            <Text style={styles.productName}>{productoEnCarrito.nombre}</Text>
            <Text style={styles.productDescription}>
              {productoEnCarrito.descripcion}
            </Text>
            <Text style={styles.productInventory}>
              Inventario: {productoEnCarrito.inventario}
            </Text>
            <Text style={styles.productPrice}>${productoEnCarrito.precio}</Text>

            {/* Acciones básicas */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Eliminar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Guardar</Text>
              </TouchableOpacity>
              <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.qtyButton}>
                  <Text style={styles.qtyButtonText}>–</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{cantidadEnCarrito}</Text>
                <TouchableOpacity style={styles.qtyButton}>
                  <Text style={styles.qtyButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>{/**Aqui Acaba */}

        {/* RESUMEN DE TOTALES SIMPLE */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Subtotal ({cantidadEnCarrito} artículo
              {cantidadEnCarrito > 1 ? "s" : ""})
            </Text>
            <Text style={styles.summaryValue}>${subtotal.toLocaleString()}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Ahorros</Text>
            <Text style={styles.summaryValueSavings}>
              -${ahorros.toLocaleString()}
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryTotalRow]}>
            <Text style={styles.summaryLabelTotal}>Total</Text>
            <Text style={styles.summaryValueTotal}>
              ${total.toLocaleString()}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* BOTÓN “CONTINUAR” GENÉRICO */}
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continuar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Contenedor principal
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  // --- HEADER GENÉRICO ---
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  backButtonText: {
    color: "#333333",
    fontSize: 18,
    fontWeight: "600",
  },
  headerTitle: {
    flex: 1,
    color: "#333333",
    fontSize: 18,
    fontWeight: "600",
  },

  // ScrollView
  scrollContainer: {
    padding: 16,
    paddingBottom: 80, // espacio para el botón
  },

  // --- TARJETA GENÉRICA DEL PRODUCTO ---
  productCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    // Sombra ligera
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 6,
    backgroundColor: "#e0e0e0",
  },
  productTextContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222222",
  },
  productDescription: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
  productInventory: {
    fontSize: 13,
    color: "#888888",
    marginTop: 6,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginTop: 6,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  actionButton: {
    marginRight: 16,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  actionButtonText: {
    fontSize: 13,
    color: "#007AFF",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  qtyButton: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  qtyButtonText: {
    fontSize: 14,
    color: "#333333",
    fontWeight: "600",
  },
  qtyText: {
    marginHorizontal: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },

  // --- RESUMEN DE TOTALES GENÉRICO ---
  summaryContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    // Sombra ligera
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#444444",
  },
  summaryValue: {
    fontSize: 14,
    color: "#222222",
  },
  summaryValueSavings: {
    fontSize: 14,
    color: "#008000", 
  },
  summaryTotalRow: {
    marginTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e0e0e0",
    paddingTop: 8,
  },
  summaryLabelTotal: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222222",
  },
  summaryValueTotal: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },

  // --- BOTÓN “CONTINUAR” GENÉRICO ---
  continueButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
  },
});
