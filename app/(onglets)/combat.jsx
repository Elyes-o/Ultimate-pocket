// Onglet Combat : le deck du joueur et la liste des bots à affronter.
// Les niveaux se débloquent l'un après l'autre (battre le précédent).
import { ScrollView, View, Text, Image, Pressable } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import IconeEclat from '../../src/composants/IconeEclat'
import { trouverCarte } from '../../src/donnees/cartes'
import { niveauxBot } from '../../src/donnees/combat'
import { useJoueur } from '../../src/donnees/JoueurContexte'
import { couleurs } from '../../src/theme'
import styles from '../../src/ecrans/Combat.styles'

function MiniCarte({ numero }) {
  return (
    <View style={styles.miniCarte}>
      <Image source={trouverCarte(numero).image} style={styles.imagePleine} />
    </View>
  )
}

export default function EcranCombat() {
  const { deckDeCombat, statistiques } = useJoueur()
  const deck = deckDeCombat()

  // Un niveau est jouable s'il est codé ET que le niveau précédent a été battu
  function etatDuNiveau(index) {
    const niveau = niveauxBot[index]
    if (!niveau.disponible) {
      return 'bientot'
    }
    if (index > 0 && !statistiques.niveauxBattus.includes(niveauxBot[index - 1].id)) {
      return 'verrouille'
    }
    return 'jouable'
  }

  return (
    <ScrollView contentContainerStyle={styles.contenu} showsVerticalScrollIndicator={false}>
      {/* Mon deck */}
      <View style={styles.carteDeck}>
        <View style={styles.ligneTitre}>
          <Text style={styles.titreCarte}>Mon deck</Text>
          <Pressable style={styles.boutonModifier} onPress={() => router.push('/deck')}>
            <Ionicons name="create-outline" size={16} color={couleurs.principaleFoncee} />
            <Text style={styles.texteModifier}>Modifier</Text>
          </Pressable>
        </View>
        {deck ? (
          <View style={styles.rangeeCartes}>
            {deck.combattants.map((numero) => (
              <MiniCarte key={numero} numero={numero} />
            ))}
            <View style={styles.separateur} />
            <MiniCarte numero={deck.supporter} />
            <MiniCarte numero={deck.objet} />
          </View>
        ) : (
          <Text style={styles.aide}>Il te faut 5 combattants, 1 Supporter et 1 Objet. Ouvre des boosters !</Text>
        )}
      </View>

      {/* Bots */}
      <View style={styles.ligneTitre}>
        <Text style={styles.titreSection}>Contre le bot</Text>
        <Text style={styles.statistiques}>
          {statistiques.victoires} V · {statistiques.defaites} D
        </Text>
      </View>
      {niveauxBot.map((niveau, index) => {
        const etatNiveau = etatDuNiveau(index)
        const jouable = etatNiveau === 'jouable' && deck !== null
        return (
          <Pressable
            key={niveau.id}
            style={[styles.carteNiveau, !jouable && styles.carteNiveauGrisee]}
            onPress={() => router.push('/partie?niveau=' + niveau.id)}
            disabled={!jouable}
          >
            <View style={[styles.pastilleNiveau, { backgroundColor: couleursNiveaux[index] }]}>
              <Text style={styles.numeroNiveau}>{index + 1}</Text>
            </View>
            <View style={styles.infosNiveau}>
              <Text style={styles.nomNiveau}>Bot {niveau.nom}</Text>
              <View style={styles.ligneRecompense}>
                <IconeEclat taille={14} />
                <Text style={styles.texteRecompense}>+{niveau.recompense}</Text>
                {statistiques.niveauxBattus.includes(niveau.id) && (
                  <Ionicons name="checkmark-circle" size={16} color={couleurs.succes} />
                )}
              </View>
            </View>
            {etatNiveau === 'jouable' && <Ionicons name="play-circle" size={34} color={couleurs.principale} />}
            {etatNiveau === 'verrouille' && <Ionicons name="lock-closed" size={22} color={couleurs.texteSecondaire} />}
            {etatNiveau === 'bientot' && <Text style={styles.texteBientot}>Bientôt</Text>}
          </Pressable>
        )
      })}
    </ScrollView>
  )
}

// Une couleur par niveau, du vert (facile) au violet (ultime)
const couleursNiveaux = ['#22B573', '#1FB6E6', '#F5A524', '#E2483D', '#5B4CF5']
