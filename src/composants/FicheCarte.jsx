// Fiche complète d'une carte possédée (s'ouvre depuis la Collection).
// En haut : la carte en grand, qu'on incline du doigt (reflet brillant sur les cartes 3★ et 4★).
// En dessous : fiche de combat, combos où elle joue, exemplaires et recyclage d'un doublon.
import { useRef } from 'react'
import { View, Text, Image, Pressable, Modal, ScrollView, Animated, PanResponder, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import IconeEclat from './IconeEclat'
import { trouverCarte } from '../donnees/cartes'
import {
  fichesCombattants, fichesSupporters, fichesObjets, combos, nomsTypes, couleursTypes,
  texteEffets, texteUltime, categorieCarte,
} from '../donnees/combat'
import { VALEUR_RECYCLAGE } from '../donnees/collection'
import { useJoueur } from '../donnees/JoueurContexte'
import { useEffetsSonores } from '../sons'
import { couleurs } from '../theme'
import styles, { LARGEUR_CARTE } from './FicheCarte.styles'

const ANIMATION_NATIVE = Platform.OS !== 'web'
const INCLINAISON_MAX = 16 // degrés

const nomsCategories = { combattant: 'Combattant', supporter: 'Supporter', objet: 'Objet' }

// Les combos dans lesquels la carte joue un rôle
function combosDeLaCarte(numero) {
  return combos.filter(
    (combo) => combo.groupes.some((groupe) => groupe.includes(numero)) || combo.supporter === numero || combo.objet === numero
  )
}

// Les autres cartes nécessaires au combo (une par groupe, + supporter / objet)
function partenairesDuCombo(combo, numero) {
  const partenaires = combo.groupes.filter((groupe) => !groupe.includes(numero)).map((groupe) => groupe[0])
  if (combo.supporter && combo.supporter !== numero) partenaires.push(combo.supporter)
  if (combo.objet && combo.objet !== numero) partenaires.push(combo.objet)
  return partenaires
}

// Petites pastilles d'Énergie pour le coût d'une attaque
function CoutEnergie({ cout }) {
  return (
    <View style={styles.cout}>
      {Array.from({ length: cout }).map((_, index) => (
        <View key={index} style={styles.pastilleEnergie}>
          <Ionicons name="flash" size={10} color={couleurs.texteInverse} />
        </View>
      ))}
    </View>
  )
}

// La carte en grand, qui s'incline sous le doigt (ou la souris sur le web)
function CarteInclinable({ carte }) {
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
  const brillante = carte.rarete >= 3

  const gestes = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, geste) => position.setValue({ x: geste.dx, y: geste.dy }),
      onPanResponderRelease: () =>
        Animated.spring(position, { toValue: { x: 0, y: 0 }, friction: 5, useNativeDriver: ANIMATION_NATIVE }).start(),
      onPanResponderTerminate: () =>
        Animated.spring(position, { toValue: { x: 0, y: 0 }, friction: 5, useNativeDriver: ANIMATION_NATIVE }).start(),
    })
  ).current

  const rotationY = position.x.interpolate({
    inputRange: [-150, 150],
    outputRange: [-INCLINAISON_MAX + 'deg', INCLINAISON_MAX + 'deg'],
    extrapolate: 'clamp',
  })
  const rotationX = position.y.interpolate({
    inputRange: [-150, 150],
    outputRange: [INCLINAISON_MAX + 'deg', -INCLINAISON_MAX + 'deg'],
    extrapolate: 'clamp',
  })
  // Le reflet glisse à l'opposé du doigt, comme une vraie carte holographique
  const decalageReflet = position.x.interpolate({
    inputRange: [-150, 150],
    outputRange: [LARGEUR_CARTE * 0.6, -LARGEUR_CARTE * 0.6],
    extrapolate: 'clamp',
  })

  return (
    <View style={styles.zoneCarte} {...gestes.panHandlers}>
      <Animated.View
        style={[
          styles.carte,
          carte.rarete === 4 && styles.carteUltraRare,
          carte.rarete === 3 && styles.carteRare,
          { transform: [{ perspective: 800 }, { rotateX: rotationX }, { rotateY: rotationY }] },
        ]}
      >
        <Image source={carte.image} style={styles.image} />
        {brillante && (
          <Animated.View pointerEvents="none" style={[styles.reflet, { transform: [{ translateX: decalageReflet }, { rotate: '20deg' }] }]}>
            <LinearGradient
              colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.45)', 'rgba(255,255,255,0)']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.degradeReflet}
            />
          </Animated.View>
        )}
      </Animated.View>
      <Text style={styles.indication}>Fais glisser pour incliner la carte</Text>
    </View>
  )
}

function FicheCombattant({ fiche }) {
  return (
    <View style={styles.bloc}>
      <View style={styles.ligneInfos}>
        <View style={styles.info}>
          <Text style={styles.libelleInfo}>Type</Text>
          <View style={[styles.pastilleType, { backgroundColor: couleursTypes[fiche.type] }]}>
            <Text style={styles.texteType}>{nomsTypes[fiche.type]}</Text>
          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.libelleInfo}>PV</Text>
          <Text style={styles.valeurInfo}>{fiche.pv}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.libelleInfo}>Faiblesse</Text>
          <View style={[styles.pastilleType, { backgroundColor: couleursTypes[fiche.faiblesse] }]}>
            <Text style={styles.texteType}>{nomsTypes[fiche.faiblesse]}</Text>
          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.libelleInfo}>Retraite</Text>
          <CoutEnergie cout={fiche.retraite} />
        </View>
      </View>

      {fiche.talent && (
        <View style={styles.talent}>
          <Text style={styles.nomTalent}>Talent · {fiche.talent.nom}</Text>
          <Text style={styles.texteTalent}>{fiche.talent.texte}</Text>
        </View>
      )}

      {fiche.attaques.map((attaque) => (
        <View key={attaque.nom} style={styles.attaque}>
          <CoutEnergie cout={attaque.cout} />
          <View style={styles.texteAttaque}>
            <Text style={styles.nomAttaque}>{attaque.nom}</Text>
            {attaque.effets && <Text style={styles.effetsAttaque}>{texteEffets(attaque.effets)}</Text>}
          </View>
          <Text style={styles.degats}>{attaque.degats}</Text>
        </View>
      ))}
    </View>
  )
}

export default function FicheCarte({ numero, quandOnFerme }) {
  const marges = useSafeAreaInsets()
  const { nombreExemplaires, possedeCarte, recyclerDoublons, statistiques } = useJoueur()
  const { jouerSon, vibrer } = useEffetsSonores()

  const carte = numero !== null ? trouverCarte(numero) : null
  if (!carte) {
    return null
  }

  const categorie = categorieCarte(carte.numero)
  const exemplaires = nombreExemplaires(carte.numero)
  const doublons = Math.max(0, exemplaires - 1)
  const combatsJoues = statistiques.cartesJouees[carte.numero] ?? 0
  const combosCarte = combosDeLaCarte(carte.numero)
  const effetSoutien = categorie === 'supporter' ? fichesSupporters[carte.numero] : fichesObjets[carte.numero]

  function recyclerUnDoublon() {
    if (recyclerDoublons(carte.numero) > 0) {
      jouerSon('recompense')
      vibrer('succes')
    }
  }

  return (
    <Modal visible animationType="slide" onRequestClose={quandOnFerme}>
      <View style={[styles.ecran, { paddingTop: marges.top + 8 }]}>
        <View style={styles.entete}>
          <View style={styles.boutonRond} />
          <Text style={styles.numero}>N° {String(carte.numero).padStart(3, '0')}</Text>
          <Pressable style={styles.boutonRond} onPress={quandOnFerme} accessibilityLabel="Fermer la fiche">
            <Ionicons name="close" size={22} color={couleurs.texteInverse} />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={[styles.contenu, { paddingBottom: marges.bottom + 32 }]} showsVerticalScrollIndicator={false}>
          <CarteInclinable carte={carte} />

          <Text style={styles.nom}>{carte.nom}</Text>
          <View style={styles.ligneSousTitre}>
            <View style={styles.etoiles}>
              {Array.from({ length: carte.rarete }).map((_, index) => (
                <Ionicons key={index} name="star" size={14} color={couleurs.etoile} />
              ))}
            </View>
            <Text style={styles.point}>·</Text>
            <Text style={styles.categorie}>{nomsCategories[categorie]}</Text>
          </View>

          {/* Exemplaires, combats joués, recyclage */}
          <View style={styles.ligneCompteurs}>
            <View style={styles.compteur}>
              <Text style={styles.valeurCompteur}>×{exemplaires}</Text>
              <Text style={styles.libelleCompteur}>{exemplaires > 1 ? 'exemplaires' : 'exemplaire'}</Text>
            </View>
            <View style={styles.compteur}>
              <Text style={styles.valeurCompteur}>{combatsJoues}</Text>
              <Text style={styles.libelleCompteur}>{combatsJoues > 1 ? 'combats joués' : 'combat joué'}</Text>
            </View>
          </View>
          {doublons > 0 && (
            <Pressable style={styles.boutonRecycler} onPress={recyclerUnDoublon}>
              <Ionicons name="sync" size={18} color={couleurs.texteInverse} />
              <Text style={styles.texteBoutonRecycler}>Recycler 1 doublon · +{VALEUR_RECYCLAGE[carte.rarete]}</Text>
              <IconeEclat taille={16} />
            </Pressable>
          )}

          {/* Fiche de combat */}
          <Text style={styles.titreSection}>En combat</Text>
          {categorie === 'combattant' ? (
            <FicheCombattant fiche={fichesCombattants[carte.numero]} />
          ) : (
            <View style={styles.bloc}>
              <Text style={styles.libelleInfo}>Effet</Text>
              <Text style={styles.texteEffet}>{effetSoutien.texte}</Text>
              <Text style={styles.noteEffet}>
                {categorie === 'supporter' ? '1 Supporter par deck, jouable une fois par combat.' : '1 Objet par deck, jouable une fois par combat.'}
              </Text>
            </View>
          )}

          {/* Combos */}
          {combosCarte.length > 0 && (
            <>
              <Text style={styles.titreSection}>Ultimes en combo</Text>
              {combosCarte.map((combo) => (
                <View key={combo.id} style={styles.combo}>
                  <View style={styles.enteteCombo}>
                    <Text style={styles.nomCombo}>{combo.nom}</Text>
                    <View style={styles.coutCombo}>
                      <Ionicons name="flash" size={12} color={couleurs.ticket} />
                      <Text style={styles.texteCoutCombo}>{combo.cout}</Text>
                    </View>
                  </View>
                  <Text style={styles.ultime}>{combo.ultime}</Text>
                  <Text style={styles.effetsCombo}>{texteUltime(combo)}</Text>
                  <View style={styles.partenaires}>
                    <Text style={styles.libellePartenaires}>Avec</Text>
                    {partenairesDuCombo(combo, carte.numero).map((partenaire) => {
                      const cartePartenaire = trouverCarte(partenaire)
                      const possedee = possedeCarte(partenaire)
                      return (
                        <View key={partenaire} style={styles.partenaire}>
                          {possedee ? (
                            <Image source={cartePartenaire.image} style={styles.miniCarte} />
                          ) : (
                            <View style={[styles.miniCarte, styles.miniSilhouette]}>
                              <Ionicons name="help" size={14} color="#A9B0C3" />
                            </View>
                          )}
                          <Text style={styles.nomPartenaire} numberOfLines={1}>
                            {possedee ? cartePartenaire.nom : '???'}
                          </Text>
                        </View>
                      )
                    })}
                  </View>
                </View>
              ))}
            </>
          )}
        </ScrollView>
      </View>
    </Modal>
  )
}
