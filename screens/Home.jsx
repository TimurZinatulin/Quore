import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

export const Home = ({ navigation }) => {
  const [appIsReady, setAppIsReady] = useState(false);

  const [isPress, setIsPress] = useState(false);

  const touchProps = {
    activeOpacity: 1,
    underlayColor: 'grey', // <-- "backgroundColor" will be always overwritten by "underlayColor"
    style: isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => {}, // <-- "onPress" is apparently required
  };

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          'roboto-regular': require('../assets/fonts/Roboto-Regular.ttf'),
          'roboto-bold': require('../assets/fonts/Roboto-Bold.ttf'),
          'ubuntu-regular': require('../assets/fonts/Ubuntu-Regular.ttf'),
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ marginTop: 200 }}>
      <View style={{ marginBottom: 200 }}>
        <Text style={styles.title}>QUORE</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Text style={{ width: 234, fontSize: 15, color: '#ffffff' }}>
          Создайте новый аккаунт или войдите, чтобы продолжить.
        </Text>

        <TouchableHighlight
          {...touchProps}
          style={styles.button}
          onPress={() => navigation.navigate('SignUpScreen')}
        >
          <Text style={{ textAlign: 'center', color: '#ffffff' }}>
            Создать аккаунт
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          {...touchProps}
          style={styles.button}
          onPress={() => navigation.navigate('SignInScreen')}
        >
          <Text style={{ textAlign: 'center', color: '#ffffff' }}>Войти</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    gap: 20,
    marginTop: 30,
    alignItems: 'center',
  },
  button: {
    fontSize: 16,
    fontFamily: 'ubuntu-regular',
    color: '#ffffff',
    backgroundColor: '#313131',
    width: 306,
    borderRadius: 28,
    paddingBottom: 12,
    paddingTop: 12,
  },
  btnNormal: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    height: 30,
    width: 100,
  },
  btnPress: {
    borderColor: 'black',
    borderWidth: 1,
    height: 30,
    width: 100,
  },
  title: {
    color: '#ffffff',
    fontFamily: 'ubuntu-regular',
    fontWeight: 500,
    textAlign: 'center',
    fontSize: 80,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
});
