import { Text, View, StyleSheet } from "react-native";

export type InformacionPerfilType = {
  apellido: string;
  calle: string;
  ciudad: string;
  codigoPostal: string;
  estado: string;
  fraccionamiento: string;
  id: number;
  nombre: string;
  numero: string;
};

export default function InformacionPerfil({ datos }: { datos: InformacionPerfilType }) {
  return (
    <View style={styles.card}>
      <Text style={styles.nombre}>
        {datos.nombre} {datos.apellido}
      </Text>

      {(datos.calle || datos.fraccionamiento || datos.codigoPostal || datos.ciudad || datos.estado) && (
        <>
          <Text style={styles.label}>Dirección:</Text>
          {datos.calle && <Text style={styles.texto}>{datos.calle}</Text>}
          {datos.fraccionamiento && <Text style={styles.texto}>{datos.fraccionamiento}</Text>}
          {(datos.codigoPostal || datos.ciudad || datos.estado) && (
            <Text style={styles.texto}>
              {[datos.codigoPostal, datos.ciudad, datos.estado].filter(Boolean).join(", ")}
            </Text>
          )}
        </>
      )}

      {datos.numero && (
        <>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.texto}>{datos.numero}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nombre: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    color: "#555",
  },
  texto: {
    fontSize: 14,
    color: "#666",
  },
});
