// Les 23 cartes de la collection Zelda : Breath of the Wild.
// "rarete" = nombre d'étoiles imprimées sur la carte (1 à 4).
// "possedee" = cartes possédées AU DÉPART (fausse donnée v1). Ensuite, c'est JoueurContexte
// qui sait quelles cartes le joueur possède (elles changent quand on ouvre un booster).

export const cartesZelda = [
  { numero: 1, nom: 'Link', image: require('../../images/link.webp'), rarete: 1, possedee: true },
  { numero: 2, nom: 'Zelda', image: require('../../images/zelda.webp'), rarete: 3, possedee: true },
  { numero: 3, nom: 'Le Roi d\'Hyrule', image: require('../../images/le-roi-d-hyrule.webp'), rarete: 2, possedee: false },
  { numero: 4, nom: 'Impa', image: require('../../images/impa.webp'), rarete: 1, possedee: true },
  { numero: 5, nom: 'Pru\'ha', image: require('../../images/pru-ha.webp'), rarete: 1, possedee: false },
  { numero: 6, nom: 'Mipha', image: require('../../images/mipha.webp'), rarete: 3, possedee: false },
  { numero: 7, nom: 'Daruk', image: require('../../images/daruk.webp'), rarete: 3, possedee: false },
  { numero: 8, nom: 'Revali', image: require('../../images/revali.webp'), rarete: 3, possedee: false },
  { numero: 9, nom: 'Urbosa', image: require('../../images/urbosa.webp'), rarete: 3, possedee: true },
  { numero: 10, nom: 'Prince Sidon', image: require('../../images/sidon.webp'), rarete: 2, possedee: true },
  { numero: 11, nom: 'Yunobo', image: require('../../images/yunobo.webp'), rarete: 2, possedee: false },
  { numero: 12, nom: 'Teba', image: require('../../images/teba.webp'), rarete: 2, possedee: true },
  { numero: 13, nom: 'Riju', image: require('../../images/riju.webp'), rarete: 2, possedee: false },
  { numero: 14, nom: 'Sooga', image: require('../../images/sooga.webp'), rarete: 1, possedee: false },
  { numero: 15, nom: 'Terry', image: require('../../images/terry.webp'), rarete: 1, possedee: false },
  { numero: 16, nom: 'Bokoblin', image: require('../../images/bokoblin.webp'), rarete: 1, possedee: true },
  { numero: 17, nom: 'Hinox', image: require('../../images/hinox.webp'), rarete: 1, possedee: true },
  { numero: 18, nom: 'Lynel', image: require('../../images/lynel.webp'), rarete: 2, possedee: false },
  { numero: 19, nom: 'Gardien', image: require('../../images/gardien.webp'), rarete: 2, possedee: false },
  { numero: 20, nom: 'Paravoile', image: require('../../images/paravoile.webp'), rarete: 1, possedee: true },
  { numero: 21, nom: 'Tablette Sheikah', image: require('../../images/tablette-sheikah.webp'), rarete: 1, possedee: false },
  { numero: 22, nom: 'Master Sword', image: require('../../images/master-sword.webp'), rarete: 4, possedee: false },
  { numero: 23, nom: 'Link (Prodige)', image: require('../../images/link-2.webp'), rarete: 4, possedee: false },
]

// Petite fonction pour retrouver une carte par son numéro
export function trouverCarte(numero) {
  return cartesZelda.find((carte) => carte.numero === numero)
}
