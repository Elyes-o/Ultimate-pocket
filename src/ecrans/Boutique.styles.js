import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles, ESPACE_BARRE_NAVIGATION } from '../theme'

const styles = StyleSheet.create({
  contenu: {
    paddingHorizontal: espaces.l,
    paddingBottom: ESPACE_BARRE_NAVIGATION,
  },
  titreSection: {
    fontFamily: polices.titre,
    fontSize: tailles.grande,
    color: couleurs.texte,
    marginTop: espaces.m,
    marginBottom: espaces.m,
  },
  ligneTitre: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.s,
  },

  // Tickets gratuits
  carteTicket: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.m,
    padding: espaces.l,
    borderRadius: rayons.grand,
    backgroundColor: couleurs.surface,
    marginBottom: espaces.m,
  },
  iconeTicket: {
    width: 48,
    height: 48,
    borderRadius: rayons.moyen,
    backgroundColor: '#FFF4E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infosTicket: {
    flex: 1,
  },
  titreTicket: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.normale,
    color: couleurs.texte,
  },
  texteTicket: {
    fontFamily: polices.normale,
    fontSize: 13,
    color: couleurs.texteSecondaire,
  },
  boutonRegarder: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 36,
    paddingHorizontal: espaces.m,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.ticket,
  },
  boutonDesactive: {
    opacity: 0.4,
  },
  texteBoutonRegarder: {
    fontFamily: polices.tresGrasse,
    fontSize: 13,
    color: couleurs.texteInverse,
  },

  // Packs d'Éclats
  etiquetteBientot: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.surfaceDouce,
    marginTop: espaces.xs,
  },
  texteBientot: {
    fontFamily: polices.grasse,
    fontSize: 12,
    color: couleurs.texteSecondaire,
  },
  grilleEclats: {
    flexDirection: 'row',
    gap: espaces.s,
    marginBottom: espaces.m,
  },
  carteEclats: {
    flex: 1,
    alignItems: 'center',
    paddingTop: espaces.l,
    paddingBottom: espaces.m,
    borderRadius: rayons.grand,
    backgroundColor: couleurs.surface,
    opacity: 0.75,
  },
  bonus: {
    position: 'absolute',
    top: -8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.succes,
  },
  texteBonus: {
    fontFamily: polices.titre,
    fontSize: 10,
    color: couleurs.texteInverse,
  },
  quantiteEclats: {
    fontFamily: polices.titre,
    fontSize: tailles.moyenne,
    color: couleurs.texte,
    marginTop: espaces.xs,
    marginBottom: espaces.s,
  },
  prix: {
    paddingHorizontal: espaces.m,
    paddingVertical: 4,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.surfaceDouce,
  },
  textePrix: {
    fontFamily: polices.tresGrasse,
    fontSize: 13,
    color: couleurs.texteSecondaire,
  },
})

export default styles
