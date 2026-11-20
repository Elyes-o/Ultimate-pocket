// Menu de la carte active du joueur (comme dans Pokémon TCG Pocket) :
// on touche sa carte en combat → ses attaques, son Talent et la Retraite s'affichent ici.
// Toucher une attaque frappe tout de suite ; « Retraite » ouvre le choix du remplaçant.
import { useState } from 'react'
import { View, Text, Image, Pressable, Modal } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import JaugeEnergie from './JaugeEnergie'
import { trouverCarte } from '../donnees/cartes'
import { nomsTypes, couleursTypes, texteEffets } from '../donnees/combat'
import { couleurs } from '../theme'
import styles from './MenuCarteActive.styles'

// "cible" : élément mis en avant par le tutoriel (null = rien d'imposé).
// "autorise(nom)" : le tutoriel dit si un élément est utilisable.
export default function MenuCarteActive({
  visible, combattant, energie, possibles, quandAttaque, quandTalent, quandRetraite, quandFerme,
  cible = null, autorise = () => true,
}) {
  const [apercu, setApercu] = useState(0)

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
      <Pressable style={styles.fond} onPress={quandFerme}>
        <Pressable style={styles.feuille} onPress={() => {}}>
          {/* La carte et ses infos */}
          <View style={styles.entete}>
            <Image source={carte.image} style={styles.image} />
            <View style={styles.infos}>
              <Text style={styles.nom}>{combattant.nom}</Text>
              <View style={styles.ligneType}>
                <View style={[styles.pastilleType, { backgroundColor: couleursTypes[combattant.type] }]}>
                  <Text style={styles.texteType}>{nomsTypes[combattant.type]}</Text>
                </View>
                <Text style={styles.faiblesse}>faible : {nomsTypes[combattant.faiblesse]}</Text>
              </View>
              <Text style={styles.pv}>
                {combattant.pv} / {combattant.pvMax} PV
              </Text>
              <View style={styles.barrePv}>
                <View style={[styles.barrePvPleine, { width: pourcentagePv + '%' }, pourcentagePv <= 30 && styles.barrePvBasse]} />
              </View>
            </View>
            <Pressable style={styles.boutonFermer} onPress={quandFerme} accessibilityLabel="Fermer">
              <Ionicons name="close" size={20} color={couleurs.texte} />
            </Pressable>
          </View>

          <JaugeEnergie energie={energie} apercu={apercu} />

          {/* Attaques */}
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
                  <Text style={styles.nomAttaque}>{attaque.nom}</Text>
                  {(attaque.effets || explication) && (
                    <Text style={[styles.effets, explication && styles.raison]}>
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
                <Text style={styles.nomTalent}>Talent : {possibles.talent.nom}</Text>
                <Text style={styles.effets}>{possibles.talent.texte} (gratuit)</Text>
              </View>
            </Pressable>
          )}

          {/* Retraite */}
          <Pressable
            style={[styles.retraite, !retraitePossible && styles.desactive, cible === 'retraite' && styles.enAvant]}
            onPress={quandRetraite}
            onPressIn={() => setApercu(possibles.coutRetraite)}
            onPressOut={() => setApercu(0)}
            disabled={!retraitePossible}
          >
            <Ionicons name="swap-vertical" size={18} color={couleurs.principaleFoncee} />
            <Text style={styles.texteRetraite}>Retraite</Text>
            <Text style={styles.coutRetraite}>
              {raisonRetraite ?? (possibles.coutRetraite === 0 ? 'gratuite' : possibles.coutRetraite + ' ⚡')}
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  )
}
