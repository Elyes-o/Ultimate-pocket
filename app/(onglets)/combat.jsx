// Onglet Combat : le deck du joueur et la liste des bots à affronter.
// Les niveaux se débloquent l'un après l'autre (battre le précédent).
// En haut : le tutoriel guidé (proposé dans une fenêtre à la 1re visite, rejouable ensuite).
import { ScrollView, View, Text, Image, Pressable, Modal } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import IconeEclat from '../../src/composants/IconeEclat'
import { trouverCarte } from '../../src/donnees/cartes'
import { niveauxBot } from '../../src/donnees/combat'
import { bossGanondorf } from '../../src/donnees/boss'
import { useJoueur } from '../../src/donnees/JoueurContexte'
import { couleurs } from '../../src/theme'
import styles from '../../src/ecrans/Combat.styles'
import EcranOnglet from '../../src/composants/EcranOnglet'

function MiniCarte({ numero }) {
  return (
    <View style={styles.miniCarte}>
      <Image source={trouverCarte(numero).image} style={styles.imagePleine} />
    </View>
  )
}

export default function EcranCombat() {
  const { deckDeCombat, statistiques, tutoriel, marquerTutorielPropose, donneesChargees } = useJoueur()
  const deck = deckDeCombat()
  // 1re visite : on propose le tutoriel (une seule fois)
  const proposerTutoriel = donneesChargees && !tutoriel.propose && !tutoriel.termine

  function lancerTutoriel() {
    marquerTutorielPropose()
    router.push('/partie?niveau=tutoriel')
  }

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
    <EcranOnglet>
      <ScrollView contentContainerStyle={styles.contenu} showsVerticalScrollIndicator={false}>
        {/* Tutoriel */}
        <Pressable style={[styles.carteTutoriel, tutoriel.termine && styles.carteTutorielFaite]} onPress={lancerTutoriel}>
          <View style={styles.portraitImpa}>
            <Image source={trouverCarte(4).image} style={styles.imageImpa} />
          </View>
          <View style={styles.infosNiveau}>
            <Text style={[styles.nomTutoriel, tutoriel.termine && styles.nomTutorielFait]}>
              {tutoriel.termine ? 'Revoir le tutoriel' : 'Apprends à combattre'}
            </Text>
            <Text style={[styles.detailTutoriel, tutoriel.termine && styles.detailTutorielFait]}>
              {tutoriel.termine ? 'Un combat guidé avec Impa' : 'Un combat guidé avec Impa, booster offert'}
            </Text>
          </View>
          <Ionicons
            name={tutoriel.termine ? 'refresh-circle' : 'school'}
            size={30}
            color={tutoriel.termine ? couleurs.principale : couleurs.texteInverse}
          />
        </Pressable>

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

        {/* Boss : Ganondorf, débloqué après le bot Difficile */}
        <CarteBoss
          debloque={statistiques.niveauxBattus.includes(bossGanondorf.niveauRequis)}
          deckPret={deck !== null}
          dejaBattu={statistiques.bossBattu}
        />

        {/* Bots */}
        <View style={styles.ligneTitre}>
          <Text style={styles.titreSection}>Contre le bot</Text>
          <Text style={styles.statistiques}>
            {statistiques.victoires} V, {statistiques.defaites} D
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
                <Text style={styles.styleNiveau}>{niveau.style}</Text>
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

        {/* Proposition du tutoriel à la 1re visite */}
        <Modal visible={proposerTutoriel} transparent animationType="fade" onRequestClose={marquerTutorielPropose}>
          <View style={styles.fondModal}>
            <View style={styles.feuille}>
              <View style={[styles.portraitImpa, styles.grandPortrait]}>
                <Image source={trouverCarte(4).image} style={[styles.imageImpa, styles.grandeImageImpa]} />
              </View>
              <Text style={styles.titreFeuille}>Nouveau au combat ?</Text>
              <Text style={styles.texteFeuille}>
                Impa t'apprend les bases en un court combat guidé. Termine-le pour gagner un booster Hyrule.
              </Text>
              <Pressable style={styles.boutonPrincipal} onPress={lancerTutoriel}>
                <Text style={styles.texteBoutonPrincipal}>Commencer le tutoriel</Text>
              </Pressable>
              <Pressable style={styles.boutonAnnuler} onPress={marquerTutorielPropose}>
                <Text style={styles.texteAnnuler}>Plus tard</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </EcranOnglet>
  )
}

// Carte du boss Ganondorf (sombre, avec sa carte en fond)
function CarteBoss({ debloque, deckPret, dejaBattu }) {
  const jouable = debloque && deckPret
  return (
    <Pressable
      style={[styles.carteBoss, !jouable && styles.carteBossVerrouillee]}
      onPress={() => router.push('/partie?niveau=boss')}
      disabled={!jouable}
      accessibilityLabel={jouable ? 'Affronter le boss Ganondorf' : 'Boss Ganondorf verrouillé'}
    >
      <Image source={trouverCarte(bossGanondorf.numero).image} style={styles.imageBoss} />
      <View style={styles.infosBoss}>
        <Text style={styles.surtitreBoss}>Boss</Text>
        <Text style={styles.nomBoss}>{bossGanondorf.nom}</Text>
        <Text style={styles.detailBoss}>
          {debloque
            ? bossGanondorf.pv + ' PV, 2 phases. ' + (dejaBattu ? '+' + bossGanondorf.eclatsVictoireDuJour + ' Éclats par jour' : 'Booster offert à la 1re victoire')
            : 'Bats le bot Difficile pour le débloquer'}
        </Text>
      </View>
      <Ionicons name={jouable ? 'skull' : 'lock-closed'} size={28} color={jouable ? '#FF8A7A' : 'rgba(255,255,255,0.5)'} />
    </Pressable>
  )
}

// Une couleur par niveau, du vert (facile) au violet (ultime)
const couleursNiveaux = ['#22B573', '#1FB6E6', '#F5A524', '#E2483D', '#5B4CF5']
