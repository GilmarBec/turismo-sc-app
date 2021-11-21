import * as React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './pages/home';
import AttractionListScreen from './pages/attractions/list';
import FavoriteListScreen from './pages/favorites/list';
import AttractionDetailScreen from './pages/attractions/detail';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  AttractionList: {screen: AttractionListScreen},
  AttractionDetail: {screen: AttractionDetailScreen},
  FavoriteList: {screen: FavoriteListScreen},
});

export default createAppContainer(MainNavigator);
