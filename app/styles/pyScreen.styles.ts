import { StyleSheet } from 'react-native';
import { darkTheme } from '../../src/components/theme/colors';

export const pyScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
  },

  editor: {
    flex: 1,
    backgroundColor: darkTheme.editor,
    margin: 0,      // ❌ fuera márgenes negativos
    padding: 0,
  },

  runButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: darkTheme.surface,
    padding: 30,
    borderRadius: 100,
    elevation: 6,
    zIndex: 999,   // 👈 importante
  },

  img: {
    width: 21,
    height: 21,
  },
});
