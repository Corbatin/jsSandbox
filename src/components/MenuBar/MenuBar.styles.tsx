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
    backgroundColor: darkTheme.border,
    
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

  // 🔹 Drawer principal
  drawerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 260,
    backgroundColor: darkTheme.border,
    zIndex: 1000,
    paddingTop: 15,
  },

  drawerContent: {
    flex: 1,
    justifyContent: 'space-between',
  },

  // 🔹 Sección superior (acciones)
  drawerTopSection: {
    paddingHorizontal: 10,
  },

  // 🔹 Separador
  drawerDivider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 15,
    marginHorizontal: 10,
  },

  // 🔹 Sección inferior (archivos abiertos)
  drawerBottomSection: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },

  drawerSectionTitle: {
    color: '#888',
    fontSize: 12,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  openFileItem: {
    paddingVertical: 6,
  },

  openFileText: {
    color: '#fff',
    fontSize: 14,
  },

  // 🔹 Overlay oscuro
  drawerOverlay: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 999,
  },

});
export default MenuBarStyles;
