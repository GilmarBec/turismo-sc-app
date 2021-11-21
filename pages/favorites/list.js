import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Icon,
} from 'react-native';
import { Card } from 'react-native-elements';
import FavoriteUtil from '../../utils/favorite';

export default class ContactListScreen extends React.Component {
  static navigationOptions = {
    title: 'Atrações Favoritas',
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener('didFocus', () => {
      return fetch('https://attractions-sc.herokuapp.com/attractions')
        .then((response) => response.json())
        .then((json) =>
          FavoriteUtil.filterFavoriteAttractions(json).then(favorites => 
            this.setState({
              isLoading: false,
              contacts: favorites,
            })
          )
        )
        .catch((error) => {
          console.error(error);
        });
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.contacts}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigate('AttractionDetail', { id: item.id })}>
              <View>
                <Card>
                  <Card.Image source={{ uri: item.photos[0] }} />
                  <Card.Divider />
                  <Card.Title style={{ fontSize: 30 }}>{item.name}</Card.Title>
                  <Card.Title style={{fontSize: 18}}>{item.address.city}</Card.Title>
                </Card>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
