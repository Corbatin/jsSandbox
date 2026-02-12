import { Platform } from 'react-native';

let Editor: any;

if (Platform.OS === 'web') {
  Editor = require('./MonacoEditor.web').default;
} else {
  Editor = require('./MonacoEditor.native').default;
}

export default Editor;
