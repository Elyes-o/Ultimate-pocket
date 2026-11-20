// Une case de la grille de collection.
// Carte possédée : l'image (+ pastille ×2, ×3… s'il y a des doublons). Carte manquante : silhouette grise avec son numéro.
import { View, Text, Image, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { couleurs } from '../theme'
import styles from './CarteCollection.styles'

// Affiche "007" pour la carte n°7
function formaterNumero(numero) {
  return String(numero).padStart(3, '0')
}

export default function CarteCollection({ carte, possedee, exemplaires = 1, quandOnAppuie }) {
  if (!possedee) {
    return (
      <View style={styles.case}>
        <View style={[styles.carte, styles.silhouette]}>
          <Ionicons name="help" size={28} color="#C3C9D8" />
          <Text style={styles.numeroSilhouette}>{formaterNumero(carte.numero)}</Text>
        </View>
      </View>
    )
  }

  return (
    <Pressable style={styles.case} onPress={() => quandOnAppuie(carte)}>
      {/* Le cadre fixe la taille ; l'image le remplit (aspectRatio est mal géré sur les images web) */}
      <View style={styles.carte}>
        <Image source={carte.image} style={styles.image} />
        {exemplaires > 1 && (
          <View style={styles.pastilleExemplaires}>
            <Text style={styles.texteExemplaires}>×{exemplaires}</Text>
          </View>
        )}
      </View>
      <View style={styles.etoiles}>
        {Array.from({ length: carte.rarete }).map((_, index) => (
          <Ionicons key={index} name="star" size={10} color={couleurs.etoile} />
        ))}
      </View>
    </Pressable>
  )
}
