import * as FileSystem from 'expo-file-system/legacy';
import { useState, useEffect } from 'react';
import { Image, Platform, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MonacoEditor from '../src/components/CodeEditor';
import MenuBar from '../src/components/MenuBar/MenuBar';
import Terminal from '../src/components/Terminal';
import { pyScreenStyles } from "./styles/pyScreen.styles";

export default function PyScreen() {

    const WORKSPACE_DIR = FileSystem.documentDirectory + "workspace/";

    const BASE_URL =
        Platform.OS === "web"
            ? "http://localhost:3000"
            : "http://192.168.100.21:3000";

    const [code, setCode] = useState('print("Hola mundo")');
    const [logs, setLogs] = useState<string[]>([]);
    const [fileName, setFileName] = useState("untitled.py");
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

    // 🔹 Cargar archivos
    const loadFiles = async () => {
        try {
            const fileList = await FileSystem.readDirectoryAsync(WORKSPACE_DIR);

            // Solo mostrar archivos .py
            const pyFiles = fileList.filter(file => file.endsWith('.py'));

            setFiles(pyFiles);
        } catch (error) {
            console.log(error);
        }
    };

    // 🔹 Nuevo archivo
    const handleNewFile = async () => {
        const newName = "untitled_" + Date.now() + ".py";
        const fileUri = WORKSPACE_DIR + newName;

        await FileSystem.writeAsStringAsync(fileUri, '');

        setFileName(newName);
        setCode('');
        setLogs([]);
        loadFiles();
    };

    // 🔹 Guardar archivo
    const handleSaveFile = async () => {
        try {
            const fileUri = WORKSPACE_DIR + fileName;

            await FileSystem.writeAsStringAsync(fileUri, code);

            setLogs(p => [...p, "✅ Archivo guardado"]);
            loadFiles();
        } catch (error) {
            setLogs(p => [...p, "❌ Error guardando archivo"]);
        }
    };

    // 🔹 Abrir archivo
    const handleOpenFile = async (name?: string) => {
        try {
            const target = name || fileName;
            const fileUri = WORKSPACE_DIR + target;

            const content = await FileSystem.readAsStringAsync(fileUri);

            setFileName(target);
            setCode(content);
            setLogs(p => [...p, "📂 Archivo cargado"]);
        } catch (error) {
            setLogs(p => [...p, "❌ Error abriendo archivo"]);
        }
    };

    // 🔹 Limpiar terminal
    const handleClearTerminal = () => {
        setLogs([]);
    };

    // 🔹 Ejecutar Python
    const runCode = async () => {
        try {
            setLogs(["⏳ Ejecutando..."]);

            const response = await fetch(`${BASE_URL}/execute`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    language: "python",
                    code,
                }),
            });

            const data = await response.json();

            if (data.output) {
                setLogs([data.output]);
            } else if (data.error) {
                setLogs(["❌ " + data.error]);
            }
        } catch (error) {
            setLogs(["❌ Error conectando al servidor"]);
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

                <View style={{ flex: 1 }}>
                    <MonacoEditor
                        initialCode={code}
                        onCodeChange={setCode}
                    />
                </View>

                <View style={{ height: 140 }}>
                    <Terminal logs={logs} />
                </View>

                <Pressable style={pyScreenStyles.runButton} onPress={runCode}>
                    <Image
                        source={require('../assets/images/run_button.png')}
                        style={pyScreenStyles.img}
                    />
                </Pressable>

            </SafeAreaView>
        </View>
    );
}
