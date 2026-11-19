// Ligne d'un booster dans la liste de l'accueil : paquet, nom, univers et prix (ou "Bientôt").
// Appuyer dessus ouvre la fenêtre de confirmation avant de dépenser les Éclats.
import { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import PaquetBooster from './PaquetBooster'
import IconeEclat from './IconeEclat'
import ConfirmationAchat from './ConfirmationAchat'
import styles from './CarteBooster.styles'

export default function CarteBooster({ booster }) {
  const [confirmationVisible, setConfirmationVisible] = useState(false)

  return (
    <>
      <Pressable
        style={[styles.carte, !booster.disponible && styles.carteVerrouillee]}
        onPress={() => setConfirmationVisible(true)}
        disabled={!booster.disponible}
      >
        <PaquetBooster visuel={booster.visuel} verrouille={!booster.disponible} legendaire={booster.legendaire} largeur={48} />

        <View style={styles.infos}>
          <Text style={styles.nom}>{booster.nom}</Text>
          <Text style={styles.univers}>{booster.univers}</Text>
        </View>

        {booster.disponible ? (
          <View style={styles.prix}>
            <IconeEclat taille={15} />
            <Text style={styles.textePrix}>{booster.prixEclats}</Text>
          </View>
        ) : (
          <View style={styles.bientot}>
            <Text style={styles.texteBientot}>Bientôt</Text>
          </View>
        )}
      </Pressable>

      {booster.disponible && (
        <ConfirmationAchat
          booster={booster}
          visible={confirmationVisible}
          quandOnFerme={() => setConfirmationVisible(false)}
        />
      )}
    </>
  )
}
