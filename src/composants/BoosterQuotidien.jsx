// Booster quotidien gratuit : minuteur, barre de recharge et bouton "Utiliser un ticket".
// Quand le minuteur arrive à zéro, le booster est prêt et le bouton devient "Ouvrir".
import { useEffect, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import PaquetBooster from './PaquetBooster'
import { useJoueur, DUREE_RECHARGE_BOOSTER } from '../donnees/JoueurContexte'
import { boosters } from '../donnees/accueil'
import { couleurs } from '../theme'
import styles from './BoosterQuotidien.styles'

// Transforme des millisecondes en "03:12:45"
function formaterDuree(millisecondes) {
  const totalSecondes = Math.max(0, Math.floor(millisecondes / 1000))
  const heures = Math.floor(totalSecondes / 3600)
  const minutes = Math.floor((totalSecondes % 3600) / 60)
  const secondes = totalSecondes % 60
  return [heures, minutes, secondes].map((nombre) => String(nombre).padStart(2, '0')).join(':')
}

export default function BoosterQuotidien() {
  const { tickets, boosterPretA, utiliserTicket, relancerBoosterQuotidien } = useJoueur()
  const [maintenant, setMaintenant] = useState(Date.now())

  // On met l'heure à jour chaque seconde pour faire tourner le minuteur
  useEffect(() => {
    const minuteur = setInterval(() => setMaintenant(Date.now()), 1000)
    return () => clearInterval(minuteur)
  }, [])

  const tempsRestant = boosterPretA - maintenant
  const estPret = tempsRestant <= 0
  const pourcentageRecharge = Math.min(1, 1 - tempsRestant / DUREE_RECHARGE_BOOSTER)
  const boosterDuJour = boosters[0]

  // Le minuteur repart pour 12 h, puis on va à l'écran d'ouverture
  function ouvrirBoosterQuotidien() {
    relancerBoosterQuotidien()
    router.push('/ouverture')
  }

  return (
    <View style={[styles.carte, estPret && styles.cartePrete]}>
      <PaquetBooster visuel={boosterDuJour.visuel} largeur={70} />

      <View style={styles.infos}>
        <View style={styles.etiquetteGratuit}>
          <Text style={styles.texteGratuit}>GRATUIT</Text>
        </View>
        <Text style={styles.titre}>Booster quotidien</Text>

        <Text style={styles.sousTitre}>{estPret ? 'Ton booster est prêt !' : 'Prochain booster dans'}</Text>
        {!estPret && <Text style={styles.minuteur}>{formaterDuree(tempsRestant)}</Text>}

        <View style={styles.barreFond}>
          <View style={[styles.barrePleine, { width: pourcentageRecharge * 100 + '%' }, estPret && styles.barrePrete]} />
        </View>

        {estPret ? (
          <Pressable style={[styles.bouton, styles.boutonOuvrir]} onPress={ouvrirBoosterQuotidien}>
            <Ionicons name="sparkles" size={16} color={couleurs.texteInverse} />
            <Text style={styles.texteBoutonOuvrir}>Ouvrir</Text>
          </Pressable>
        ) : (
          <Pressable
            style={[styles.bouton, styles.boutonTicket, tickets === 0 && styles.boutonDesactive]}
            onPress={utiliserTicket}
            disabled={tickets === 0}
          >
            <Ionicons name="ticket" size={16} color={couleurs.ticket} />
            <Text style={styles.texteBoutonTicket}>Utiliser un ticket · -1 h</Text>
          </Pressable>
        )}
      </View>
    </View>
  )
}
