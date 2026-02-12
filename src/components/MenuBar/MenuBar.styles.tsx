import { StyleSheet } from 'react-native';
import { darkTheme } from '../theme/colors';


export const MenuBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: darkTheme.border,
    height: 56,
    paddingHorizontal: 12,
    
  },

  left: {
    justifyContent: 'center',
  },

  topBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarContainer: {
    flexDirection: 'row',
    gap: 5

  },
  topBarImage:{
    width: 25,
    height: 25,
 
  },
  optionButton: {
    justifyContent: 'center',

  },

  menuIcon: {
    width: 35,
    height: 35,

  },

  fileName: {
    fontWeight: 'bold',
    color: 'white',
    alignContent: 'center',
    fontFamily: 'Helvetica'
  },

  menu: {
    position: 'relative',
    width: 250,
    backgroundColor: darkTheme.surface,
    zIndex: 100,
  },

  pressed: {

  },

  menuText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 10
  },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: darkTheme.border,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    color: 'white',
    fontSize: 16, // Opcional: le agregué un poquito de tamaño
    fontWeight: 'bold',
    padding:10,
  },
  input: {
    backgroundColor: '#222',
    color: 'white',
    padding: 10,
    marginTop: 10,
    borderRadius: 6,
  },
  buttonSection:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    gap:60,
  },

  saveText: {
    color: '#ffffff',

 
  },
  cancelText: {
    color: '#ffffff',

  
  },
  button:{
    backgroundColor: '#29282b',
    padding:15,
    marginVertical:10,
    borderRadius:50
  },
});
