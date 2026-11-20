import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles, ombre, RATIO_CARTE } from '../theme'

const styles = StyleSheet.create({
  ecran: {
    flex: 1,
    backgroundColor: couleurs.fond,
  },
  entete: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: espaces.l,
    marginBottom: espaces.s,
  },
  boutonRond: {
    width: 40,
    height: 40,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titre: {
    fontFamily: polices.titre,
    fontSize: tailles.grande,
    color: couleurs.texte,
  },
  contenu: {
    paddingHorizontal: espaces.l,
  },

  // Identité
  carteIdentite: {
    alignItems: 'center',
    backgroundColor: couleurs.surface,
    borderRadius: rayons.grand,
    paddingVertical: espaces.xl,
    marginBottom: espaces.m,
    ...ombre,
  },
  pastilleModifier: {
    position: 'absolute',
    right: 0,
    bottom: 2,
    width: 28,
    height: 28,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.principale,
    borderWidth: 2,
    borderColor: couleurs.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lignePseudo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.s,
    marginTop: espaces.m,
  },
  pseudo: {
    fontFamily: polices.titre,
    fontSize: tailles.titre,
    color: couleurs.texte,
  },
  champPseudo: {
    minWidth: 160,
    height: 44,
    paddingHorizontal: espaces.m,
    borderRadius: rayons.moyen,
    borderWidth: 2,
    borderColor: couleurs.principale,
    fontFamily: polices.tresGrasse,
    fontSize: tailles.moyenne,
    color: couleurs.texte,
  },
  boutonValider: {
    width: 40,
    height: 40,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.principale,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titreJoueur: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: espaces.xs,
    paddingHorizontal: espaces.m,
    paddingVertical: 4,
    borderRadius: rayons.rond,
    backgroundColor: '#FFF4DE',
  },
  texteTitreJoueur: {
    fontFamily: polices.tresGrasse,
    fontSize: 13,
    color: '#B8740A',
  },
  sousTitre: {
    fontFamily: polices.grasse,
    fontSize: 13,
    color: couleurs.texteSecondaire,
    marginTop: espaces.xs,
  },

  // Statistiques
  grilleStats: {
    flexDirection: 'row',
    gap: espaces.s,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: espaces.m,
    borderRadius: rayons.grand,
    backgroundColor: couleurs.surface,
  },
  valeurStat: {
    fontFamily: polices.titre,
    fontSize: tailles.grande,
    color: couleurs.principaleFoncee,
  },
  libelleStat: {
    fontFamily: polices.grasse,
    fontSize: 12,
    color: couleurs.texteSecondaire,
  },
  titreSection: {
    fontFamily: polices.titre,
    fontSize: tailles.moyenne,
    color: couleurs.texte,
    marginTop: espaces.xl,
    marginBottom: espaces.s,
  },

  // Niveaux battus
  ligneNiveaux: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: couleurs.surface,
    borderRadius: rayons.grand,
    padding: espaces.m,
  },
  niveau: {
    alignItems: 'center',
    gap: 4,
  },
  medaille: {
    width: 44,
    height: 44,
    borderRadius: rayons.rond,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nomNiveau: {
    fontFamily: polices.grasse,
    fontSize: 11,
    color: couleurs.texte,
  },
  nomNiveauVerrouille: {
    color: '#A9B0C3',
  },

  // Meilleure carte / carte favorite
  ligneCartes: {
    flexDirection: 'row',
    gap: espaces.s,
    marginTop: espaces.xl,
  },
  carteMiseEnAvant: {
    flex: 1,
    alignItems: 'center',
    padding: espaces.m,
    borderRadius: rayons.grand,
    backgroundColor: couleurs.surface,
  },
  titreMiseEnAvant: {
    fontFamily: polices.tresGrasse,
    fontSize: 13,
    color: couleurs.texteSecondaire,
    marginBottom: espaces.s,
  },
  cadreCarte: {
    width: 96,
    height: 96 / RATIO_CARTE,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imagePleine: {
    width: '100%',
    height: '100%',
  },
  nomCarte: {
    fontFamily: polices.tresGrasse,
    fontSize: 14,
    color: couleurs.texte,
    marginTop: espaces.s,
    textAlign: 'center',
  },
  detailCarte: {
    fontFamily: polices.grasse,
    fontSize: 12,
    color: couleurs.etoile,
  },
  texteVide: {
    fontFamily: polices.normale,
    fontSize: 13,
    color: couleurs.texteSecondaire,
    textAlign: 'center',
    paddingVertical: espaces.xl,
  },

  // Paramètres
  listeParametres: {
    backgroundColor: couleurs.surface,
    borderRadius: rayons.grand,
    paddingHorizontal: espaces.l,
  },
  ligneParametre: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.m,
    minHeight: 54,
    borderBottomWidth: 1,
    borderBottomColor: couleurs.bordure,
  },
  derniereLigne: {
    borderBottomWidth: 0,
  },
  texteParametre: {
    flex: 1,
    fontFamily: polices.grasse,
    fontSize: tailles.normale,
    color: couleurs.texte,
  },
  valeurParametre: {
    fontFamily: polices.grasse,
    fontSize: 14,
    color: couleurs.texteSecondaire,
  },
  texteDanger: {
    color: '#E2483D',
  },
  mention: {
    fontFamily: polices.normale,
    fontSize: 12,
    color: couleurs.texteSecondaire,
    marginTop: espaces.s,
    textAlign: 'center',
  },

  // Fenêtres
  fondModal: {
    flex: 1,
    backgroundColor: 'rgba(10, 14, 30, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: espaces.xl,
  },
  feuille: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '80%',
    backgroundColor: couleurs.surface,
    borderRadius: rayons.enorme,
    padding: espaces.xl,
    alignItems: 'center',
  },
  titreFeuille: {
    fontFamily: polices.titre,
    fontSize: tailles.moyenne,
    color: couleurs.texte,
    marginVertical: espaces.m,
    textAlign: 'center',
  },
  grilleAvatars: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: espaces.s,
  },
  choixAvatar: {
    padding: 3,
    borderRadius: rayons.rond,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  choixAvatarActif: {
    borderColor: couleurs.principale,
  },
  texteConfirmation: {
    fontFamily: polices.normale,
    fontSize: tailles.normale,
    color: couleurs.texteSecondaire,
    textAlign: 'center',
    marginBottom: espaces.l,
  },
  boutonDanger: {
    width: '100%',
    height: 50,
    borderRadius: rayons.moyen,
    backgroundColor: '#E2483D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texteBoutonDanger: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.normale,
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
})

export default styles
