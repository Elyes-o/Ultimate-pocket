// Onglet Boutique :
//   1. Boosters : achat en Éclats, ou gratuit après X pubs (certains boosters : Éclats uniquement)
//   2. Tickets gratuits : 1 pub = 1 Ticket (limité par jour)
//   3. Éclats : packs en argent réel (affichés, "Bientôt" en v1)
import { useState } from 'react'
import { ScrollView, View, Text, Pressable } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import OffreBooster from '../../src/composants/OffreBooster'
import CarteBooster from '../../src/composants/CarteBooster'
import FenetrePub from '../../src/composants/FenetrePub'
import IconeEclat from '../../src/composants/IconeEclat'
import { useJoueur, PUBS_TICKETS_PAR_JOUR } from '../../src/donnees/JoueurContexte'
import { useEffetsSonores } from '../../src/sons'
import { boosters } from '../../src/donnees/accueil'
import { offresEclats } from '../../src/donnees/boutique'
import { couleurs } from '../../src/theme'
import styles from '../../src/ecrans/Boutique.styles'
import EcranOnglet from '../../src/composants/EcranOnglet'

export default function EcranBoutique() {
  const { pubsParBooster, pubsTicketsRestantes, recompenserPubTicket, compterPubBooster, remettreAZeroPubsBooster } =
    useJoueur()

  const { jouerSon } = useEffetsSonores()

  // Pourquoi la pub est regardée : null (pas de pub), { type: 'ticket' } ou { type: 'booster', booster }
  const [pubEnCours, setPubEnCours] = useState(null)

  const boostersDisponibles = boosters.filter((booster) => booster.disponible)
  const boostersAVenir = boosters.filter((booster) => !booster.disponible)
  const ticketsRestants = pubsTicketsRestantes()

  // La pub est finie : on donne la récompense
  function quandLaPubEstFinie() {
    jouerSon('recompense')
    if (pubEnCours.type === 'ticket') {
      recompenserPubTicket()
    } else {
      const booster = pubEnCours.booster
      const pubsRegardees = (pubsParBooster[booster.id] ?? 0) + 1
      if (pubsRegardees >= booster.nombrePubs) {
        // Assez de pubs : booster gratuit !
        remettreAZeroPubsBooster(booster.id)
        router.push('/ouverture?booster=' + booster.id)
      } else {
        compterPubBooster(booster.id)
      }
    }
    setPubEnCours(null)
  }

  return (
    <EcranOnglet>
      <>
        <ScrollView contentContainerStyle={styles.contenu} showsVerticalScrollIndicator={false}>
          {/* 1. Boosters */}
          <Text style={styles.titreSection}>Boosters</Text>
          {boostersDisponibles.map((booster) => (
            <OffreBooster
              key={booster.id}
              booster={booster}
              quandOnVeutUnePub={(boosterChoisi) => setPubEnCours({ type: 'booster', booster: boosterChoisi })}
            />
          ))}

          {/* 2. Tickets gratuits */}
          <Text style={styles.titreSection}>Tickets gratuits</Text>
          <View style={styles.carteTicket}>
            <View style={styles.iconeTicket}>
              <Ionicons name="ticket" size={26} color={couleurs.ticket} />
            </View>
            <View style={styles.infosTicket}>
              <Text style={styles.titreTicket}>1 pub = 1 Ticket</Text>
              <Text style={styles.texteTicket}>
                {ticketsRestants > 0
                  ? 'Encore ' + ticketsRestants + ' / ' + PUBS_TICKETS_PAR_JOUR + " aujourd'hui"
                  : 'Reviens demain pour de nouveaux Tickets'}
              </Text>
            </View>
            <Pressable
              style={[styles.boutonRegarder, ticketsRestants === 0 && styles.boutonDesactive]}
              onPress={() => setPubEnCours({ type: 'ticket' })}
              disabled={ticketsRestants === 0}
            >
              <Ionicons name="play" size={14} color={couleurs.texteInverse} />
              <Text style={styles.texteBoutonRegarder}>Regarder</Text>
            </Pressable>
          </View>

          {/* 3. Éclats (argent réel, pas encore disponible) */}
          <View style={styles.ligneTitre}>
            <Text style={styles.titreSection}>Éclats</Text>
            <View style={styles.etiquetteBientot}>
              <Text style={styles.texteBientot}>Bientôt</Text>
            </View>
          </View>
          <View style={styles.grilleEclats}>
            {offresEclats.map((offre) => (
              <View key={offre.id} style={styles.carteEclats}>
                {offre.bonus && (
                  <View style={styles.bonus}>
                    <Text style={styles.texteBonus}>{offre.bonus}</Text>
                  </View>
                )}
                <IconeEclat taille={36} />
                <Text style={styles.quantiteEclats}>{offre.eclats.toLocaleString('fr-FR')}</Text>
                <View style={styles.prix}>
                  <Text style={styles.textePrix}>{offre.prix}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Boosters des prochains univers */}
          <Text style={styles.titreSection}>Prochainement</Text>
          {boostersAVenir.map((booster) => (
            <CarteBooster key={booster.id} booster={booster} />
          ))}
        </ScrollView>

        <FenetrePub visible={pubEnCours !== null} quandTerminee={quandLaPubEstFinie} quandAnnulee={() => setPubEnCours(null)} />
      </>
    </EcranOnglet>
  )
}
