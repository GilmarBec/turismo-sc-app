import * as React from 'react';
import FavoriteUtil from '../../utils/favorite';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Button,
  Linking,
  Platform,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Switch,
} from 'react-native';
import { Logger } from '../../utils/logger';

export default class AttractionDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Atração',
  };

  constructor(props) {
    super(props);
    let id = props.navigation.getParam('id');
    this.state = { isLoading: true, id };
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener('didFocus', () => {
      return fetch(
        `https://attractions-sc.herokuapp.com/attractions/${this.state.id}`
      )
        .then((response) => response.json())
        .then((json) => {
          FavoriteUtil.isFavorite(json.id).then(this.setIsFavorite.bind(this));

          this.setState({
            isLoading: false,
            isFavorite: false,
            attraction: json,
          });
        })
        .catch((error) => {
          throw error;
        });
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  async setIsFavorite(isFavorite) {
    this.setState({ ...this.state, isFavorite });
  }

  toggleFavorite() {
    FavoriteUtil.toggleFavorite(this.state.attraction.id);
    this.setState({ ...this.state, isFavorite: !this.state.isFavorite });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={[
            {
              flex: 1,
              justifyContent: 'center',
            },
            {
              flexDirection: 'row',
              justifyContent: 'space-around',
              padding: 10,
            },
          ]}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    const { navigate } = this.props.navigation;

    const {
      name,
      address,
      contact,
      pricing,
      schedule,
      tags,
      description,
      photos,
      video,
    } = this.state.attraction;

    const mapUrl = Platform.select({
      ios: `maps:0,0?q=${address.latitude},${address.longitude}`,
      android: `geo:0,0?q=${address.latitude},${address.longitude}`,
    });

    return (
      <ScrollView>
        <View style={styles.section}>
          <View style={(styles.container, { flex: 3 })}>
            <Image source={{ uri: photos[0] }} style={{ height: '100%' }} />
          </View>

          <View style={{ flex: 1 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.contactName}>{name}</Text>
              <View>
                <Text style={styles.contactName}>{pricing.price}</Text>
              </View>
            </View>

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Button
                onPress={() => Linking.openURL(mapUrl)}
                title="Localizar"
              />
              <Button
                onPress={() => Linking.openURL(`tel:${contact.phone}`)}
                title="Ligar"
              />
              <Button
                onPress={() => Linking.openURL(`mailto:${contact.mail}`)}
                title="E-mail"
              />
              <Button
                onPress={() => Linking.openURL(`${contact.site}`)}
                title="Website"
              />
              <Button
                onPress={() => Linking.openURL(`${video}`)}
                title="Vídeo"
              />
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={this.state.isFavorite ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={this.toggleFavorite.bind(this)}
                value={this.state.isFavorite}
              />
            </View>
          </View>
            <View style={(styles.container, { flex: 2 })}>
              <Text style={styles.contactDetails}>Horário de funcionamento:</Text>
              <FlatList
                data={schedule}
                keyExtractor={(_, index) => index}
                renderItem={({ item }) => <Text>{item}</Text>}
              />
            </View>
            <View style={(styles.container, { flex: 1 })}>
              <Text style={styles.contactDetails}>Descrição: {description}</Text>
            </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    height: Dimensions.get('screen').height - 101,
  },
  container: {
    padding: 15,
    height: '100%',
  },
  contactName: {
    fontSize: 30,
    fontWeight: 'bold',
    height: 44,
  },
  contactDetails: {
    fontSize: 16,
    height: 44,
  },
});
