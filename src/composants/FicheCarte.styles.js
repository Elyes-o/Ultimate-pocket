import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles, RATIO_CARTE, reliefBouton } from '../theme'

export const LARGEUR_CARTE = 240

// Fond sombre façon vitrine : la carte ressort, les blocs d'infos sont clairs par-dessus
const FOND = '#141A2E'
const BLOC = 'rgba(255,255,255,0.07)'
const TEXTE_DOUX = 'rgba(255,255,255,0.62)'

const styles = StyleSheet.create({
  ecran: {
    flex: 1,
    backgroundColor: FOND,
  },
  entete: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: espaces.l,
    marginBottom: espaces.s,
  },
  boutonRond: {
    width: 44,
    height: 44,
    borderRadius: rayons.rond,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BLOC,
  },
  numero: {
    fontFamily: polices.tresGrasse,
    fontSize: 14,
    color: TEXTE_DOUX,
    letterSpacing: 1,
  },
  contenu: {
    paddingHorizontal: espaces.l,
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
  },

  // Carte inclinable
  zoneCarte: {
    alignItems: 'center',
    paddingVertical: espaces.l,
  },
  carte: {
    width: LARGEUR_CARTE,
    height: LARGEUR_CARTE / RATIO_CARTE,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.45,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    elevation: 12,
  },
  carteRare: {
    shadowColor: couleurs.etoile,
    shadowOpacity: 0.55,
  },
  carteUltraRare: {
    shadowColor: '#B57BFF',
    shadowOpacity: 0.7,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  reflet: {
    position: 'absolute',
    top: -LARGEUR_CARTE * 0.3,
    bottom: -LARGEUR_CARTE * 0.3,
    left: LARGEUR_CARTE * 0.25,
    width: LARGEUR_CARTE * 0.5,
  },
  degradeReflet: {
    flex: 1,
  },
  indication: {
    fontFamily: polices.normale,
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    marginTop: espaces.l,
  },

  // Nom, rareté, catégorie
  nom: {
    fontFamily: polices.titre,
    fontSize: tailles.titre,
    color: couleurs.texteInverse,
    textAlign: 'center',
  },
  ligneSousTitre: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: espaces.s,
    marginTop: espaces.xs,
  },
  etoiles: {
    flexDirection: 'row',
    gap: 2,
  },
  point: {
    color: TEXTE_DOUX,
    fontFamily: polices.grasse,
  },
  categorie: {
    fontFamily: polices.grasse,
    fontSize: 14,
    color: TEXTE_DOUX,
  },

  // Exemplaires et combats joués
  ligneCompteurs: {
    flexDirection: 'row',
    gap: espaces.m,
    marginTop: espaces.xl,
  },
  compteur: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: espaces.m,
    borderRadius: rayons.moyen,
    backgroundColor: BLOC,
  },
  valeurCompteur: {
    fontFamily: polices.titre,
    fontSize: tailles.grande,
    color: couleurs.texteInverse,
  },
  libelleCompteur: {
    fontFamily: polices.normale,
    fontSize: 12,
    color: TEXTE_DOUX,
  },
  boutonRecycler: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: espaces.s,
    height: 48,
    marginTop: espaces.m,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.principale,
    ...reliefBouton,
  },
  texteBoutonRecycler: {
    fontFamily: polices.tresGrasse,
    fontSize: 15,
    color: couleurs.texteInverse,
  },

  // Sections
  titreSection: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.moyenne,
    color: couleurs.texteInverse,
    marginTop: espaces.xl,
    marginBottom: espaces.s,
  },
  bloc: {
    padding: espaces.l,
    borderRadius: rayons.grand,
    backgroundColor: BLOC,
    gap: espaces.m,
  },

  // Infos du combattant
  ligneInfos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: espaces.m,
  },
  info: {
    alignItems: 'center',
    gap: 6,
    minWidth: 64,
  },
  libelleInfo: {
    fontFamily: polices.grasse,
    fontSize: 12,
    color: TEXTE_DOUX,
  },
  valeurInfo: {
    fontFamily: polices.titre,
    fontSize: tailles.moyenne,
    color: couleurs.texteInverse,
  },
  pastilleType: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: rayons.rond,
  },
  texteType: {
    fontFamily: polices.tresGrasse,
    fontSize: 12,
    color: couleurs.texteInverse,
  },
  cout: {
    flexDirection: 'row',
    gap: 3,
  },
  pastilleEnergie: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: couleurs.ticket,
  },

  talent: {
    padding: espaces.m,
    borderRadius: rayons.moyen,
    backgroundColor: 'rgba(91, 76, 245, 0.28)',
  },
  nomTalent: {
    fontFamily: polices.tresGrasse,
    fontSize: 14,
    color: couleurs.texteInverse,
  },
  texteTalent: {
    fontFamily: polices.normale,
    fontSize: 13,
    color: TEXTE_DOUX,
    marginTop: 2,
  },

  attaque: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.m,
    paddingTop: espaces.m,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  texteAttaque: {
    flex: 1,
  },
  nomAttaque: {
    fontFamily: polices.tresGrasse,
    fontSize: 15,
    color: couleurs.texteInverse,
  },
  effetsAttaque: {
    fontFamily: polices.normale,
    fontSize: 12,
    color: TEXTE_DOUX,
    marginTop: 2,
  },
  degats: {
    fontFamily: polices.titre,
    fontSize: tailles.grande,
    color: couleurs.texteInverse,
  },

  // Supporter / Objet
  texteEffet: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.moyenne,
    color: couleurs.texteInverse,
  },
  noteEffet: {
    fontFamily: polices.normale,
    fontSize: 12,
    color: TEXTE_DOUX,
  },

  // Combos
  combo: {
    padding: espaces.l,
    borderRadius: rayons.grand,
    backgroundColor: BLOC,
    marginBottom: espaces.s,
  },
  enteteCombo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nomCombo: {
    fontFamily: polices.tresGrasse,
    fontSize: 15,
    color: couleurs.texteInverse,
  },
  coutCombo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  texteCoutCombo: {
    fontFamily: polices.titre,
    fontSize: 14,
    color: couleurs.ticket,
  },
  ultime: {
    fontFamily: polices.titre,
    fontSize: tailles.moyenne,
    color: couleurs.etoile,
    marginTop: 2,
  },
  effetsCombo: {
    fontFamily: polices.normale,
    fontSize: 12,
    color: TEXTE_DOUX,
    marginTop: 2,
  },
  partenaires: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: espaces.s,
    marginTop: espaces.m,
  },
  libellePartenaires: {
    fontFamily: polices.grasse,
    fontSize: 12,
    color: TEXTE_DOUX,
  },
  partenaire: {
    alignItems: 'center',
    width: 56,
  },
  miniCarte: {
    width: 40,
    height: 40 / RATIO_CARTE,
    borderRadius: 4,
  },
  miniSilhouette: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nomPartenaire: {
    fontFamily: polices.grasse,
    fontSize: 10,
    color: TEXTE_DOUX,
    marginTop: 2,
  },
})

export default styles
