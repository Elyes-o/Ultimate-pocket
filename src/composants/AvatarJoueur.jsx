// Avatar rond du joueur : l'illustration de la carte choisie (recadrée sur le dessin),
// ou l'initiale du pseudo s'il n'a pas encore choisi de carte.
import { View, Text, Image } from 'react-native'
import { useJoueur } from '../donnees/JoueurContexte'
import { trouverCarte } from '../donnees/cartes'
import { RATIO_CARTE } from '../theme'
import styles from './AvatarJoueur.styles'

export default function AvatarJoueur({ taille = 42, numero }) {
  const { pseudo, avatar } = useJoueur()
  // "numero" permet d'afficher une autre carte (ex. dans la liste de choix)
  const numeroCarte = numero !== undefined ? numero : avatar

  if (numeroCarte === null) {
    return (
      <View style={[styles.cercle, styles.cercleInitiale, { width: taille, height: taille }]}>
        <Text style={[styles.initiale, { fontSize: taille * 0.42 }]}>{pseudo[0].toUpperCase()}</Text>
      </View>
    )
  }

  // On agrandit la carte et on la décale pour que le cercle montre le dessin (le haut de la carte)
  const largeurImage = taille * 1.7
  const hauteurImage = largeurImage / RATIO_CARTE
  return (
    <View style={[styles.cercle, { width: taille, height: taille }]}>
      <Image
        source={trouverCarte(numeroCarte).image}
        style={{
          position: 'absolute',
          width: largeurImage,
          height: hauteurImage,
          left: -(largeurImage - taille) / 2,
          top: -hauteurImage * 0.12,
        }}
      />
    </View>
  )
}
