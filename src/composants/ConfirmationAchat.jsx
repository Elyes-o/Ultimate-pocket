// Fenêtre (qui s'ouvre par le bas) pour confirmer l'achat d'un booster en Éclats.
// Utilisée par l'accueil ET par la boutique.
import { Text, Pressable, Modal } from 'react-native'
import { router } from 'expo-router'
import PaquetBooster from './PaquetBooster'
import IconeEclat from './IconeEclat'
import { useJoueur } from '../donnees/JoueurContexte'
import styles from './ConfirmationAchat.styles'

export default function ConfirmationAchat({ booster, visible, quandOnFerme }) {
  const { eclats, depenserEclats } = useJoueur()
  const assezDEclats = eclats >= booster.prixEclats

  function acheterEtOuvrir() {
    if (depenserEclats(booster.prixEclats)) {
      quandOnFerme()
      router.push('/ouverture?booster=' + booster.id)
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={quandOnFerme}>
      <Pressable style={styles.fondModal} onPress={quandOnFerme}>
        {/* onPress vide : un appui DANS la feuille ne doit pas la fermer */}
        <Pressable style={styles.feuille} onPress={() => {}}>
          <PaquetBooster visuel={booster.visuel} largeur={90} />
          <Text style={styles.titreFeuille}>Ouvrir {booster.nom} ?</Text>
          <Text style={styles.texteFeuille}>5 cartes · {booster.univers}</Text>

          <Pressable
            style={[styles.boutonAcheter, !assezDEclats && styles.boutonDesactive]}
            onPress={acheterEtOuvrir}
            disabled={!assezDEclats}
          >
            <IconeEclat taille={18} />
            <Text style={styles.texteBoutonAcheter}>
              {assezDEclats ? 'Ouvrir pour ' + booster.prixEclats + ' Éclats' : 'Pas assez d\'Éclats'}
            </Text>
          </Pressable>
          <Pressable style={styles.boutonAnnuler} onPress={quandOnFerme}>
            <Text style={styles.texteBoutonAnnuler}>Annuler</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  )
}
