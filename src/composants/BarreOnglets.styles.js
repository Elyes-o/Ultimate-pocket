import { StyleSheet } from 'react-native'
import { couleurs, polices } from '../theme'

const TAILLE_CENTRE = 64

const styles = StyleSheet.create({
  barre: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 8,
    paddingHorizontal: 6,
    backgroundColor: couleurs.surface,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderTopWidth: 1,
    borderColor: '#DCE7EF',
    shadowColor: '#24577A',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -3 },
    elevation: 12,
  },
  onglet: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    minHeight: 52,
  },
  fondIcone: {
    width: 44,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fondIconeActif: {
    backgroundColor: couleurs.principaleClaire,
  },
  libelle: {
    fontFamily: polices.grasse,
    fontSize: 10,
    color: '#8A9AB0',
  },
  libelleActif: {
    color: couleurs.principaleFoncee,
  },

  // Bouton central Combat : un rond qui dépasse de la barre, avec un anneau blanc
  emplacementCentre: {
    flex: 1.15,
    alignItems: 'center',
    gap: 2,
  },
  anneauCentre: {
    width: TAILLE_CENTRE + 10,
    height: TAILLE_CENTRE + 10,
    borderRadius: (TAILLE_CENTRE + 10) / 2,
    marginTop: -34,
    padding: 5,
    backgroundColor: couleurs.surface,
    shadowColor: '#24577A',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 8,
  },
  anneauCentreActif: {
    shadowColor: couleurs.ticket,
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  boutonCentre: {
    flex: 1,
    borderRadius: TAILLE_CENTRE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
  },
  libelleCentre: {
    fontFamily: polices.tresGrasse,
  },
})

export default styles
