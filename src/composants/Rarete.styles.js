import { StyleSheet } from 'react-native'
import { polices } from '../theme'

// Les couleurs du logo arc-en-ciel des cartes secrètes (aussi utilisées pour le halo à l'ouverture)
export const ARC_EN_CIEL = ['#FF5A6E', '#FFB13B', '#F6E94B', '#4FD68B', '#3FB8F0', '#9B6BFF']

const styles = StyleSheet.create({
  etoiles: {
    flexDirection: 'row',
    gap: 1,
  },
  arcEnCiel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderRadius: 999,
  },
  texteSecrete: {
    fontFamily: polices.tresGrasse,
    color: '#FFFFFF',
  },
})

export default styles
