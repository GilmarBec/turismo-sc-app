import * as React from 'react';
import { View, Text, Image, Button, BackHandler, StyleSheet } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Turismo Santa Catarina',
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.title} >Turismo SC</Text>
        </View>
        <View style={styles.button}>
          <Button title="Atrações" onPress={() => navigate('AttractionList')} />
        </View>
        <View style={styles.button}>
          <Button title="Favoritos" onPress={() => navigate('FavoriteList')} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
  },
  title: {
    padding: 10,
    fontSize: 64,
    fontWeight: 'bold',
  },
  button: {
    padding: 15,
  }
});
