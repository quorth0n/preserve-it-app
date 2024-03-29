import React from 'react';
import { StyleSheet, View, Platform, AppRegistry } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { Font, AppLoading, Constants } from 'expo';
import { defaultThemeVariables, getTheme } from '@shoutem/ui';
import { StyleProvider } from '@shoutem/theme';

import Firebase, { FirebaseContext } from './components/Firebase';
import MainView from './components/MainView';

class App extends React.PureComponent {
  state = {
    fontsAreLoaded: false
  };

  async componentWillMount() {
    await Font.loadAsync({
      'Rubik-Black': require('./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
      'Rubik-BlackItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
      'Rubik-Bold': require('./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
      'Rubik-BoldItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
      'Rubik-Italic': require('./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
      'Rubik-Light': require('./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
      'Rubik-LightItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
      'Rubik-Medium': require('./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
      'Rubik-MediumItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
      'Rubik-Regular': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf')
    });

    this.setState({ fontsAreLoaded: true });
  }

  render() {
    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }

    return (
      <FirebaseContext.Provider value={new Firebase()}>
        <MenuProvider>
          <StyleProvider style={theme}>
            <View style={styles.header}>
              <MainView />
            </View>
          </StyleProvider>
        </MenuProvider>
      </FirebaseContext.Provider>
    );
  }
}

AppRegistry.registerComponent('Preserve-It!', () => {
  App;
});
export default App;

const styles = StyleSheet.create({
  header: {
    marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
  }
});

const theme = getTheme({
  ...defaultThemeVariables,
  caption: {
    ...defaultThemeVariables.caption,
    '.soon': {
      color: 'red'
    },
    '.needsExp': {
      color: 'orange'
    }
  }
});
