// Écran d'ouverture d'un booster, en 3 étapes :
//   1. "paquet"     : le booster flotte, on le touche pour l'ouvrir
//   2. "revelation" : les 5 cartes apparaissent une par une (on touche pour passer à la suivante)
//   3. "resume"     : les 5 cartes d'un coup, les nouvelles sont ajoutées à la collection
import { useEffect, useRef, useState } from 'react'
import { View, Text, Image, Pressable, Animated, Easing, Platform } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import PaquetBooster from '../src/composants/PaquetBooster'
import DosCarte from '../src/composants/DosCarte'
import { useJoueur } from '../src/donnees/JoueurContexte'
import { useEffetsSonores } from '../src/sons'
import { boosters } from '../src/donnees/accueil'
import { tirerBooster } from '../src/donnees/tirage'
import { couleurs } from '../src/theme'
import styles from '../src/ecrans/Ouverture.styles'

// Sur le web, les animations "natives" ne sont pas disponibles
const ANIMATION_NATIVE = Platform.OS !== 'web'

// Texte affiché au-dessus des cartes rares
function libelleRarete(rarete) {
  if (rarete === 4) {
    return 'ULTRA RARE'
  }
  if (rarete === 3) {
    return 'RARE'
  }
  return null
}

export default function EcranOuverture() {
  const { possedeCarte, ajouterCartes } = useJoueur()
  const { jouerSon, vibrer } = useEffetsSonores()
  // Le booster à ouvrir est donné dans l'adresse : /ouverture?booster=zelda-legendaire
  const { booster: idBooster } = useLocalSearchParams()
  const booster = boosters.find((element) => element.id === idBooster) ?? boosters[0]

  // Le tirage est fait UNE seule fois, à l'arrivée sur l'écran.
  // On note aussi si chaque carte est nouvelle (pas encore possédée, et pas déjà sortie dans ce booster).
  const [cartesTirees] = useState(() => {
    const dejaVues = []
    return tirerBooster(booster.tirage).map((carte) => {
      const estNouvelle = !possedeCarte(carte.numero) && !dejaVues.includes(carte.numero)
      dejaVues.push(carte.numero)
      return { ...carte, estNouvelle }
    })
  })

  const [etape, setEtape] = useState('paquet')
  const [indexCarte, setIndexCarte] = useState(0)

  // Valeurs animées
  const flottement = useRef(new Animated.Value(0)).current
  const secousse = useRef(new Animated.Value(0)).current
  const disparitionPaquet = useRef(new Animated.Value(1)).current
  const flash = useRef(new Animated.Value(0)).current
  const apparitionCarte = useRef(new Animated.Value(0)).current
  const halo = useRef(new Animated.Value(0)).current

  // 1. Le paquet flotte doucement de haut en bas, en boucle
  useEffect(() => {
    const boucle = Animated.loop(
      Animated.sequence([
        Animated.timing(flottement, { toValue: 1, duration: 1400, easing: Easing.inOut(Easing.sin), useNativeDriver: ANIMATION_NATIVE }),
        Animated.timing(flottement, { toValue: 0, duration: 1400, easing: Easing.inOut(Easing.sin), useNativeDriver: ANIMATION_NATIVE }),
      ])
    )
    boucle.start()
    return () => boucle.stop()
  }, [])

  // Le halo des cartes rares "respire" en boucle
  useEffect(() => {
    const boucle = Animated.loop(
      Animated.sequence([
        Animated.timing(halo, { toValue: 1, duration: 900, useNativeDriver: ANIMATION_NATIVE }),
        Animated.timing(halo, { toValue: 0, duration: 900, useNativeDriver: ANIMATION_NATIVE }),
      ])
    )
    boucle.start()
    return () => boucle.stop()
  }, [])

  // Chaque nouvelle carte révélée arrive avec un petit rebond
  useEffect(() => {
    if (etape !== 'revelation') {
      return
    }
    apparitionCarte.setValue(0)
    Animated.spring(apparitionCarte, { toValue: 1, friction: 6, tension: 70, useNativeDriver: ANIMATION_NATIVE }).start()

    // Son de la carte, et scintillement + vibration pour les cartes rares (3★ et plus)
    const carte = cartesTirees[indexCarte]
    jouerSon('carte')
    if (carte.rarete >= 3) {
      setTimeout(() => jouerSon('rare'), 120)
      vibrer(carte.rarete === 4 ? 'fort' : 'moyen')
    } else {
      vibrer('leger')
    }
  }, [etape, indexCarte])

  // À l'arrivée sur le résumé, on ajoute les cartes à la collection (une seule fois)
  useEffect(() => {
    if (etape === 'resume') {
      ajouterCartes(cartesTirees.map((carte) => carte.numero))
      jouerSon('recompense')
      vibrer('succes')
    }
  }, [etape])

  // Le joueur touche le paquet : il tremble, grossit, disparaît dans un flash blanc
  function ouvrirLePaquet() {
    jouerSon('dechirure')
    vibrer('moyen')
    Animated.sequence([
      Animated.sequence([
        Animated.timing(secousse, { toValue: 1, duration: 60, useNativeDriver: ANIMATION_NATIVE }),
        Animated.timing(secousse, { toValue: -1, duration: 60, useNativeDriver: ANIMATION_NATIVE }),
        Animated.timing(secousse, { toValue: 1, duration: 60, useNativeDriver: ANIMATION_NATIVE }),
        Animated.timing(secousse, { toValue: 0, duration: 60, useNativeDriver: ANIMATION_NATIVE }),
      ]),
      Animated.parallel([
        Animated.timing(disparitionPaquet, { toValue: 0, duration: 250, useNativeDriver: ANIMATION_NATIVE }),
        Animated.timing(flash, { toValue: 1, duration: 250, useNativeDriver: ANIMATION_NATIVE }),
      ]),
    ]).start(() => {
      setEtape('revelation')
      Animated.timing(flash, { toValue: 0, duration: 400, useNativeDriver: ANIMATION_NATIVE }).start()
    })
  }

  // Le joueur touche l'écran pendant la révélation : carte suivante, ou résumé à la fin
  function carteSuivante() {
    if (indexCarte < cartesTirees.length - 1) {
      setIndexCarte(indexCarte + 1)
    } else {
      setEtape('resume')
    }
  }

  // On ferme l'écran d'ouverture, PUIS on passe à l'onglet Collection
  // (sinon on empilerait une deuxième barre d'onglets)
  function allerALaCollection() {
    router.back()
    router.navigate('/collection')
  }

  const nombreNouvelles = cartesTirees.filter((carte) => carte.estNouvelle).length

  return (
    <LinearGradient colors={['#0E1330', '#1C2457', booster.couleur]} locations={[0, 0.6, 1]} style={styles.ecran}>
      {/* Bouton fermer / passer */}
      {etape !== 'resume' && (
        <Pressable style={styles.boutonHaut} onPress={() => (etape === 'paquet' ? router.back() : setEtape('resume'))}>
          <Text style={styles.texteBoutonHaut}>{etape === 'paquet' ? 'Fermer' : 'Passer'}</Text>
        </Pressable>
      )}

      {etape === 'paquet' && (
        <Pressable style={styles.centre} onPress={ouvrirLePaquet}>
          <Animated.View
            style={{
              opacity: disparitionPaquet,
              transform: [
                { translateY: flottement.interpolate({ inputRange: [0, 1], outputRange: [0, -14] }) },
                { rotate: secousse.interpolate({ inputRange: [-1, 1], outputRange: ['-6deg', '6deg'] }) },
                { scale: disparitionPaquet.interpolate({ inputRange: [0, 1], outputRange: [1.25, 1] }) },
              ],
            }}
          >
            <PaquetBooster visuel={booster.visuel} legendaire={booster.legendaire} largeur={180} />
          </Animated.View>
          <Text style={styles.nomBooster}>{booster.nom}</Text>
          <Text style={styles.consigne}>Touche le booster pour l'ouvrir</Text>
        </Pressable>
      )}

      {etape === 'revelation' && (
        <Pressable style={styles.centre} onPress={carteSuivante}>
          <Text style={styles.compteur}>
            {indexCarte + 1} / {cartesTirees.length}
          </Text>

          <View style={styles.zoneCarte}>
            {/* Pile des cartes restantes, derrière. On dessine la plus éloignée en premier
                pour que la plus proche soit au-dessus. */}
            {cartesTirees
              .slice(indexCarte + 1)
              .map((carte, position) => position + 1)
              .reverse()
              .map((distance) => (
                <DosCarte
                  key={'dos-' + distance}
                  largeur={240}
                  style={[
                    styles.carteDansLaPile,
                    // Chaque dos de carte est un peu décalé et penché pour qu'on voie la pile
                    { transform: [{ translateX: distance * 12 }, { translateY: distance * 8 }, { rotate: distance * 4 + 'deg' }] },
                  ]}
                />
              ))}

            <CarteRevelee carte={cartesTirees[indexCarte]} apparition={apparitionCarte} halo={halo} />
          </View>

          <Text style={styles.consigne}>Touche pour continuer</Text>
        </Pressable>
      )}

      {etape === 'resume' && (
        <View style={styles.centre}>
          <Text style={styles.titreResume}>Ton booster</Text>
          <Text style={styles.sousTitreResume}>
            {nombreNouvelles > 0
              ? '+' + nombreNouvelles + (nombreNouvelles > 1 ? ' nouvelles cartes' : ' nouvelle carte') + ' dans ta collection'
              : 'Aucune nouvelle carte cette fois'}
          </Text>

          <View style={styles.grilleResume}>
            {cartesTirees.map((carte, index) => (
              <View key={index} style={styles.caseResume}>
                <View style={styles.carteResume}>
                  <Image source={carte.image} style={styles.imagePleine} />
                </View>
                {carte.estNouvelle && (
                  <View style={styles.badgeNouveau}>
                    <Text style={styles.texteBadge}>NOUVEAU</Text>
                  </View>
                )}
              </View>
            ))}
          </View>

          <Pressable style={styles.boutonPrincipal} onPress={allerALaCollection}>
            <Ionicons name="albums" size={18} color={couleurs.texteInverse} />
            <Text style={styles.texteBoutonPrincipal}>Voir la collection</Text>
          </Pressable>
          <Pressable style={styles.boutonSecondaire} onPress={() => router.back()}>
            <Text style={styles.texteBoutonSecondaire}>Retour à l'accueil</Text>
          </Pressable>
        </View>
      )}

      {/* Flash blanc au moment où le paquet s'ouvre */}
      <Animated.View pointerEvents="none" style={[styles.flash, { opacity: flash }]} />
    </LinearGradient>
  )
}

// Grande carte révélée, avec halo doré et étiquettes si elle est rare ou nouvelle
function CarteRevelee({ carte, apparition, halo }) {
  const libelle = libelleRarete(carte.rarete)

  return (
    <Animated.View
      style={[
        styles.carteRevelee,
        {
          opacity: apparition,
          transform: [
            { translateY: apparition.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) },
            { scale: apparition.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) },
          ],
        },
      ]}
    >
      {libelle && (
        <Animated.View
          style={[
            styles.halo,
            carte.rarete === 4 && styles.haloUltra,
            { opacity: halo.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0.9] }) },
          ]}
        />
      )}

      <View style={styles.cadreCarte}>
        <Image source={carte.image} style={styles.imagePleine} />
      </View>

      <View style={styles.etiquettes}>
        {libelle && (
          <View style={[styles.etiquette, styles.etiquetteRare]}>
            <Ionicons name="star" size={12} color="#5A3B00" />
            <Text style={styles.texteEtiquetteRare}>{libelle}</Text>
          </View>
        )}
        {carte.estNouvelle && (
          <View style={[styles.etiquette, styles.etiquetteNouveau]}>
            <Text style={styles.texteBadge}>NOUVEAU</Text>
          </View>
        )}
      </View>
    </Animated.View>
  )
}
