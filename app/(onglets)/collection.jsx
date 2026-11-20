// Onglet Collection : choix de l'univers (seul Zelda est ouvert en v1), progression avec paliers
// de récompenses, recyclage des doublons, filtres, et grille des cartes.
// Appuyer sur une carte possédée ouvre sa fiche complète (FicheCarte).
import { useState } from 'react'
import { View, Text, FlatList, Pressable, Modal, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import CarteCollection from '../../src/composants/CarteCollection'
import FicheCarte from '../../src/composants/FicheCarte'
import IconeEclat from '../../src/composants/IconeEclat'
import { cartesZelda } from '../../src/donnees/cartes'
import { categorieCarte } from '../../src/donnees/combat'
import { paliersCollection, cartesRequises } from '../../src/donnees/collection'
import { useJoueur } from '../../src/donnees/JoueurContexte'
import { useEffetsSonores } from '../../src/sons'
import { couleurs } from '../../src/theme'
import styles from '../../src/ecrans/Collection.styles'

const univers = [
  { id: 'zelda', nom: 'Zelda', disponible: true },
  { id: 'one-piece', nom: 'One Piece', disponible: false },
  { id: 'hollow-knight', nom: 'Hollow Knight', disponible: false },
]

const choixPossession = [
  { id: 'toutes', nom: 'Toutes' },
  { id: 'possedees', nom: 'Possédées' },
  { id: 'manquantes', nom: 'Manquantes' },
]

const choixCategories = [
  { id: 'combattant', nom: 'Combattants' },
  { id: 'supporter', nom: 'Supporters' },
  { id: 'objet', nom: 'Objets' },
]

// Ajoute ou retire une valeur d'une liste (pour les filtres qu'on peut cumuler)
function basculer(liste, valeur) {
  return liste.includes(valeur) ? liste.filter((element) => element !== valeur) : [...liste, valeur]
}

// Une pastille de palier sous la barre de progression
function Palier({ palier, etat, requises, quandOnAppuie }) {
  const pret = etat === 'pret'
  const reclame = etat === 'reclame'
  return (
    <Pressable
      style={[styles.palier, pret && styles.palierPret, reclame && styles.palierReclame]}
      onPress={quandOnAppuie}
      disabled={!pret}
      accessibilityLabel={pret ? 'Réclamer la récompense ' + palier.pourcentage + ' %' : 'Palier ' + palier.pourcentage + ' %'}
    >
      <Ionicons
        name={reclame ? 'checkmark-circle' : pret ? 'gift' : 'lock-closed'}
        size={16}
        color={pret ? couleurs.texteInverse : reclame ? couleurs.succes : couleurs.texteSecondaire}
      />
      <Text style={[styles.textePalier, pret && styles.textePalierPret]}>{palier.pourcentage} %</Text>
      <Text style={[styles.detailPalier, pret && styles.textePalierPret]}>{pret ? 'Réclamer' : reclame ? 'Reçu' : requises + ' cartes'}</Text>
    </Pressable>
  )
}

export default function EcranCollection() {
  const [carteOuverte, setCarteOuverte] = useState(null)
  const [possession, setPossession] = useState('toutes')
  const [raretes, setRaretes] = useState([])
  const [categories, setCategories] = useState([])
  const [palierRecu, setPalierRecu] = useState(null)
  const [confirmerRecyclage, setConfirmerRecyclage] = useState(false)
  const {
    possedeCarte, nombreExemplaires, cartesPossedees, etatPalier, reclamerPalier, valeurDoublons, recyclerDoublons,
  } = useJoueur()
  const { jouerSon, vibrer } = useEffetsSonores()

  const nombrePossedees = cartesPossedees.length
  const total = cartesZelda.length
  const nombreDoublons = cartesPossedees.reduce((somme, numero) => somme + nombreExemplaires(numero) - 1, 0)
  const gainRecyclage = valeurDoublons()

  const cartesAffichees = cartesZelda.filter((carte) => {
    const possedee = possedeCarte(carte.numero)
    if (possession === 'possedees' && !possedee) return false
    if (possession === 'manquantes' && possedee) return false
    if (raretes.length > 0 && !raretes.includes(carte.rarete)) return false
    if (categories.length > 0 && !categories.includes(categorieCarte(carte.numero))) return false
    return true
  })
  const filtresActifs = possession !== 'toutes' || raretes.length > 0 || categories.length > 0

  function reinitialiserFiltres() {
    setPossession('toutes')
    setRaretes([])
    setCategories([])
  }

  function reclamer(idPalier) {
    const palier = reclamerPalier(idPalier)
    if (palier) {
      jouerSon('recompense')
      vibrer('succes')
      setPalierRecu(palier)
    }
  }

  function recyclerTout() {
    setConfirmerRecyclage(false)
    if (recyclerDoublons() > 0) {
      jouerSon('recompense')
      vibrer('succes')
    }
  }

  function ouvrirCarte(carte) {
    jouerSon('carte')
    setCarteOuverte(carte.numero)
  }

  // Partie au-dessus de la grille : univers, progression, doublons, filtres
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
          {/* Repères des paliers sur la barre */}
          {paliersCollection.slice(0, -1).map((palier) => (
            <View key={palier.id} style={[styles.repere, { left: palier.pourcentage + '%' }]} />
          ))}
        </View>
        <View style={styles.listePaliers}>
          {paliersCollection.map((palier) => (
            <Palier
              key={palier.id}
              palier={palier}
              etat={etatPalier(palier)}
              requises={cartesRequises(palier, total)}
              quandOnAppuie={() => reclamer(palier.id)}
            />
          ))}
        </View>
      </View>

      {nombreDoublons > 0 && (
        <View style={styles.doublons}>
          <View style={styles.texteDoublons}>
            <Text style={styles.titreDoublons}>
              {nombreDoublons} {nombreDoublons > 1 ? 'doublons' : 'doublon'}
            </Text>
            <Text style={styles.detailDoublons}>Recycle-les en Éclats (tu gardes 1 exemplaire de chaque)</Text>
          </View>
          <Pressable style={styles.boutonRecycler} onPress={() => setConfirmerRecyclage(true)}>
            <Text style={styles.texteBoutonRecycler}>+{gainRecyclage}</Text>
            <IconeEclat taille={16} />
          </Pressable>
        </View>
      )}

      {/* Filtres */}
      <View style={styles.segments}>
        {choixPossession.map((choix) => (
          <Pressable
            key={choix.id}
            style={[styles.segment, possession === choix.id && styles.segmentActif]}
            onPress={() => setPossession(choix.id)}
          >
            <Text style={[styles.texteSegment, possession === choix.id && styles.texteSegmentActif]}>{choix.nom}</Text>
          </Pressable>
        ))}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.listeFiltres}>
        {[1, 2, 3, 4].map((rarete) => {
          const actif = raretes.includes(rarete)
          return (
            <Pressable
              key={rarete}
              style={[styles.filtre, actif && styles.filtreActif]}
              onPress={() => setRaretes(basculer(raretes, rarete))}
              accessibilityLabel={'Rareté ' + rarete + ' étoiles'}
            >
              <Text style={[styles.texteFiltre, actif && styles.texteFiltreActif]}>{rarete}</Text>
              <Ionicons name="star" size={12} color={actif ? couleurs.texteInverse : couleurs.etoile} />
            </Pressable>
          )
        })}
        <View style={styles.separateurFiltres} />
        {choixCategories.map((choix) => {
          const actif = categories.includes(choix.id)
          return (
            <Pressable
              key={choix.id}
              style={[styles.filtre, actif && styles.filtreActif]}
              onPress={() => setCategories(basculer(categories, choix.id))}
            >
              <Text style={[styles.texteFiltre, actif && styles.texteFiltreActif]}>{choix.nom}</Text>
            </Pressable>
          )
        })}
      </ScrollView>
      {filtresActifs && (
        <View style={styles.ligneResultats}>
          <Text style={styles.texteResultats}>
            {cartesAffichees.length} {cartesAffichees.length > 1 ? 'cartes' : 'carte'}
          </Text>
          <Pressable onPress={reinitialiserFiltres} hitSlop={8}>
            <Text style={styles.lienReinitialiser}>Tout afficher</Text>
          </Pressable>
        </View>
      )}
    </View>
  )

  return (
    <View style={styles.ecran}>
      <FlatList
        data={cartesAffichees}
        keyExtractor={(carte) => String(carte.numero)}
        numColumns={3}
        ListHeaderComponent={entete}
        ListEmptyComponent={
          <View style={styles.vide}>
            <Ionicons name="search" size={28} color={couleurs.texteSecondaire} />
            <Text style={styles.texteVide}>Aucune carte ne correspond à ces filtres.</Text>
          </View>
        }
        contentContainerStyle={styles.contenu}
        columnWrapperStyle={styles.ligneGrille}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CarteCollection
            carte={item}
            possedee={possedeCarte(item.numero)}
            exemplaires={nombreExemplaires(item.numero)}
            quandOnAppuie={ouvrirCarte}
          />
        )}
      />

      {carteOuverte !== null && <FicheCarte numero={carteOuverte} quandOnFerme={() => setCarteOuverte(null)} />}

      {/* Récompense d'un palier */}
      <Modal visible={palierRecu !== null} transparent animationType="fade" onRequestClose={() => setPalierRecu(null)}>
        <Pressable style={styles.fondModal} onPress={() => setPalierRecu(null)}>
          {palierRecu && (
            <Pressable style={styles.feuille} onPress={() => {}}>
              <View style={styles.iconeCadeau}>
                <Ionicons name="gift" size={34} color={couleurs.texteInverse} />
              </View>
              <Text style={styles.titreFeuille}>Palier {palierRecu.pourcentage} % atteint !</Text>
              <View style={styles.ligneGains}>
                <View style={styles.gain}>
                  <IconeEclat taille={20} />
                  <Text style={styles.texteGain}>+{palierRecu.eclats}</Text>
                </View>
                {palierRecu.tickets > 0 && (
                  <View style={styles.gain}>
                    <Ionicons name="ticket" size={20} color={couleurs.ticket} />
                    <Text style={styles.texteGain}>+{palierRecu.tickets}</Text>
                  </View>
                )}
              </View>
              {palierRecu.titre && (
                <Text style={styles.texteFeuille}>Nouveau titre débloqué : « {palierRecu.titre} », visible sur ton profil.</Text>
              )}
              <Pressable style={styles.boutonPrincipal} onPress={() => setPalierRecu(null)}>
                <Text style={styles.texteBoutonPrincipal}>Super !</Text>
              </Pressable>
            </Pressable>
          )}
        </Pressable>
      </Modal>

      {/* Confirmation du recyclage de tous les doublons */}
      <Modal visible={confirmerRecyclage} transparent animationType="fade" onRequestClose={() => setConfirmerRecyclage(false)}>
        <Pressable style={styles.fondModal} onPress={() => setConfirmerRecyclage(false)}>
          <Pressable style={styles.feuille} onPress={() => {}}>
            <Text style={styles.titreFeuille}>Recycler {nombreDoublons} {nombreDoublons > 1 ? 'doublons' : 'doublon'} ?</Text>
            <Text style={styles.texteFeuille}>Tu gardes un exemplaire de chaque carte. Aucune carte ne quitte ta collection.</Text>
            <Pressable style={styles.boutonPrincipal} onPress={recyclerTout}>
              <IconeEclat taille={18} />
              <Text style={styles.texteBoutonPrincipal}>Recycler pour {gainRecyclage} Éclats</Text>
            </Pressable>
            <Pressable style={styles.boutonAnnuler} onPress={() => setConfirmerRecyclage(false)}>
              <Text style={styles.texteBoutonAnnuler}>Annuler</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  )
}
