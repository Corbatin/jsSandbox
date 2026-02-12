import Editor from '@monaco-editor/react';

type Props = {
  initialCode: string;
  onCodeChange?: (code: string) => void;
};

export default function MonacoEditor({ initialCode, onCodeChange }: Props) {
  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      defaultValue={initialCode}
      theme="vs-dark"
      onChange={(value) => onCodeChange?.(value ?? '')}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
      }}
    />
  );
}
