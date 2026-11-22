// Menu de la carte active du joueur (comme dans Pokémon TCG Pocket) :
// on touche sa carte en combat → elle s'affiche EN GRAND au centre, plateau assombri derrière,
// avec ses attaques en barres juste en dessous, son Talent, et un petit bouton Retraite à droite.
// Toucher une attaque frappe tout de suite ; « Retraite » ouvre le choix du remplaçant.
import { useEffect, useRef, useState } from 'react'
import { View, Text, Image, Pressable, Modal, Animated, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import JaugeEnergie from './JaugeEnergie'
import { trouverCarte } from '../donnees/cartes'
import { texteEffets } from '../donnees/combat'
import { couleurs } from '../theme'
import styles from './MenuCarteActive.styles'

// "cible" : élément mis en avant par le tutoriel (null = rien d'imposé).
// "autorise(nom)" : le tutoriel dit si un élément est utilisable.
export default function MenuCarteActive({
  visible, combattant, energie, possibles, quandAttaque, quandTalent, quandRetraite, quandFerme,
  cible = null, autorise = () => true,
}) {
  const [apercu, setApercu] = useState(0)
  const zoom = useRef(new Animated.Value(0)).current

  // À l'ouverture, la carte « s'approche » (petit zoom)
  useEffect(() => {
    if (visible) {
      zoom.setValue(0)
      Animated.spring(zoom, { toValue: 1, friction: 7, tension: 80, useNativeDriver: Platform.OS !== 'web' }).start()
    }
  }, [visible])

  if (!combattant) {
    return null
  }
  const carte = trouverCarte(combattant.numero)
  const pourcentagePv = (combattant.pv / combattant.pvMax) * 100

  // Pourquoi une attaque est grisée
  function raison(attaque) {
    if (combattant.fatigueActive) return 'Fatigué : ne peut pas attaquer ce tour'
    if (energie < attaque.cout) return 'Il manque ' + (attaque.cout - energie) + ' ⚡'
    return null
  }

  const retraitePossible = possibles.peutChanger && autorise('retraite')
  const raisonRetraite = combattant.bloque
    ? 'Bloqué ce tour'
    : possibles.coutRetraite > energie
      ? 'Il manque ' + (possibles.coutRetraite - energie) + ' ⚡'
      : null

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={quandFerme}>
      {/* Le plateau s'assombrit ; toucher à côté de la carte referme */}
      <Pressable style={styles.fond} onPress={quandFerme}>
        <Pressable style={styles.boutonFermer} onPress={quandFerme} accessibilityLabel="Fermer">
          <Ionicons name="close" size={22} color={couleurs.texteInverse} />
        </Pressable>

        <Animated.View style={[styles.colonne, { opacity: zoom, transform: [{ scale: zoom.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] }) }] }]}>
          <Pressable onPress={() => {}} style={styles.colonne}>
            <View style={styles.jauge}>
              <JaugeEnergie energie={energie} apercu={apercu} />
            </View>

            {/* La carte en grand, avec ses PV actuels */}
            <View style={styles.zoneCarte}>
              <View style={styles.cadreCarte}>
                <Image source={carte.image} style={styles.image} />
              </View>
              <View style={styles.pastillePv}>
                <Text style={styles.textePv}>
                  {combattant.pv}
                  <Text style={styles.textePvMax}> / {combattant.pvMax} PV</Text>
                </Text>
                <View style={styles.barrePv}>
                  <View style={[styles.barrePvPleine, { width: pourcentagePv + '%' }, pourcentagePv <= 30 && styles.barrePvBasse]} />
                </View>
              </View>
            </View>

            {/* Les attaques, en grandes barres juste sous la carte (comme dans TCG Pocket) */}
            <View style={styles.panneau}>
              {possibles.attaques.map(({ index, attaque, possible }) => {
                const nomCible = 'attaque' + index
                const utilisable = possible && autorise(nomCible)
                const misEnAvant = cible === nomCible
                const explication = raison(attaque)
                return (
                  <Pressable
                    key={index}
                    style={[styles.attaque, !utilisable && styles.desactive, misEnAvant && styles.enAvant]}
                    onPress={() => {
                      setApercu(0)
                      quandAttaque(index)
                    }}
                    onPressIn={() => setApercu(attaque.cout)}
                    onPressOut={() => setApercu(0)}
                    disabled={!utilisable}
                    accessibilityLabel={'Attaque ' + attaque.nom + ', ' + attaque.cout + ' Énergie, ' + attaque.degats + ' dégâts'}
                  >
                    <View style={styles.cout}>
                      {Array.from({ length: attaque.cout }).map((_, numero) => (
                        <View key={numero} style={styles.pastilleEnergie}>
                          <Ionicons name="flash" size={10} color={couleurs.texteInverse} />
                        </View>
                      ))}
                    </View>
                    <View style={styles.texteAttaque}>
                      <Text style={styles.nomAttaque} numberOfLines={2}>
                        {attaque.nom}
                      </Text>
                      {(attaque.effets || explication) && (
                        <Text style={[styles.effets, explication && styles.raison]} numberOfLines={1}>
                          {explication ?? texteEffets(attaque.effets)}
                        </Text>
                      )}
                    </View>
                    <Text style={styles.degats}>{attaque.degats}</Text>
                  </Pressable>
                )
              })}

              {/* Talent (gratuit, ne finit pas le tour) */}
              {possibles.talent && (
                <Pressable
                  style={[styles.talent, !(possibles.talentDispo && autorise('talent')) && styles.desactive]}
                  onPress={quandTalent}
                  disabled={!(possibles.talentDispo && autorise('talent'))}
                >
                  <Ionicons name="sparkles" size={16} color={couleurs.principaleFoncee} />
                  <View style={styles.texteAttaque}>
                    <Text style={styles.nomTalent} numberOfLines={1}>
                      Talent : {possibles.talent.nom}
                    </Text>
                    <Text style={styles.effets} numberOfLines={2}>
                      {possibles.talent.texte} (gratuit)
                    </Text>
                  </View>
                </Pressable>
              )}
            </View>

            {/* Retraite : petit bouton à droite, avec son coût */}
            <Pressable
              style={[styles.retraite, !retraitePossible && styles.desactive, cible === 'retraite' && styles.enAvant]}
              onPress={quandRetraite}
              onPressIn={() => setApercu(possibles.coutRetraite)}
              onPressOut={() => setApercu(0)}
              disabled={!retraitePossible}
              accessibilityLabel={'Retraite, ' + possibles.coutRetraite + ' Énergie'}
            >
              <Ionicons name="swap-vertical" size={16} color={couleurs.principaleFoncee} />
              <Text style={styles.texteRetraite}>Retraite</Text>
              {raisonRetraite ? (
                <Text style={styles.raisonRetraite}>{raisonRetraite}</Text>
              ) : possibles.coutRetraite === 0 ? (
                <Text style={styles.raisonRetraite}>gratuite</Text>
              ) : (
                <View style={styles.cout}>
                  {Array.from({ length: possibles.coutRetraite }).map((_, numero) => (
                    <View key={numero} style={[styles.pastilleEnergie, styles.pastillePetite]}>
                      <Ionicons name="flash" size={8} color={couleurs.texteInverse} />
                    </View>
                  ))}
                </View>
              )}
            </Pressable>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  )
}
