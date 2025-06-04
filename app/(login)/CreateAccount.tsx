import { Link, useRouter } from "expo-router";
import { Controller, useForm } from 'react-hook-form';
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
export default function Login() {
    const router = useRouter()
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            correo: ''
        }
    });

    const onSubmit = async(data) => {
        const url = "http://192.168.0.149:3000/api/create-account"
        try {
            
            const req = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            })
            const json = await req.json()
            if(json.ok){
                router.replace('/ConfirmToken')
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear cuenta</Text>

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


            <View style={styles.buttonContainer}>
                <Button title="Verificar correo" onPress={handleSubmit(onSubmit)} />
            </View>
            <Link
                href={{ pathname:'/(login)/Login' }}
            >
                Iniciar Sesion
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
