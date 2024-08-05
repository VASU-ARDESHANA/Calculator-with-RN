import { useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { ThemeContext } from './scr/context/ThemeContext';
import { myColors } from './scr/styles/Colors';
import MyKeyboard from './scr/components/MyKeyboard';

export default function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={theme}>
      <View style={theme === 'light' ? styles.container : [styles.container, { backgroundColor: '#000' }]}>
        <View style={styles.topBar}>
          <Switch
            style={styles.switch}
            value={theme === 'light'}
            onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            thumbColor={theme === 'light' ? myColors.black : myColors.light}
            trackColor={{ true: myColors.red, false: myColors.red }}
          />
        </View>
        <MyKeyboard />
      </View>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: "7%",
  },
  topBar: {

    alignItems: 'center',
  },
  image: {
    width: 35,
    height: 35,
  },
  switch: {
  },
});
