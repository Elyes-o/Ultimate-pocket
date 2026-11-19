import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  paquet: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  // Voile sombre + cadenas pour les boosters pas encore disponibles
  voile: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 6,
    backgroundColor: 'rgba(23, 30, 51, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default styles
