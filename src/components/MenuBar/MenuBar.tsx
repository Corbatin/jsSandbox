import {
  View, Text, Image, Pressable, Animated, Dimensions, Modal,
  TextInput
} from 'react-native';
import { useRef, useState } from 'react';
import { MenuBarStyles } from './MenuBar.styles';
import { router } from 'expo-router';
import { styles } from '@/app/styles/settings.styles';
import { darkTheme } from '../theme/colors';
const SCREEN_WIDTH = Dimensions.get('window').width;
import * as FileSystem from 'expo-file-system';

type MenuBarProps = {
  onClearTerminal: () => void;
  fileName: string;
  onRename: (newName: string) => void;
  onNewFile: () => void;
  onSaveFile: () => void;
  onOpenFile: () => void;
};

export default function MenuBar({
  onClearTerminal,
  fileName,
  onRename,
  onNewFile,
  onSaveFile,
  onOpenFile
}: MenuBarProps) {

  const [isVisible, setIsVisible] = useState(false);
  const [tempName, setTempName] = useState(fileName);


  const slideX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    Animated.timing(slideX, {
      toValue: open ? -SCREEN_WIDTH : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
    setOpen(!open);
  };

  const handleOpen = () => {
    setTempName(fileName);
    setIsVisible(true);
  };



  const handleConfirm = () => {
    if (!tempName.trim()) return;
    onRename(tempName);
    setIsVisible(false);
  };

  return (
    <>
      {/* 🔝 Barra superior */}
      <View style={MenuBarStyles.container}>
        <View style={MenuBarStyles.left}>
          <Pressable onPress={toggleMenu}>
            <Image
              source={require('../../../assets/images/menu_button.png')}
              style={MenuBarStyles.menuIcon}
            />
          </Pressable>
        </View>

        <View style={MenuBarStyles.topBar}>
          <Pressable
            style={MenuBarStyles.topBarContainer}
            onPress={handleOpen}
          >
            <Text style={MenuBarStyles.fileName}>{fileName}</Text>
            <Image
              source={require('../../../assets/images/rename_button.png')}
              style={MenuBarStyles.topBarImage}
            />
          </Pressable>
        </View>

        <View style={MenuBarStyles.optionButton}>
          <Pressable onPress={() => router.push('/settingsScreen')}>
            <Image
              source={require('../../../assets/images/settings_button.png')}
              style={MenuBarStyles.menuIcon}
            />
          </Pressable>
        </View>
      </View>

      {/* 📂 Menú lateral */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 56,
            left: 0,
            width: 250,
            backgroundColor: darkTheme.border,
            zIndex: 1000,

          },
          { transform: [{ translateX: slideX }] },
        ]}
      >
        <Pressable style={MenuBarStyles.pressed} onPress={() => {
          toggleMenu();
          onNewFile();
        }}>
          <Text style={MenuBarStyles.menuText}>Nuevo Archivo</Text>
        </Pressable>

        <Pressable style={MenuBarStyles.pressed} onPress={() => {
          toggleMenu();
          onOpenFile();
        }}>
          <Text style={MenuBarStyles.menuText}>Abrir Archivo</Text>
        </Pressable>

        <Pressable style={MenuBarStyles.pressed} onPress={() => {
          toggleMenu();
          onSaveFile();
        }} >
          <Text style={MenuBarStyles.menuText}>Guardar Archivo</Text>
        </Pressable>

        <Pressable
          style={MenuBarStyles.pressed}
          onPress={() => {
            toggleMenu();
            onClearTerminal();
          }}
        >
          <Text style={MenuBarStyles.menuText}>Limpiar Terminal</Text>
        </Pressable>
      </Animated.View>

      {/* 🪟 Modal */}
      <Modal visible={isVisible} transparent animationType="fade">
        <View style={MenuBarStyles.overlay}>
          <View style={MenuBarStyles.modalContainer}>
            <Text style={MenuBarStyles.title}>Renombrar archivo</Text>

            <TextInput
              value={tempName}
              onChangeText={setTempName}
              style={MenuBarStyles.input}
              placeholderTextColor="#666" // Tip: añade esto para que el placeholder se vea bien
            />
            <View style={MenuBarStyles.buttonSection}>
              <Pressable onPress={handleConfirm} style={MenuBarStyles.button}>
                <Text style={MenuBarStyles.saveText}>Guardar</Text>
              </Pressable>

              <Pressable onPress={() => setIsVisible(false)} style={MenuBarStyles.button}>
                <Text style={MenuBarStyles.cancelText}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
