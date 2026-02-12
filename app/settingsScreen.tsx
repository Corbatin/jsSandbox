import { Text, ScrollView, Pressable, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles/settings.styles";
import { LinearGradient } from 'expo-linear-gradient';
export default function SettingScreen() {

    // Función para evitar repetir lógica de estilos
    const getButtonStyle = ({ pressed, hovered }: any) => [
        styles.buttonContainer,
        (pressed || hovered) && styles.buttonLuminous
    ];

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.title}><Text style={styles.titleText}>Opciones</Text></View>

            <LinearGradient
            // Definimos los colores: Transparente -> Blanco -> Transparente
            colors={['transparent', 'rgba(255, 255, 255, 0.8)', 'transparent']}
            // Lo hacemos horizontal (de izquierda a derecha)
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
                height: 2,
                width: '90%',      // O el ancho que prefieras
                alignSelf: 'center',
                marginVertical: 10,
                borderRadius: 90
            }}
            />


            <ScrollView>
                <Pressable style={getButtonStyle}>
                    <Text style={styles.optionText}>Ejecución</Text>
                </Pressable>

                <Pressable style={getButtonStyle}>
                    <Text style={styles.optionText}>Apariencia</Text>
                </Pressable>

                <Pressable style={getButtonStyle}>
                    <Text style={styles.optionText}>Editor</Text>
                </Pressable>

                <Pressable style={getButtonStyle}>
                    <Text style={styles.optionText}>Documentación</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}