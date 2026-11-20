import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles, RATIO_CARTE } from '../theme'

const styles = StyleSheet.create({
  fond: {
    flex: 1,
    backgroundColor: 'rgba(10, 14, 30, 0.55)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  feuille: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: couleurs.surface,
    borderTopLeftRadius: rayons.enorme,
    borderTopRightRadius: rayons.enorme,
    padding: espaces.l,
    paddingBottom: espaces.xxl,
    gap: espaces.s,
  },
  entete: {
    flexDirection: 'row',
    gap: espaces.m,
    marginBottom: espaces.xs,
  },
  image: {
    width: 76,
    height: 76 / RATIO_CARTE,
    borderRadius: 6,
  },
  infos: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  nom: {
    fontFamily: polices.titre,
    fontSize: tailles.grande,
    color: couleurs.texte,
  },
  ligneType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.s,
  },
  pastilleType: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rayons.rond,
  },
  texteType: {
    fontFamily: polices.tresGrasse,
    fontSize: 11,
    color: couleurs.texteInverse,
  },
  faiblesse: {
    fontFamily: polices.grasse,
    fontSize: 12,
    color: couleurs.texteSecondaire,
  },
  pv: {
    fontFamily: polices.tresGrasse,
    fontSize: 13,
    color: couleurs.texte,
  },
  barrePv: {
    height: 6,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.surfaceDouce,
    overflow: 'hidden',
  },
  barrePvPleine: {
    height: '100%',
    backgroundColor: couleurs.succes,
  },
  barrePvBasse: {
    backgroundColor: '#E2483D',
  },
  boutonFermer: {
    width: 44,
    height: 44,
    borderRadius: rayons.rond,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: couleurs.fond,
  },

  // Une attaque
  attaque: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.m,
    minHeight: 60,
    paddingHorizontal: espaces.m,
    paddingVertical: espaces.s,
    borderRadius: rayons.moyen,
    backgroundColor: couleurs.principaleClaire,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cout: {
    flexDirection: 'row',
    gap: 2,
    width: 62,
    flexWrap: 'wrap',
  },
  pastilleEnergie: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: couleurs.ticket,
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
    fontSize: 12,
    color: couleurs.texteSecondaire,
    marginTop: 1,
  },
  raison: {
    color: '#C0392B',
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
    gap: espaces.m,
    paddingHorizontal: espaces.m,
    paddingVertical: espaces.s,
    borderRadius: rayons.moyen,
    backgroundColor: couleurs.fond,
  },
  nomTalent: {
    fontFamily: polices.tresGrasse,
    fontSize: 14,
    color: couleurs.principaleFoncee,
  },

  retraite: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.s,
    height: 50,
    paddingHorizontal: espaces.l,
    marginTop: espaces.xs,
    borderRadius: rayons.moyen,
    backgroundColor: couleurs.fond,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  texteRetraite: {
    flex: 1,
    fontFamily: polices.tresGrasse,
    fontSize: 15,
    color: couleurs.principaleFoncee,
  },
  coutRetraite: {
    fontFamily: polices.tresGrasse,
    fontSize: 14,
    color: couleurs.texteSecondaire,
  },
})

export default styles
