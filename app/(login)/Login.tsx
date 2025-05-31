import { Text, TextInput, View, StyleSheet } from "react-native";
import { Controller, useForm } from 'react-hook-form';
import { Button } from "react-native";
import { Link, useRouter } from "expo-router";

export default function Login() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            correo: '',
            password: ''
        }
    });
    const router = useRouter();
    const onSubmit = async(data) => {
        console.log(data);

        // Aquí puedes agregar la lógica de autenticación
        const url = "http://192.168.1.3:3000/api/login";
        try {
            const req = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const json = await req.json();
            console.log(json);
            if (json.ok) {
                router.replace({
                    pathname:'/'
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>

            <Controller
                control={control}
                rules={{ required: 'El correo es obligatorio' }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Correo"
                        placeholderTextColor="#888"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                )}
                name="correo"
            />
            {errors.correo && <Text style={styles.errorText}>{errors.correo.message}</Text>}

            <Controller
                control={control}
                rules={{ required: 'La contraseña es obligatoria' }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        placeholderTextColor="#888"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry
                    />
                )}
                name="password"
            />
            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

            <View style={styles.buttonContainer}>
                <Button title="INICIAR SESIÓN" onPress={handleSubmit(onSubmit)} />
            </View>
            <Link
                href={{ pathname: '/(login)/CreateAccount' }}
            >
                Crear Cuenta
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f2f2f2',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});
