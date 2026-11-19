// Contenu (faux pour la v1) de l'écran d'accueil : vitrine, boosters et astuces.
import { couleurs } from '../theme'
import { trouverCarte } from './cartes'

// Diapositives de la vitrine (le "panneau publicitaire" du jeu).
// "fond" = illustration générée avec Figma ; "degrade" = couleur affichée pendant le chargement de l'image.
export const diapositivesVitrine = [
  {
    id: 'nouvelle-collection',
    badge: 'NOUVELLE COLLECTION',
    titre: 'Breath of the Wild',
    sousTitre: '23 cartes à collectionner',
    degrade: ['#1E7A4C', '#4CC38A'],
    fond: require('../../assets/visuels/vitrine-collection.webp'),
    // Ordre : arrière gauche, arrière droite, puis la carte mise en avant (devant)
    cartes: [trouverCarte(2), trouverCarte(6), trouverCarte(23)],
  },
  {
    id: 'carte-du-moment',
    badge: 'CARTE DU MOMENT',
    titre: 'Master Sword',
    sousTitre: 'Rareté ★★★★',
    degrade: ['#2B3A8C', '#5B7CF5'],
    fond: require('../../assets/visuels/vitrine-epee.webp'),
    cartes: [trouverCarte(22)],
  },
  {
    id: 'prodiges',
    badge: 'ÉVÉNEMENT',
    titre: 'Les Prodiges',
    sousTitre: 'Daruk, Revali, Urbosa, Mipha',
    degrade: ['#8A2E5C', '#F06A7A'],
    fond: require('../../assets/visuels/vitrine-prodiges.webp'),
    cartes: [trouverCarte(7), trouverCarte(9), trouverCarte(8)],
  },
]

// Boosters affichés dans la liste de l'accueil.
// "visuel" = illustration du paquet (générée avec Figma, dans assets/visuels/).
export const boosters = [
  {
    id: 'zelda-botw',
    nom: 'Hyrule',
    univers: 'Zelda · Breath of the Wild',
    couleur: couleurs.zelda,
    visuel: require('../../assets/visuels/booster-hyrule.webp'),
    disponible: true,
    prixEclats: 100,
    nombrePubs: 3, // provisoire : à décider
  },
  {
    id: 'one-piece',
    nom: 'Grand Line',
    univers: 'One Piece',
    couleur: couleurs.onePiece,
    visuel: require('../../assets/visuels/booster-grand-line.webp'),
    disponible: false,
  },
  {
    id: 'hollow-knight',
    nom: 'Hallownest',
    univers: 'Hollow Knight',
    couleur: couleurs.hollowKnight,
    visuel: require('../../assets/visuels/booster-hallownest.webp'),
    disponible: false,
  },
]

// Astuces affichées pendant le chargement
export const astuces = [
  'Un deck avec des cartes du même univers donne un bonus collectif.',
  'Un Ticket fait avancer le minuteur du booster quotidien.',
  'Link et Zelda ensemble peuvent lancer une attaque duo.',
  'La jauge d\'ultime se remplit pendant le combat.',
  'Regarde une pub pour gagner des Tickets.',
]
