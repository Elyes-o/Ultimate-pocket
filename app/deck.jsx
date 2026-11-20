// Écran "Mon deck" : choisir 5 combattants, 1 Supporter et 1 Objet parmi ses cartes.
// Le 1er combattant choisi commence le combat en actif.
import { useState } from 'react'
import { View, Text, Image, Pressable, ScrollView } from 'react-native'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { cartesZelda, trouverCarte } from '../src/donnees/cartes'
import { categorieCarte, combos } from '../src/donnees/combat'
import { useJoueur } from '../src/donnees/JoueurContexte'
import { couleurs } from '../src/theme'
import styles from '../src/ecrans/Deck.styles'
import FondJeu from '../src/composants/FondJeu'

const TAILLE_DECK = 5

// Petite carte cliquable, avec un badge si elle est choisie
function CarteChoix({ numero, choisie, badge, quandOnAppuie }) {
  return (
    <Pressable style={[styles.case, !choisie && styles.caseNonChoisie]} onPress={quandOnAppuie}>
      <View style={[styles.cadre, choisie && styles.cadreChoisi]}>
        <Image source={trouverCarte(numero).image} style={styles.image} />
      </View>
      {choisie && (
        <View style={styles.badge}>
          <Text style={styles.texteBadge}>{badge}</Text>
        </View>
      )}
    </Pressable>
  )
}

export default function EcranDeck() {
  const marges = useSafeAreaInsets()
  const { cartesPossedees, deckDeCombat, setDeck } = useJoueur()
  const deckActuel = deckDeCombat()

  const [combattants, setCombattants] = useState(deckActuel ? deckActuel.combattants : [])
  const [supporter, setSupporter] = useState(deckActuel ? deckActuel.supporter : null)
  const [objet, setObjet] = useState(deckActuel ? deckActuel.objet : null)

  const possedees = cartesZelda.filter((carte) => cartesPossedees.includes(carte.numero))
  const combattantsPossedes = possedees.filter((carte) => categorieCarte(carte.numero) === 'combattant')
  const supportersPossedes = possedees.filter((carte) => categorieCarte(carte.numero) === 'supporter')
  const objetsPossedes = possedees.filter((carte) => categorieCarte(carte.numero) === 'objet')

  const deckComplet = combattants.length === TAILLE_DECK && supporter !== null && objet !== null

  // Ajoute ou retire un combattant (5 maximum)
  function basculerCombattant(numero) {
    if (combattants.includes(numero)) {
      setCombattants(combattants.filter((element) => element !== numero))
    } else if (combattants.length < TAILLE_DECK) {
      setCombattants([...combattants, numero])
    }
  }

  // Combos que ce deck permet (pour montrer au joueur ce qu'il débloque)
  const combosDuDeck = combos.filter((combo) => {
    const groupesOk = combo.groupes.every((groupe) => groupe.some((numero) => combattants.includes(numero)))
    const supporterOk = !combo.supporter || combo.supporter === supporter
    const objetOk = !combo.objet || combo.objet === objet
    return groupesOk && supporterOk && objetOk
  })

  function enregistrer() {
    setDeck({ combattants, supporter, objet })
    router.back()
  }

  return (
    <FondJeu>
      <View style={[styles.ecran, { paddingTop: marges.top + 8 }]}>
        <View style={styles.entete}>
          <Pressable style={styles.boutonRetour} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color={couleurs.texte} />
          </Pressable>
          <Text style={styles.titre}>Mon deck</Text>
          <View style={styles.boutonRetour} />
        </View>

        <ScrollView contentContainerStyle={styles.contenu} showsVerticalScrollIndicator={false}>
          <Text style={styles.titreSection}>
            Combattants <Text style={styles.compteur}>{combattants.length} / {TAILLE_DECK}</Text>
          </Text>
          <Text style={styles.aide}>Le n°1 commence le combat. Touche une carte pour l'ajouter ou la retirer.</Text>
          <View style={styles.grille}>
            {combattantsPossedes.map((carte) => (
              <CarteChoix
                key={carte.numero}
                numero={carte.numero}
                choisie={combattants.includes(carte.numero)}
                badge={combattants.indexOf(carte.numero) + 1}
                quandOnAppuie={() => basculerCombattant(carte.numero)}
              />
            ))}
          </View>

          <Text style={styles.titreSection}>Supporter</Text>
          <View style={styles.grille}>
            {supportersPossedes.map((carte) => (
              <CarteChoix
                key={carte.numero}
                numero={carte.numero}
                choisie={supporter === carte.numero}
                badge="✓"
                quandOnAppuie={() => setSupporter(carte.numero)}
              />
            ))}
          </View>

          <Text style={styles.titreSection}>Objet</Text>
          <View style={styles.grille}>
            {objetsPossedes.map((carte) => (
              <CarteChoix
                key={carte.numero}
                numero={carte.numero}
                choisie={objet === carte.numero}
                badge="✓"
                quandOnAppuie={() => setObjet(carte.numero)}
              />
            ))}
          </View>

          <Text style={styles.titreSection}>Ultimes de ce deck</Text>
          {combosDuDeck.length === 0 ? (
            <Text style={styles.aide}>Aucun combo. Réunis par exemple Link + Zelda, ou les 4 Prodiges.</Text>
          ) : (
            combosDuDeck.map((combo) => (
              <View key={combo.id} style={styles.ligneCombo}>
                <Ionicons name="flash" size={16} color={couleurs.ticket} />
                <Text style={styles.texteCombo}>
                  {combo.nom} — {combo.ultime} ({combo.cout} Énergie)
                </Text>
              </View>
            ))
          )}
        </ScrollView>

        <View style={[styles.pied, { paddingBottom: marges.bottom + 16 }]}>
          <Pressable style={[styles.boutonEnregistrer, !deckComplet && styles.boutonDesactive]} onPress={enregistrer} disabled={!deckComplet}>
            <Text style={styles.texteEnregistrer}>{deckComplet ? 'Enregistrer le deck' : 'Deck incomplet'}</Text>
          </Pressable>
        </View>
      </View>
    </FondJeu>
  )
}
