import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles, RATIO_CARTE } from '../theme'

const LARGEUR_CARTE = 220
const LARGEUR_PANNEAU = 300

const styles = StyleSheet.create({
  // Plateau assombri, tout est centré
  fond: {
    flex: 1,
    backgroundColor: 'rgba(10, 18, 36, 0.62)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: espaces.l,
  },
  boutonFermer: {
    position: 'absolute',
    top: 48,
    right: espaces.l,
    width: 44,
    height: 44,
    borderRadius: rayons.rond,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  colonne: {
    alignItems: 'center',
    gap: espaces.s,
    width: LARGEUR_PANNEAU,
    maxWidth: '100%',
  },

  jauge: {
    width: '100%',
  },

  // La carte en grand
  zoneCarte: {
    marginTop: espaces.xs,
  },
  cadreCarte: {
    width: LARGEUR_CARTE,
    height: LARGEUR_CARTE / RATIO_CARTE,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: couleurs.surface,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  // PV actuels, en pastille sur le coin haut droit de la carte
  pastillePv: {
    position: 'absolute',
    top: -10,
    right: -18,
    minWidth: 96,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: rayons.moyen,
    backgroundColor: couleurs.surface,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },
  textePv: {
    fontFamily: polices.titre,
    fontSize: tailles.moyenne,
    color: couleurs.texte,
  },
  textePvMax: {
    fontFamily: polices.grasse,
    fontSize: 11,
    color: couleurs.texteSecondaire,
  },
  barrePv: {
    height: 5,
    marginTop: 3,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.surfaceDouce,
    overflow: 'hidden',
  },
  barrePvPleine: {
    height: '100%',
    backgroundColor: couleurs.succes,
  },
  barrePvBasse: {
    backgroundColor: couleurs.danger,
  },

  // Panneau des attaques : il chevauche le bas de la carte
  panneau: {
    width: '100%',
    marginTop: -46,
    padding: espaces.s,
    gap: 6,
    borderRadius: rayons.grand,
    backgroundColor: couleurs.surface,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },
  attaque: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.s,
    minHeight: 54,
    paddingHorizontal: espaces.m,
    borderRadius: rayons.moyen,
    backgroundColor: couleurs.principaleClaire,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cout: {
    flexDirection: 'row',
    gap: 2,
  },
  pastilleEnergie: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: couleurs.ticket,
  },
  pastillePetite: {
    width: 15,
    height: 15,
  },
  texteAttaque: {
    flex: 1,
  },
  nomAttaque: {
    fontFamily: polices.tresGrasse,
    fontSize: 15,
    color: couleurs.texte,
  },
  effets: {
    fontFamily: polices.normale,
    fontSize: 11,
    color: couleurs.texteSecondaire,
  },
  raison: {
    color: couleurs.danger,
  },
  degats: {
    fontFamily: polices.titre,
    fontSize: tailles.titre,
    color: couleurs.principaleFoncee,
  },
  desactive: {
    opacity: 0.45,
  },
  // Élément montré par le tutoriel
  enAvant: {
    borderColor: couleurs.ticket,
    borderWidth: 3,
    opacity: 1,
  },
  talent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.s,
    paddingHorizontal: espaces.m,
    paddingVertical: espaces.s,
    borderRadius: rayons.moyen,
    backgroundColor: couleurs.fond,
  },
  nomTalent: {
    fontFamily: polices.tresGrasse,
    fontSize: 13,
    color: couleurs.principaleFoncee,
  },

  // Retraite : pilule compacte alignée à droite
  retraite: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 40,
    paddingHorizontal: espaces.m,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.surface,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  texteRetraite: {
    fontFamily: polices.tresGrasse,
    fontSize: 14,
    color: couleurs.principaleFoncee,
  },
  raisonRetraite: {
    fontFamily: polices.grasse,
    fontSize: 12,
    color: couleurs.texteSecondaire,
  },
})

export default styles
