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
  // Booster légendaire : halo doré autour du paquet + pastille étoile
  paquetLegendaire: {
    shadowColor: '#F7B731',
    shadowOpacity: 0.9,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  etoile: {
    position: 'absolute',
    top: -4,
    right: -6,
    borderRadius: 999,
    backgroundColor: '#F7B731',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Voile sombre + cadenas pour les boosters pas encore disponibles
  voile: {
    ...StyleSheet.absoluteFill,
    borderRadius: 6,
    backgroundColor: 'rgba(23, 30, 51, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default styles
