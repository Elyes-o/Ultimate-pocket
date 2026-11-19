// Ligne d'un booster dans la liste de l'accueil : paquet, nom, univers et prix (ou "Bientôt").
// Appuyer dessus ouvre une fenêtre de confirmation avant de dépenser les Éclats.
import { useState } from 'react'
import { View, Text, Pressable, Modal } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import PaquetBooster from './PaquetBooster'
import IconeEclat from './IconeEclat'
import { useJoueur } from '../donnees/JoueurContexte'
import { couleurs } from '../theme'
import styles from './CarteBooster.styles'

export default function CarteBooster({ booster }) {
  const { eclats, depenserEclats } = useJoueur()
  const [confirmationVisible, setConfirmationVisible] = useState(false)
  const assezDEclats = eclats >= booster.prixEclats

  function acheterEtOuvrir() {
    if (depenserEclats(booster.prixEclats)) {
      setConfirmationVisible(false)
      router.push('/ouverture')
    }
  }

  return (
    <>
      <Pressable
        style={[styles.carte, !booster.disponible && styles.carteVerrouillee]}
        onPress={() => setConfirmationVisible(true)}
        disabled={!booster.disponible}
      >
        <PaquetBooster visuel={booster.visuel} verrouille={!booster.disponible} largeur={48} />

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

      {/* Fenêtre de confirmation d'achat (s'ouvre par le bas) */}
      <Modal visible={confirmationVisible} transparent animationType="fade" onRequestClose={() => setConfirmationVisible(false)}>
        <Pressable style={styles.fondModal} onPress={() => setConfirmationVisible(false)}>
          <Pressable style={styles.feuille} onPress={() => {}}>
            <PaquetBooster visuel={booster.visuel} largeur={90} />
            <Text style={styles.titreFeuille}>Ouvrir {booster.nom} ?</Text>
            <Text style={styles.texteFeuille}>5 cartes · {booster.univers}</Text>

            <Pressable
              style={[styles.boutonAcheter, !assezDEclats && styles.boutonDesactive]}
              onPress={acheterEtOuvrir}
              disabled={!assezDEclats}
            >
              <Ionicons name="diamond" size={16} color={couleurs.texteInverse} />
              <Text style={styles.texteBoutonAcheter}>
                {assezDEclats ? 'Ouvrir pour ' + booster.prixEclats + ' Éclats' : 'Pas assez d\'Éclats'}
              </Text>
            </Pressable>
            <Pressable style={styles.boutonAnnuler} onPress={() => setConfirmationVisible(false)}>
              <Text style={styles.texteBoutonAnnuler}>Annuler</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  )
}
