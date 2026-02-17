import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRef } from 'react';

type Props = {
  code: string;
  language: 'javascript' | 'python';
  onCodeChange?: (code: string) => void;
};

export default function MonacoEditor({ code, language, onCodeChange }: Props) {
  const webviewRef = useRef<WebView>(null);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    html, body, #container {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background: #001242;
      overflow: hidden;
      zoom:100%;
    }
  </style>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

  <script src="https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs/loader.js"></script>
</head>

<body>
  <div id="container"></div>

  <script>
    let editor;

    require.config({
      paths: {
        vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs'
      }
    });

    require(['vs/editor/editor.main'], function () {
      editor = monaco.editor.create(document.getElementById('container'), {
        value: ${JSON.stringify(code)},
        language: '${language}',
        theme: 'vs-dark',
        fontSize: 16,
        automaticLayout: true,
        minimap: { enabled: false }
        
      });

      editor.onDidChangeModelContent(() => {
        const value = editor.getValue();
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'codeChange',
          value
        }));
      });
    });

    // Escuchar mensajes desde React Native
    window.addEventListener('message', function(event) {
      const message = JSON.parse(event.data);

      if (!editor) return;

      if (message.type === 'setLanguage') {
        monaco.editor.setModelLanguage(editor.getModel(), message.language);
      }

      if (message.type === 'setCode') {
        editor.setValue(message.code);
      }
    });
  </script>
</body>
</html>
`;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webviewRef}
        originWhitelist={['*']}
        source={{ html }}
        javaScriptEnabled
        onMessage={(event) => {
          const data = JSON.parse(event.nativeEvent.data);
          if (data.type === 'codeChange') {
            onCodeChange?.(data.value);
          }
        }}
        style={{ flex: 1, backgroundColor: '#001242' }}
        scalesPageToFit={false}
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        
      />

    </View>
  );
}
