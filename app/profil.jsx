// Page Profil (ouverte depuis l'avatar du bandeau) :
// avatar et pseudo modifiables, statistiques, niveaux battus, meilleure carte, carte favorite, paramètres.
import { useState } from 'react'
import { View, Text, Image, Pressable, ScrollView, TextInput, Switch, Modal } from 'react-native'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import AvatarJoueur from '../src/composants/AvatarJoueur'
import { useJoueur, LONGUEUR_MAX_PSEUDO } from '../src/donnees/JoueurContexte'
import { cartesZelda, trouverCarte } from '../src/donnees/cartes'
import { fichesCombattants, niveauxBot } from '../src/donnees/combat'
import { couleurs } from '../src/theme'
import styles from '../src/ecrans/Profil.styles'

// Une couleur par niveau de bot (les mêmes que dans l'onglet Combat)
const couleursNiveaux = ['#22B573', '#1FB6E6', '#F5A524', '#E2483D', '#5B4CF5']

// Petite carte avec un titre au-dessus (meilleure carte, carte favorite)
function CarteMiseEnAvant({ titre, numero, detail, vide }) {
  return (
    <View style={styles.carteMiseEnAvant}>
      <Text style={styles.titreMiseEnAvant}>{titre}</Text>
      {numero ? (
        <>
          <View style={styles.cadreCarte}>
            <Image source={trouverCarte(numero).image} style={styles.imagePleine} />
          </View>
          <Text style={styles.nomCarte}>{trouverCarte(numero).nom}</Text>
          <Text style={styles.detailCarte}>{detail}</Text>
        </>
      ) : (
        <Text style={styles.texteVide}>{vide}</Text>
      )}
    </View>
  )
}

export default function EcranProfil() {
  const marges = useSafeAreaInsets()
  const {
    pseudo, changerPseudo, avatar, setAvatar, cartesPossedees, statistiques,
    parametres, changerParametre, recommencerPartie,
  } = useJoueur()

  const [pseudoEnEdition, setPseudoEnEdition] = useState(null) // texte en cours de saisie (null = pas en édition)
  const [choixAvatar, setChoixAvatar] = useState(false)
  const [confirmationRecommencer, setConfirmationRecommencer] = useState(false)

  const cartesDuJoueur = cartesZelda.filter((carte) => cartesPossedees.includes(carte.numero))
  const totalCombats = statistiques.victoires + statistiques.defaites
  const pourcentage = totalCombats > 0 ? Math.round((statistiques.victoires / totalCombats) * 100) : 0

  // Meilleure carte : la plus rare, puis celle qui a le plus de PV
  let meilleureCarte = null
  for (const carte of cartesDuJoueur) {
    const pv = fichesCombattants[carte.numero] ? fichesCombattants[carte.numero].pv : 0
    const pvMeilleure = meilleureCarte && fichesCombattants[meilleureCarte.numero] ? fichesCombattants[meilleureCarte.numero].pv : 0
    if (!meilleureCarte || carte.rarete > meilleureCarte.rarete || (carte.rarete === meilleureCarte.rarete && pv > pvMeilleure)) {
      meilleureCarte = carte
    }
  }

  // Carte favorite : celle qui a été jouée dans le plus de combats
  let carteFavorite = null
  let combatsFavorite = 0
  for (const [numero, nombre] of Object.entries(statistiques.cartesJouees)) {
    if (nombre > combatsFavorite) {
      carteFavorite = Number(numero)
      combatsFavorite = nombre
    }
  }

  function validerPseudo() {
    changerPseudo(pseudoEnEdition)
    setPseudoEnEdition(null)
  }

  function confirmerRecommencer() {
    setConfirmationRecommencer(false)
    recommencerPartie()
    router.replace('/accueil')
  }

  return (
    <View style={[styles.ecran, { paddingTop: marges.top + 8 }]}>
      <View style={styles.entete}>
        <Pressable style={styles.boutonRond} onPress={() => router.back()} accessibilityLabel="Retour">
          <Ionicons name="chevron-back" size={22} color={couleurs.texte} />
        </Pressable>
        <Text style={styles.titre}>Profil</Text>
        <View style={styles.boutonRond} />
      </View>

      <ScrollView contentContainerStyle={[styles.contenu, { paddingBottom: marges.bottom + 32 }]} showsVerticalScrollIndicator={false}>
        {/* Avatar et pseudo */}
        <View style={styles.carteIdentite}>
          <Pressable onPress={() => setChoixAvatar(true)} accessibilityLabel="Changer d'avatar">
            <AvatarJoueur taille={96} />
            <View style={styles.pastilleModifier}>
              <Ionicons name="camera" size={14} color={couleurs.texteInverse} />
            </View>
          </Pressable>

          {pseudoEnEdition === null ? (
            <Pressable style={styles.lignePseudo} onPress={() => setPseudoEnEdition(pseudo)}>
              <Text style={styles.pseudo}>{pseudo}</Text>
              <Ionicons name="pencil" size={16} color={couleurs.texteSecondaire} />
            </Pressable>
          ) : (
            <View style={styles.lignePseudo}>
              <TextInput
                style={styles.champPseudo}
                value={pseudoEnEdition}
                onChangeText={setPseudoEnEdition}
                maxLength={LONGUEUR_MAX_PSEUDO}
                autoFocus
                onSubmitEditing={validerPseudo}
                returnKeyType="done"
              />
              <Pressable style={styles.boutonValider} onPress={validerPseudo} accessibilityLabel="Valider le pseudo">
                <Ionicons name="checkmark" size={18} color={couleurs.texteInverse} />
              </Pressable>
            </View>
          )}
          <Text style={styles.sousTitre}>
            {cartesDuJoueur.length} / {cartesZelda.length} cartes collectionnées
          </Text>
        </View>

        {/* Statistiques */}
        <View style={styles.grilleStats}>
          <View style={styles.stat}>
            <Text style={styles.valeurStat}>{statistiques.victoires}</Text>
            <Text style={styles.libelleStat}>Victoires</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.valeurStat}>{statistiques.defaites}</Text>
            <Text style={styles.libelleStat}>Défaites</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.valeurStat}>{pourcentage} %</Text>
            <Text style={styles.libelleStat}>Taux de victoire</Text>
          </View>
        </View>

        {/* Niveaux de bot battus */}
        <Text style={styles.titreSection}>Bots battus</Text>
        <View style={styles.ligneNiveaux}>
          {niveauxBot.map((niveau, index) => {
            const battu = statistiques.niveauxBattus.includes(niveau.id)
            return (
              <View key={niveau.id} style={styles.niveau}>
                <View style={[styles.medaille, { backgroundColor: battu ? couleursNiveaux[index] : couleurs.surfaceDouce }]}>
                  <Ionicons name={battu ? 'trophy' : 'lock-closed'} size={18} color={battu ? '#FFFFFF' : '#A9B0C3'} />
                </View>
                <Text style={[styles.nomNiveau, !battu && styles.nomNiveauVerrouille]}>{niveau.nom}</Text>
              </View>
            )
          })}
        </View>

        {/* Meilleure carte et carte favorite */}
        <View style={styles.ligneCartes}>
          <CarteMiseEnAvant
            titre="Meilleure carte"
            numero={meilleureCarte ? meilleureCarte.numero : null}
            detail={meilleureCarte ? '★'.repeat(meilleureCarte.rarete) : ''}
            vide="Aucune carte"
          />
          <CarteMiseEnAvant
            titre="Carte favorite"
            numero={carteFavorite}
            detail={combatsFavorite + (combatsFavorite > 1 ? ' combats' : ' combat')}
            vide="Joue un combat pour la découvrir"
          />
        </View>

        {/* Paramètres */}
        <Text style={styles.titreSection}>Paramètres</Text>
        <View style={styles.listeParametres}>
          <View style={styles.ligneParametre}>
            <Ionicons name="volume-high-outline" size={20} color={couleurs.texte} />
            <Text style={styles.texteParametre}>Son</Text>
            <Switch value={parametres.son} onValueChange={(valeur) => changerParametre('son', valeur)} trackColor={{ true: couleurs.principale }} />
          </View>
          <View style={styles.ligneParametre}>
            <Ionicons name="phone-portrait-outline" size={20} color={couleurs.texte} />
            <Text style={styles.texteParametre}>Vibrations</Text>
            <Switch value={parametres.vibrations} onValueChange={(valeur) => changerParametre('vibrations', valeur)} trackColor={{ true: couleurs.principale }} />
          </View>
          <View style={styles.ligneParametre}>
            <Ionicons name="language-outline" size={20} color={couleurs.texte} />
            <Text style={styles.texteParametre}>Langue</Text>
            <Text style={styles.valeurParametre}>Français</Text>
          </View>
          <Pressable style={styles.ligneParametre} onPress={() => router.replace('/connexion')}>
            <Ionicons name="log-out-outline" size={20} color={couleurs.texte} />
            <Text style={styles.texteParametre}>Se déconnecter</Text>
            <Ionicons name="chevron-forward" size={18} color={couleurs.texteSecondaire} />
          </Pressable>
          <Pressable style={[styles.ligneParametre, styles.derniereLigne]} onPress={() => setConfirmationRecommencer(true)}>
            <Ionicons name="refresh" size={20} color="#E2483D" />
            <Text style={[styles.texteParametre, styles.texteDanger]}>Recommencer la partie</Text>
          </Pressable>
        </View>
        <Text style={styles.mention}>Son et vibrations : réglages enregistrés, effets sonores à venir.</Text>
      </ScrollView>

      {/* Choix de l'avatar */}
      <Modal visible={choixAvatar} transparent animationType="fade" onRequestClose={() => setChoixAvatar(false)}>
        <Pressable style={styles.fondModal} onPress={() => setChoixAvatar(false)}>
          <Pressable style={styles.feuille} onPress={() => {}}>
            <Text style={styles.titreFeuille}>Choisis ton avatar</Text>
            <ScrollView contentContainerStyle={styles.grilleAvatars}>
              <Pressable onPress={() => { setAvatar(null); setChoixAvatar(false) }} style={[styles.choixAvatar, avatar === null && styles.choixAvatarActif]}>
                <AvatarJoueur taille={58} numero={null} />
              </Pressable>
              {cartesDuJoueur.map((carte) => (
                <Pressable
                  key={carte.numero}
                  onPress={() => { setAvatar(carte.numero); setChoixAvatar(false) }}
                  style={[styles.choixAvatar, avatar === carte.numero && styles.choixAvatarActif]}
                >
                  <AvatarJoueur taille={58} numero={carte.numero} />
                </Pressable>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Confirmation avant de tout effacer */}
      <Modal visible={confirmationRecommencer} transparent animationType="fade" onRequestClose={() => setConfirmationRecommencer(false)}>
        <View style={styles.fondModal}>
          <View style={styles.feuille}>
            <Ionicons name="warning" size={40} color="#E2483D" />
            <Text style={styles.titreFeuille}>Recommencer la partie ?</Text>
            <Text style={styles.texteConfirmation}>
              Tes cartes, Éclats, Tickets, deck et statistiques seront effacés. Impossible de revenir en arrière.
            </Text>
            <Pressable style={styles.boutonDanger} onPress={confirmerRecommencer}>
              <Text style={styles.texteBoutonDanger}>Tout effacer et recommencer</Text>
            </Pressable>
            <Pressable style={styles.boutonAnnuler} onPress={() => setConfirmationRecommencer(false)}>
              <Text style={styles.texteAnnuler}>Annuler</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}
