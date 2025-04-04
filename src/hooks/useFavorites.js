import { useDispatch, useSelector } from 'react-redux'
import { toggleFavoriteCity, toggleFavoriteCrypto } from '../redux/slice/preferencesSlice'

export const useFavorites = () => {
  const dispatch = useDispatch()
  const { favoriteCities, favoriteCryptos } = useSelector((state) => state.preferences)

  const toggleCity = (city) => dispatch(toggleFavoriteCity(city))
  const toggleCrypto = (id) => dispatch(toggleFavoriteCrypto(id))

  const isCityFavorite = (city) => favoriteCities.includes(city)
  const isCryptoFavorite = (id) => favoriteCryptos.includes(id)

  return {
    toggleCity,
    toggleCrypto,
    isCityFavorite,
    isCryptoFavorite
  }
}