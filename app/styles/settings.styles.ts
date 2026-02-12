import { Platform, StyleSheet } from 'react-native';
import { darkTheme } from '../../src/components/theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.border
  },

  title:{
    paddingVertical:10,
    alignItems:'center',
  },
  titleText:{
    color:'white',
    fontWeight:'bold',
     fontFamily:'Helvetica',
     fontSize:20
  },
  buttonContainer: {
    padding: 20,


    backgroundColor: darkTheme.border, // Fondo gris muy oscuro
    // Suavizado para Web
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      },
    }),
  },
  // Este es el efecto de luminosidad
  buttonLuminous: {
    backgroundColor: darkTheme.border,
    ...Platform.select({
      web: {
        filter: 'brightness(1.3)',
      },
      // Brillo suave en móviles
      ios: {
        shadowColor: darkTheme.editor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    fontFamily:'Helvetica'
  },
});
