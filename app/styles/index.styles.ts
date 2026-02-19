
import { StyleSheet } from 'react-native';
import { darkTheme } from '../../src/components/theme/colors';

export const indexStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkTheme.background,
  },
  img:{
    height:270,
    width:270,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color:'white',
    fontFamily:'Helvetica',
    margin:50,
  },
  buttonSection: {
    gap: 12,
  },
  buttonContainer:{

  },
  button: {
    backgroundColor: '#001242',
    borderRadius:20,
    paddingHorizontal:20,
    paddingVertical:10,
  },
  buttonText: {
    color:'white',
    fontSize: 32,
    fontFamily: 'Helvetica'
  }
});
export default indexStyles;