import * as FileSystem from 'expo-file-system/legacy';
import { useState, useEffect } from 'react';
import { Image, Platform, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MonacoEditor from '../src/components/CodeEditor';
import MenuBar from '../src/components/MenuBar/MenuBar';
import Terminal from '../src/components/Terminal';
import { jsScreenStyles } from './styles/jsScreen.styles';

export default function JsScreen() {

  const WORKSPACE_DIR = FileSystem.documentDirectory + 'workspace/';

  const [code, setCode] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [fileName, setFileName] = useState('untitled.js');
  const [files, setFiles] = useState<string[]>([]);

  // 🔹 Inicializar workspace
  useEffect(() => {
    const initWorkspace = async () => {
      const dirInfo = await FileSystem.getInfoAsync(WORKSPACE_DIR);

      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(WORKSPACE_DIR, { intermediates: true });
      }

      loadFiles();
    };

    initWorkspace();
  }, []);

  // 🔹 Cargar archivos existentes
  const loadFiles = async () => {
    try {
      const fileList = await FileSystem.readDirectoryAsync(WORKSPACE_DIR);
      setFiles(fileList);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 Crear nuevo archivo
  const handleNewFile = async () => {
    const newName = 'untitled_' + Date.now() + '.js';
    const fileUri = WORKSPACE_DIR + newName;

    await FileSystem.writeAsStringAsync(fileUri, '');
    setFileName(newName);
    setCode('');
    setLogs([]);
    loadFiles();
  };

  // 🔹 Guardar archivo actual
  const handleSaveFile = async () => {
    try {
      if (!fileName.trim()) return;

      const fileUri = WORKSPACE_DIR + fileName;
      await FileSystem.writeAsStringAsync(fileUri, code);

      setLogs(p => [...p, '✅ Archivo guardado']);
      loadFiles();
    } catch (error) {
      setLogs(p => [...p, '❌ Error guardando archivo']);
    }
  };

  // 🔹 Abrir archivo
  const handleOpenFile = async (name?: string) => {
    try {
      const targetFile = name || fileName;
      const fileUri = WORKSPACE_DIR + targetFile;

      const content = await FileSystem.readAsStringAsync(fileUri);

      setFileName(targetFile);
      setCode(content);
      setLogs(p => [...p, '📂 Archivo cargado']);
    } catch (error) {
      setLogs(p => [...p, '❌ Error abriendo archivo']);
    }
  };

  // 🔹 Limpiar terminal
  const handleClearTerminal = () => {
    setLogs([]);
  };

  // 🔹 Ejecutar código JS
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
  const handleDeleteFile = async (name: string) => {
    try {
      const fileUri = WORKSPACE_DIR + name;

      await FileSystem.deleteAsync(fileUri, { idempotent: true });

      setLogs(p => [...p, "🗑 Archivo eliminado"]);

      // Si borras el archivo actual
      if (name === fileName) {
        setFileName("untitled.js"); // o .py según pantalla
        setCode('');
      }

      loadFiles();
    } catch (error) {
      setLogs(p => [...p, "❌ Error eliminando archivo"]);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000022' }}>
      <SafeAreaView style={{ flex: 1 }}>

        <MenuBar
          fileName={fileName}
          onRename={setFileName}
          onClearTerminal={handleClearTerminal}
          onNewFile={handleNewFile}
          onSaveFile={handleSaveFile}
          onOpenFile={() => handleOpenFile()}
          files={files}
          onSelectFile={handleOpenFile}
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

        {/* Run button */}
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
