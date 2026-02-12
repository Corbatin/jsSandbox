import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import MonacoEditor from '../src/components/CodeEditor/MonacoEditor';

export default function EditorScreen() {
  const { language } = useLocalSearchParams();

  const lang = language === 'python' ? 'python' : 'javascript';

  const [code, setCode] = useState('');

  useEffect(() => {
    if (lang === 'python') {
      setCode('# Python\nprint("Hola mundo")');
    } else {
      setCode('// JS\nconsole.log("Hola mundo");');
    }
  }, [lang]);

  return (
    <View style={{ flex: 1 }}>
      <MonacoEditor
        initialCode={code}
        language={lang}
        onCodeChange={setCode}
      />
    </View>
  );
}
