import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles, ombre, ESPACE_BARRE_NAVIGATION, RATIO_CARTE, reliefBouton } from '../theme'

const styles = StyleSheet.create({
  contenu: {
    paddingHorizontal: espaces.l,
    paddingBottom: ESPACE_BARRE_NAVIGATION,
  },
  carteDeck: {
    backgroundColor: couleurs.surface,
    borderRadius: rayons.grand,
    padding: espaces.l,
    marginBottom: espaces.l,
    ...ombre,
  },
  ligneTitre: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: espaces.m,
  },
  titreCarte: {
    fontFamily: polices.titre,
    fontSize: tailles.moyenne,
    color: couleurs.texte,
  },
  boutonModifier: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: espaces.m,
    height: 32,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.principaleClaire,
  },
  texteModifier: {
    fontFamily: polices.tresGrasse,
    fontSize: 13,
    color: couleurs.principaleFoncee,
  },
  rangeeCartes: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  miniCarte: {
    flex: 1,
    aspectRatio: RATIO_CARTE,
    borderRadius: 4,
    overflow: 'hidden',
  },
  imagePleine: {
    width: '100%',
    height: '100%',
  },
  separateur: {
    width: 2,
    height: 40,
    borderRadius: 1,
    backgroundColor: couleurs.bordure,
    marginHorizontal: 2,
  },
  aide: {
    fontFamily: polices.normale,
    fontSize: 13,
    color: couleurs.texteSecondaire,
  },
  titreSection: {
    fontFamily: polices.titre,
    fontSize: tailles.grande,
    color: couleurs.texte,
    // Onglet de classeur : une languette Lagon à gauche du titre
    borderLeftWidth: 5,
    borderLeftColor: couleurs.principale,
    borderRadius: 3,
    paddingLeft: 10,
  },
  statistiques: {
    fontFamily: polices.tresGrasse,
    fontSize: 14,
    color: couleurs.texteSecondaire,
  },
  carteNiveau: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.m,
    padding: espaces.m,
    borderRadius: rayons.grand,
    backgroundColor: couleurs.surface,
    marginBottom: espaces.s,
  },
  carteNiveauGrisee: {
    opacity: 0.55,
  },
  pastilleNiveau: {
    width: 44,
    height: 44,
    borderRadius: rayons.moyen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numeroNiveau: {
    fontFamily: polices.titre,
    fontSize: tailles.grande,
    color: couleurs.texteInverse,
  },
  infosNiveau: {
    flex: 1,
  },
  nomNiveau: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.moyenne,
    color: couleurs.texte,
  },
  styleNiveau: {
    fontFamily: polices.normale,
    fontSize: 12,
    color: couleurs.texteSecondaire,
  },
  ligneRecompense: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  texteRecompense: {
    fontFamily: polices.grasse,
    fontSize: 13,
    color: couleurs.texteSecondaire,
  },
  texteBientot: {
    fontFamily: polices.grasse,
    fontSize: 12,
    color: couleurs.texteSecondaire,
  },

  // Tutoriel
  carteTutoriel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.m,
    padding: espaces.m,
    marginBottom: espaces.l,
    borderRadius: rayons.grand,
    backgroundColor: '#141A2E',
    borderWidth: 2,
    borderColor: couleurs.ticket,
  },
  carteTutorielFaite: {
    backgroundColor: couleurs.surface,
    borderColor: couleurs.bordure,
  },
  portraitImpa: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: couleurs.ticket,
    backgroundColor: '#2A3150',
  },
  // On agrandit la carte pour ne garder que le visage dans le rond
  imageImpa: {
    position: 'absolute',
    width: 114,
    height: 161,
    left: -31,
    top: -29,
  },
  grandPortrait: {
    width: 84,
    height: 84,
    borderRadius: 42,
  },
  grandeImageImpa: {
    width: 185,
    height: 260,
    left: -50,
    top: -46,
  },
  nomTutoriel: {
    fontFamily: polices.titre,
    fontSize: tailles.moyenne,
    color: couleurs.texteInverse,
  },
  nomTutorielFait: {
    color: couleurs.texte,
  },
  detailTutoriel: {
    fontFamily: polices.grasse,
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
  },
  detailTutorielFait: {
    color: couleurs.texteSecondaire,
  },
  fondModal: {
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
    padding: espaces.xl,
    paddingBottom: espaces.xxl,
    alignItems: 'center',
  },
  titreFeuille: {
    fontFamily: polices.titre,
    fontSize: tailles.grande,
    color: couleurs.texte,
    marginTop: espaces.l,
  },
  texteFeuille: {
    fontFamily: polices.normale,
    fontSize: tailles.normale,
    color: couleurs.texteSecondaire,
    textAlign: 'center',
    marginTop: espaces.xs,
    marginBottom: espaces.xl,
  },
  boutonPrincipal: {
    width: '100%',
    height: 54,
    borderRadius: rayons.moyen,
    backgroundColor: couleurs.principale,
    alignItems: 'center',
    justifyContent: 'center',
    ...reliefBouton,
  },
  texteBoutonPrincipal: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.moyenne,
    color: couleurs.texteInverse,
  },
  boutonAnnuler: {
    paddingVertical: espaces.m,
    marginTop: espaces.xs,
  },
  texteAnnuler: {
    fontFamily: polices.grasse,
    fontSize: tailles.normale,
    color: couleurs.texteSecondaire,
  },

  // Boss
  carteBoss: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.m,
    padding: espaces.m,
    marginBottom: espaces.l,
    borderRadius: rayons.grand,
    backgroundColor: '#2A1030',
    borderWidth: 2,
    borderColor: '#7B2FBE',
    borderBottomWidth: 4,
    borderBottomColor: '#4A1660',
  },
  carteBossVerrouillee: {
    opacity: 0.6,
  },
  imageBoss: {
    width: 56,
    height: 56 / RATIO_CARTE,
    borderRadius: 6,
  },
  infosBoss: {
    flex: 1,
  },
  surtitreBoss: {
    fontFamily: polices.tresGrasse,
    fontSize: 12,
    color: '#FF8A7A',
  },
  nomBoss: {
    fontFamily: polices.titre,
    fontSize: tailles.grande,
    color: couleurs.texteInverse,
  },
  detailBoss: {
    fontFamily: polices.normale,
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
  },
})

export default styles
