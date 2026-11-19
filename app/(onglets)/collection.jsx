// Onglet Collection : choix de l'univers (seul Zelda est ouvert en v1),
// compteur de progression et grille des cartes. Appuyer sur une carte l'affiche en grand.
import { useState } from 'react'
import { View, Text, FlatList, Pressable, Modal, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import CarteCollection from '../../src/composants/CarteCollection'
import { cartesZelda } from '../../src/donnees/cartes'
import { useJoueur } from '../../src/donnees/JoueurContexte'
import { couleurs } from '../../src/theme'
import styles from '../../src/ecrans/Collection.styles'

const univers = [
  { id: 'zelda', nom: 'Zelda', disponible: true },
  { id: 'one-piece', nom: 'One Piece', disponible: false },
  { id: 'hollow-knight', nom: 'Hollow Knight', disponible: false },
]

export default function EcranCollection() {
  const [carteAgrandie, setCarteAgrandie] = useState(null)
  const { possedeCarte } = useJoueur()

  const nombrePossedees = cartesZelda.filter((carte) => possedeCarte(carte.numero)).length
  const total = cartesZelda.length

  // Partie au-dessus de la grille : univers + compteur
  const entete = (
    <View>
      <View style={styles.listeUnivers}>
        {univers.map((element) => (
          <View key={element.id} style={[styles.pastilleUnivers, element.disponible && styles.pastilleActive]}>
            {!element.disponible && <Ionicons name="lock-closed" size={12} color={couleurs.texteSecondaire} />}
            <Text style={[styles.texteUnivers, element.disponible && styles.texteUniversActif]}>{element.nom}</Text>
          </View>
        ))}
      </View>

      <View style={styles.progression}>
        <View style={styles.ligneProgression}>
          <Text style={styles.nomCollection}>Breath of the Wild</Text>
          <Text style={styles.compteur}>
            <Text style={styles.compteurFort}>{nombrePossedees}</Text> / {total}
          </Text>
        </View>
        <View style={styles.barreFond}>
          <View style={[styles.barrePleine, { width: (nombrePossedees / total) * 100 + '%' }]} />
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.ecran}>
      <FlatList
        data={cartesZelda}
        keyExtractor={(carte) => String(carte.numero)}
        numColumns={3}
        ListHeaderComponent={entete}
        contentContainerStyle={styles.contenu}
        columnWrapperStyle={styles.ligneGrille}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CarteCollection carte={item} possedee={possedeCarte(item.numero)} quandOnAppuie={setCarteAgrandie} />
        )}
      />

      {/* Carte en grand quand on appuie dessus */}
      <Modal visible={carteAgrandie !== null} transparent animationType="fade" onRequestClose={() => setCarteAgrandie(null)}>
        <Pressable style={styles.fondModal} onPress={() => setCarteAgrandie(null)}>
          {carteAgrandie && (
            <>
              <View style={styles.carteAgrandie}>
                <Image source={carteAgrandie.image} style={styles.imagePleine} />
              </View>
              <Text style={styles.nomCarteAgrandie}>{carteAgrandie.nom}</Text>
              <Text style={styles.indication}>Touchez pour fermer</Text>
            </>
          )}
        </Pressable>
      </Modal>
    </View>
  )
}
