import AsyncStorage from '@react-native-async-storage/async-storage';
import { arrayRemoveValue } from './array'
import { Logger } from './logger'

export class FavoriteUtil {
  FAVORITE_KEY = 'favorites'

  async getFavorites() {
    const favorites = await AsyncStorage.getItem(this.FAVORITE_KEY)
      Logger.debug({message: `Favorites Saved[${favorites}]`})
    return favorites /* && favorites !== 'undefined' */ ? JSON.parse(favorites) : []
  }

  async isFavorite(attractionId) {
    const favorites = await this.getFavorites() ?? []

    return favorites.includes(attractionId)
  }

  async filterFavoriteAttractions(attractions) {
    const favorites = await this.getFavorites() ?? []
    attractions = attractions ?? []

    return attractions.filter(attraction => favorites.includes(attraction.id))
  }

  async toggleFavorite(attractionId) {
    if(await this.isFavorite(attractionId)) {
      Logger.debug({message: `Removing Favorite[${attractionId}]`})
      return this.removeFavorite(attractionId)
    }

    Logger.debug({message: `Adding Favorite[${attractionId}]`})
    return this.addFavorite(attractionId)
  }

  async addFavorite(attractionId) {
    if(await this.isFavorite(attractionId)) return

    const favorites = await this.getFavorites()
    favorites.push(attractionId)
    return AsyncStorage.setItem(this.FAVORITE_KEY, JSON.stringify([attractionId]))
  }

  async removeFavorite(attractionId) {
    if(!await this.isFavorite(attractionId)) return

    const favorites = await this.getFavorites()

    return AsyncStorage.setItem(
      this.FAVORITE_KEY,
      JSON.stringify(arrayRemoveValue(favorites, attractionId))
    );
  }
}

export default new FavoriteUtil();
