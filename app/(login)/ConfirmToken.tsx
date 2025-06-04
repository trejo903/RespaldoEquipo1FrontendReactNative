import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Button, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConfirmToken() {
    const router = useRouter();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            token: ''
        }
    });

    const onSubmit = async (data) => {
        const url = "http://192.168.0.149:3000/api/create-account/check-coupon";
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
                    pathname:'/CompleteProfile/[id]',
                    params:{id:json.id.toString()}
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
                <Text style={styles.title}>Confirmar Token</Text>

                <Controller
                    control={control}
                    rules={{ required: 'El token es obligatorio' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, errors.token && styles.inputError]}
                            placeholder="Ingresa tu token"
                            placeholderTextColor="#aaa"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize="none"
                        />
                    )}
                    name="token"
                />
                {errors.token && <Text style={styles.errorText}>{errors.token.message}</Text>}

                <View style={styles.buttonContainer}>
                    <Button title="Verificar Token" color="#4a90e2" onPress={handleSubmit(onSubmit)} />
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
