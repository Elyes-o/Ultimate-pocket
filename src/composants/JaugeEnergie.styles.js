import { StyleSheet } from 'react-native'
import { polices } from '../theme'

// Couleurs « HUD » : fond nuit, cyan néon (propres à la jauge d'Énergie)
const NUIT = '#071C29'
const NEON = '#3CE7FF'
const VIDE = '#11384A'

const styles = StyleSheet.create({
  neon: {
    color: NEON,
  },
  // Capsule sombre au contour néon
  cadre: {
    backgroundColor: NUIT,
    borderWidth: 2,
    borderColor: NEON,
    borderRadius: 12,
    padding: 5,
    shadowColor: NEON,
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  cadreHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cadreVertical: {
    width: 46,
    alignItems: 'center',
    gap: 5,
  },
  cadreCompact: {
    width: 34,
    padding: 3,
    borderWidth: 1.5,
    borderRadius: 9,
  },
  entete: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  enteteVerticale: {
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(60, 231, 255, 0.35)',
  },
  nombre: {
    fontFamily: polices.titre,
    fontSize: 16,
    color: NEON,
    minWidth: 14,
    textAlign: 'center',
  },
  nombreCompact: {
    fontSize: 12,
  },
  cases: {
    gap: 3,
  },
  casesHorizontales: {
    flex: 1,
    flexDirection: 'row',
  },
  // De bas en haut : le 1er segment est en bas
  casesVerticales: {
    flexDirection: 'column-reverse',
    paddingLeft: 4,
    borderLeftWidth: 2,
    borderLeftColor: 'rgba(60, 231, 255, 0.4)',
  },
  case: {
    borderRadius: 3,
    backgroundColor: VIDE,
  },
  caseHorizontale: {
    flex: 1,
    height: 14,
  },
  caseCompacte: {
    height: 7,
    borderRadius: 2,
  },
  caseVerticale: {
    width: 26,
    height: 15,
  },
  caseVerticaleCompacte: {
    width: 14,
    height: 5,
    borderRadius: 2,
  },
  casePleine: {
    backgroundColor: NEON,
    shadowColor: NEON,
    shadowOpacity: 0.9,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
  },
  gain: {
    position: 'absolute',
    right: -6,
    top: -18,
    fontFamily: polices.titre,
    fontSize: 14,
    color: '#0A7891',
  },
})

export default styles
