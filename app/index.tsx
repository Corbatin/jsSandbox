import { router } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
import { indexStyles } from './styles/index.styles';

export default function HomeScreen() {
  return (
    <View style={indexStyles.container}>

      <Image
        source={require('../assets/images/logo_programacion.gif')}
        style={indexStyles.img}
      />

      <Text style={indexStyles.title}>Que quieres programar?

      </Text>

      <View style={indexStyles.buttonSection}>

        <Pressable style={indexStyles.button} onPress={() => router.push({
          pathname: '/jsScreen',
          params: { language: 'javascript' }
        })
        }>
          <Text style={indexStyles.buttonText}>Javascript</Text>
        </Pressable>

        <Pressable style={indexStyles.button} onPress={() => router.push({
          pathname: '/pyScreen',
          params: { language: 'python' }
        })
        }>
          <Text style={indexStyles.buttonText}>Python</Text>
        </Pressable>

      </View>

    </View>
  );
}
