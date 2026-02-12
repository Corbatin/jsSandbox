import * as FileSystem from 'expo-file-system/legacy';
import { useState } from 'react';
import { Image, Platform, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MonacoEditor from '../src/components/CodeEditor';
import MenuBar from '../src/components/MenuBar/MenuBar';
import Terminal from '../src/components/Terminal';
import { jsScreenStyles } from './styles/jsScreen.styles';




export default function JsScreen() {
  const [code, setCode] = useState(
    `function test() {\n  console.log("chupalo fernando");\n}\n\ntest();`
  );
  const PROJECTS_DIR = FileSystem.documentDirectory + "projects/";
  const [logs, setLogs] = useState<string[]>([]);
  const [fileName, setFileName] = useState("untitled.js");
  const handleClearTerminal = () => {
    setLogs([]);
  };
  const handleNewFile = () => {
    setCode('');
    setFileName('untitled.js');
    setLogs([]);
  };
  const handleOpenFile = async () => {
    try {
      if (Platform.OS === 'web') {
        const content = localStorage.getItem(fileName);

        if (!content) {
          setLogs(p => [...p, "❌ Archivo no encontrado"]);
          return;
        }

        setCode(content);
        setLogs(p => [...p, "📂 Archivo cargado"]);
        return;
      }

      const PROJECTS_DIR = FileSystem.documentDirectory + "projects/";
      const fileUri = PROJECTS_DIR + fileName;

      const content = await FileSystem.readAsStringAsync(fileUri);

      setCode(content);
      setLogs(p => [...p, "📂 Archivo cargado"]);

    } catch (error) {
      setLogs(p => [...p, "❌ Error abriendo archivo"]);
    }
  };

  const handleSaveFile = async () => {
    try {
      if (Platform.OS === 'web') {
        // 👉 WEB → usar localStorage
        localStorage.setItem(fileName, code);
        setLogs(p => [...p, "✅ Archivo guardado en navegador"]);
        return;
      }

      // 👉 MOBILE
      const PROJECTS_DIR = FileSystem.documentDirectory + "projects/";

      const dirInfo = await FileSystem.getInfoAsync(PROJECTS_DIR);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(PROJECTS_DIR, { intermediates: true });
      }

      const fileUri = PROJECTS_DIR + fileName;
      await FileSystem.writeAsStringAsync(fileUri, code);

      setLogs(p => [...p, "✅ Archivo guardado en dispositivo"]);

    } catch (error: any) {
      setLogs(p => [...p, "❌ Error guardando archivo"]);
      console.error(error);
    }
  };

  const runCode = () => {
    try {
      setLogs([]);
      const fn = new Function('console', code);
      fn({
        log: (...args: any[]) =>
          setLogs(p => [...p, args.join(' ')]),
        error: (...args: any[]) =>
          setLogs(p => [...p, '❌ ' + args.join(' ')])
      });
    } catch (err: any) {
      setLogs(p => [...p, '❌ ' + err.message]);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000022' }}>

      <SafeAreaView style={{ flex: 1 }} >

        <MenuBar
          fileName={fileName}
          onRename={setFileName}
          onClearTerminal={handleClearTerminal}
          onNewFile={handleNewFile}
          onSaveFile={handleSaveFile}
          onOpenFile={handleOpenFile}
        />



        {/* Editor */}
        <View style={{ flex: 1 }}>
          <MonacoEditor
            initialCode={code}
            onCodeChange={setCode}
          />
        </View>

        {/* Terminal */}
        <View style={{ height: 140 }}>
          <Terminal logs={logs} />
        </View>

        <Pressable style={jsScreenStyles.runButton} onPress={runCode}>
          <Image
            source={require('../assets/images/run_button.png')}
            style={jsScreenStyles.img}
          />
        </Pressable>

      </SafeAreaView>
    </View>
  );
}
