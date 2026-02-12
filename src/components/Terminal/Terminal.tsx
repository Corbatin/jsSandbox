import { View, Text, ScrollView } from 'react-native';
import { terminalStyles } from './Terminal.styles';
import { useEffect, useRef } from 'react';

type TerminalProps = {
  logs: string[];
};

export default function Terminal({ logs }: TerminalProps) {
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [logs]);

  return (
    <View style={terminalStyles.container}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={terminalStyles.content}
      >
        {logs.map((line, i) => (
          <Text key={i} style={terminalStyles.text}>
            {line}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}