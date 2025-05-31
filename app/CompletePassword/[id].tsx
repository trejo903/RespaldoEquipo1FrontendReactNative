import { useLocalSearchParams, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Button, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CompletePassword() {
    const {id} = useLocalSearchParams()
    const router = useRouter();
    const { control, handleSubmit, formState: { errors },getValues} = useForm({
        defaultValues: {
            password: '',
            confirm_password:''
        }
    });

    const onSubmit = async (data) => {
        const onlyPassword = {
            password:data.password
        }
        console.log(onlyPassword)
        const url = `http://192.168.1.3:3000/api/create-account/complete-password/${id}`
        try {
            const req = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(onlyPassword)
            });
            const json = await req.json();
            console.log(json);
            if (json.ok) {
                router.replace({
                    pathname:'/(login)/Login'
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.inner}>
                <Text style={styles.title}>Completar Password {id}</Text>

                <Controller
                    control={control}
                    rules={{ required: 'El nombre es obligatorio' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, errors.password && styles.inputError]}
                            placeholder="Ingresa tu token"
                            placeholderTextColor="#aaa"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize="none"
                        />
                    )}
                    name="password"
                />
                {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

                <Controller
                    control={control}
                    rules={{ required: 'Confirmar tu contraseña es obligatorio',
                        validate:(value)=> value===getValues('password') || "Las contraseñas no coinciden"
                     }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, errors.confirm_password && styles.inputError]}
                            placeholder="Ingresa tu confirm_password"
                            placeholderTextColor="#aaa"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize="none"
                        />
                    )}
                    name="confirm_password"
                />
                {errors.confirm_password && <Text style={styles.errorText}>{errors.confirm_password.message}</Text>}

                <View style={styles.buttonContainer}>
                    <Button title="Confirmar password" color="#4a90e2" onPress={handleSubmit(onSubmit)} />
                </View>
            </View>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea:
    {
        flex:1,
        backgroundColor:'#fff'
    }
    ,
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: '#f9f9f9',
        fontSize: 16,
        marginBottom: 10,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
});
