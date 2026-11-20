// Grande carte d'un booster dans la boutique :
// bouton "Éclats" (achat) et, si le booster le permet, bouton "Pub" avec la progression (ex. 1/3).
import { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import PaquetBooster from './PaquetBooster'
import IconeEclat from './IconeEclat'
import ConfirmationAchat from './ConfirmationAchat'
import { useJoueur } from '../donnees/JoueurContexte'
import { couleurs } from '../theme'
import styles from './OffreBooster.styles'

export default function OffreBooster({ booster, quandOnVeutUnePub }) {
  const { pubsParBooster } = useJoueur()
  const [confirmationVisible, setConfirmationVisible] = useState(false)

  const accepteLesPubs = booster.nombrePubs !== null
  const pubsRegardees = pubsParBooster[booster.id] ?? 0

  return (
    <View style={[styles.carte, booster.legendaire && styles.carteLegendaire]}>
      <PaquetBooster visuel={booster.visuel} legendaire={booster.legendaire} largeur={80} />

      <View style={styles.infos}>
        {booster.legendaire && (
          <View style={styles.etiquetteLegendaire}>
            <Text style={styles.texteEtiquetteLegendaire}>Légendaire</Text>
          </View>
        )}
        <Text style={styles.nom}>{booster.nom}</Text>
        <Text style={styles.univers}>{booster.univers}</Text>

        <View style={styles.boutons}>
          <Pressable style={styles.boutonEclats} onPress={() => setConfirmationVisible(true)}>
            <IconeEclat taille={16} />
            <Text style={styles.texteBoutonEclats}>{booster.prixEclats}</Text>
          </Pressable>

          {accepteLesPubs ? (
            <Pressable style={styles.boutonPub} onPress={() => quandOnVeutUnePub(booster)}>
              <Ionicons name="play-circle" size={16} color={couleurs.principaleFoncee} />
              <Text style={styles.texteBoutonPub}>
                Pub {pubsRegardees}/{booster.nombrePubs}
              </Text>
            </Pressable>
          ) : (
            <Text style={styles.mention}>Éclats uniquement</Text>
          )}
        </View>
      </View>

      <ConfirmationAchat booster={booster} visible={confirmationVisible} quandOnFerme={() => setConfirmationVisible(false)} />
    </View>
  )
}
