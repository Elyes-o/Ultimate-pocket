// Écran de combat contre un bot (et tutoriel guidé : /partie?niveau=tutoriel).
// De haut en bas : score + tour, banc du bot, les DEUX cartes actives face à face, ton banc, tes actions.
// Comme dans Pokémon TCG Pocket : on touche SA carte active pour attaquer ou faire une retraite (MenuCarteActive).
// Les règles sont dans src/combat/moteur.js, le cerveau du bot dans src/combat/bot.js.
import { useEffect, useRef, useState } from 'react'
import { View, Text, Pressable, Modal, Image, Animated, Platform } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import CarteCombat from '../src/composants/CarteCombat'
import JaugeEnergie from '../src/composants/JaugeEnergie'
import CinematiqueUltime from '../src/composants/CinematiqueUltime'
import MenuCarteActive from '../src/composants/MenuCarteActive'
import BulleTutoriel from '../src/composants/BulleTutoriel'
import IconeEclat from '../src/composants/IconeEclat'
import { DegatsFlottants, CarteKo, BandeauTour } from '../src/composants/EffetsCombat'
import { creerCombat, jouerAction, actionsPossibles } from '../src/combat/moteur'
import { prochaineActionDuBot } from '../src/combat/bot'
import { decksBots, energieDepartBots, niveauxBot, fichesSupporters, fichesObjets, combos, nomsTypes, texteUltime, couleursTypes } from '../src/donnees/combat'
import { trouverCarte } from '../src/donnees/cartes'
import { deckJoueurTutoriel, deckBotTutoriel, pvBotTutoriel, etapesTutoriel } from '../src/donnees/tutoriel'
import { useJoueur } from '../src/donnees/JoueurContexte'
import { useEffetsSonores } from '../src/sons'
import { couleurs } from '../src/theme'
import styles from '../src/ecrans/Partie.styles'
import FondJeu from '../src/composants/FondJeu'

const DELAI_BOT = 1300 // le bot "réfléchit" un peu avant de jouer (millisecondes)
const LARGEUR_ACTIF = 90
const LARGEUR_BANC = 34
const ANIMATION_NATIVE = Platform.OS !== 'web'

// Cartes à montrer dans la cinématique d'un combo
function numerosDuCombo(camp, combo) {
  const enVie = [camp.actif, ...camp.banc].filter(Boolean).map((combattant) => combattant.numero)
  const numeros = combo.groupes.map((groupe) => groupe.find((numero) => enVie.includes(numero)))
  if (combo.supporter) numeros.push(combo.supporter)
  if (combo.objet) numeros.push(combo.objet)
  return numeros
}

// Est-ce que l'évènement est une attaque REÇUE par ce camp ?
function attaqueRecuePar(evenement, idCamp) {
  return evenement && evenement.type === 'attaque' && evenement.attaquant !== idCamp
}

// Le banc d'un camp (petites cartes avec leurs PV)
function Banc({ camp, idCamp, evenement }) {
  const recue = attaqueRecuePar(evenement, idCamp) && evenement.zone
  const coup = recue ? { id: evenement.id, couleur: couleursTypes[evenement.typeAttaquant] } : null
  return (
    <View style={styles.banc}>
      {camp.banc.map((combattant) => (
        <CarteCombat key={combattant.numero} combattant={combattant} largeur={LARGEUR_BANC} coup={coup} detaille={false} />
      ))}
    </View>
  )
}

// La carte active d'un camp, avec ses effets (dégâts qui s'envolent, carte KO qui tombe)
// "invite" : c'est ton tour, la carte pulse pour montrer qu'on peut la toucher
function PlaceActive({ camp, idCamp, evenement, quandOnTouche, invite = false, enAvant = false }) {
  const estJoueur = idCamp === 'joueur'
  const pulsation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!invite) {
      pulsation.setValue(0)
      return
    }
    const boucle = Animated.loop(
      Animated.sequence([
        Animated.timing(pulsation, { toValue: 1, duration: 700, useNativeDriver: ANIMATION_NATIVE }),
        Animated.timing(pulsation, { toValue: 0, duration: 700, useNativeDriver: ANIMATION_NATIVE }),
      ])
    )
    boucle.start()
    return () => boucle.stop()
  }, [invite])

  const recue = attaqueRecuePar(evenement, idCamp)
  const coup = recue ? { id: evenement.id, couleur: couleursTypes[evenement.typeAttaquant] } : null
  const elan = evenement && evenement.type === 'attaque' && evenement.attaquant === idCamp ? evenement.id : null

  return (
    <View style={styles.placeActive}>
      <Pressable
        onPress={quandOnTouche}
        disabled={!quandOnTouche}
        accessibilityLabel={estJoueur && camp.actif ? 'Ta carte active ' + camp.actif.nom + ' : attaquer ou retraite' : undefined}
      >
        {invite && (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.halo,
              enAvant && styles.haloTutoriel,
              {
                opacity: pulsation.interpolate({ inputRange: [0, 1], outputRange: [0.35, 1] }),
                transform: [{ scale: pulsation.interpolate({ inputRange: [0, 1], outputRange: [1, 1.06] }) }],
              },
            ]}
          />
        )}
        <CarteCombat combattant={camp.actif} largeur={LARGEUR_ACTIF} coup={coup} elan={elan} versLeHaut={estJoueur} />
        {recue && evenement.koActif && (
          <CarteKo combattant={evenement.koActif} largeur={LARGEUR_ACTIF} versLeHaut={estJoueur} idEvenement={evenement.id} />
        )}
        {recue && <DegatsFlottants key={evenement.id} evenement={evenement} />}
      </Pressable>
      {camp.actif && (
        <View style={styles.etiquetteActif}>
          <Text style={styles.nomActif} numberOfLines={1}>
            {camp.actif.nom}
          </Text>
          <Text style={styles.typeActif}>
            {nomsTypes[camp.actif.type]}, faible : {nomsTypes[camp.actif.faiblesse]}
          </Text>
          {invite && <Text style={styles.indicationCarte}>Touche ta carte pour attaquer</Text>}
        </View>
      )}
    </View>
  )
}

export default function EcranPartie() {
  const marges = useSafeAreaInsets()
  const { niveau: idNiveau } = useLocalSearchParams()
  const modeTutoriel = idNiveau === 'tutoriel'
  const niveau = modeTutoriel
    ? { id: 'tutoriel', nom: 'Mannequin', recompense: 0 }
    : niveauxBot.find((element) => element.id === idNiveau) ?? niveauxBot[0]
  const { deckDeCombat, recompenserCombat, terminerTutoriel } = useJoueur()
  const { jouerSon, vibrer } = useEffetsSonores()

  function nouveauCombat() {
    if (modeTutoriel) {
      // Decks et PV fixés, et c'est toujours au joueur de commencer
      const combat = creerCombat(deckJoueurTutoriel, deckBotTutoriel, 'Mannequin')
      combat.tour = 'joueur'
      for (const combattant of [combat.camps.bot.actif, ...combat.camps.bot.banc]) {
        combattant.pv = pvBotTutoriel[combattant.numero]
        combattant.pvMax = pvBotTutoriel[combattant.numero]
      }
      combat.message = 'Entraînement avec Impa'
      return combat
    }
    return creerCombat(deckDeCombat(), decksBots[niveau.id], 'Bot ' + niveau.nom, energieDepartBots[niveau.id])
  }

  const [etat, setEtat] = useState(nouveauCombat)
  const [cinematique, setCinematique] = useState(null) // { combo, numeros, camp }
  const [choixChangement, setChoixChangement] = useState(false)
  const [ficheCarte, setFicheCarte] = useState(null) // 'supporter' ou 'objet'
  const [apercuCout, setApercuCout] = useState(0) // cases de la jauge qui clignotent
  const [recompense, setRecompense] = useState(null)
  const [menuCarte, setMenuCarte] = useState(false)
  const [indexEtape, setIndexEtape] = useState(0)
  const recompenseDonnee = useRef(false)
  const secousseEcran = useRef(new Animated.Value(0)).current

  const possibles = actionsPossibles(etat, 'joueur')
  const campJoueur = etat.camps.joueur
  const campBot = etat.camps.bot

  // ----- Tutoriel : l'étape en cours décide de ce qui est utilisable -----
  const etape = modeTutoriel ? etapesTutoriel[indexEtape] ?? null : null
  // Pendant une étape, seul l'élément montré marche ; une fois le guide fini, tout est libre
  function autorise(nom) {
    return !etape || etape.cible === nom
  }
  // Une action a eu lieu : si c'est celle que l'étape attend, on passe à la suivante
  function signalerTutoriel(signal) {
    if (etape && etape.attend === signal) {
      setIndexEtape((index) => index + 1)
    }
  }
  // Étapes « attends ton tour » : on avance quand le bot a joué
  useEffect(() => {
    if (etape && etape.attend === 'tourJoueur' && etat.tour === 'joueur' && !etat.remplacementEnAttente) {
      setIndexEtape((index) => index + 1)
    }
  }, [etat, indexEtape])

  // ----- Tour du bot : UNE action à la fois -----
  // Après une action gratuite (Supporter, Objet, Talent), c'est toujours au bot :
  // ce même effet se relance avec le nouvel état et le bot choisit sa prochaine action.
  useEffect(() => {
    if (etat.tour !== 'bot' || etat.gagnant || etat.remplacementEnAttente || cinematique) {
      return
    }
    const minuteur = setTimeout(() => {
      // Le Mannequin du tutoriel ne fait que se concentrer
      const action = modeTutoriel ? { type: 'concentration' } : prochaineActionDuBot(etat, niveau.id)
      if (action.type === 'ultime') {
        // L'Ultime passe d'abord par sa cinématique
        const combo = combos.find((element) => element.id === action.idCombo)
        setCinematique({ combo, camp: 'bot', numeros: numerosDuCombo(etat.camps.bot, combo) })
        return
      }
      setEtat(jouerAction(etat, 'bot', action))
    }, DELAI_BOT)
    return () => clearTimeout(minuteur)
  }, [etat, cinematique])

  // ----- Bruitages et vibrations à chaque évènement du combat -----
  useEffect(() => {
    const evenement = etat.evenement
    if (!evenement) {
      return
    }
    if (evenement.type === 'attaque') {
      const ko = evenement.koActif || evenement.koBanc.length > 0
      jouerSon('impact')
      vibrer(ko || evenement.ultime ? 'fort' : 'moyen')
      if (ko) {
        setTimeout(() => jouerSon('ko'), 300) // juste quand la carte KO commence à tomber
      }
    } else if (evenement.type === 'concentration') {
      jouerSon('energie')
    } else {
      // Supporter, Objet, Talent, changement de combattant
      jouerSon('carte')
      vibrer('leger')
    }
  }, [etat.evenement ? etat.evenement.id : null])

  // Début d'une cinématique d'Ultime : grande montée sonore
  useEffect(() => {
    if (cinematique) {
      jouerSon('ultime')
      vibrer('fort')
    }
  }, [cinematique])

  // Fin du combat : fanfare (ou notes tristes), puis "ding" de la récompense
  useEffect(() => {
    if (!recompense) {
      return
    }
    const victoire = etat.gagnant === 'joueur'
    jouerSon(victoire ? 'victoire' : 'defaite')
    vibrer(victoire ? 'succes' : 'echec')
    setTimeout(() => jouerSon('recompense'), 900)
  }, [recompense])

  // ----- Un Ultime vient de toucher : tout l'écran tremble -----
  useEffect(() => {
    if (!etat.evenement || !etat.evenement.ultime) {
      return
    }
    secousseEcran.setValue(0)
    Animated.sequence([
      Animated.delay(100),
      Animated.timing(secousseEcran, { toValue: 1, duration: 40, useNativeDriver: ANIMATION_NATIVE }),
      Animated.timing(secousseEcran, { toValue: -1, duration: 40, useNativeDriver: ANIMATION_NATIVE }),
      Animated.timing(secousseEcran, { toValue: 1, duration: 40, useNativeDriver: ANIMATION_NATIVE }),
      Animated.timing(secousseEcran, { toValue: -1, duration: 40, useNativeDriver: ANIMATION_NATIVE }),
      Animated.timing(secousseEcran, { toValue: 0, duration: 60, useNativeDriver: ANIMATION_NATIVE }),
    ]).start()
  }, [etat.evenement ? etat.evenement.id : null])

  // ----- Fin du combat : récompense (une seule fois) -----
  useEffect(() => {
    if (etat.gagnant && !recompenseDonnee.current) {
      recompenseDonnee.current = true
      // On laisse le temps de voir le dernier coup et le KO
      // Les cartes de ton deck comptent comme "jouées" (pour la carte favorite du Profil)
      if (modeTutoriel) {
        // Pas de statistiques ni d'Éclats : un booster offert, seulement la 1re fois
        const victoire = etat.gagnant === 'joueur'
        const premiereFois = victoire && terminerTutoriel()
        setTimeout(() => setRecompense({ tutoriel: true, booster: premiereFois }), 1500)
        return
      }
      const deckJoue = deckDeCombat()
      const numerosJoues = [...deckJoue.combattants, deckJoue.supporter, deckJoue.objet]
      setTimeout(() => setRecompense(recompenserCombat(etat.gagnant === 'joueur', niveau.id, numerosJoues)), 1500)
    }
  }, [etat.gagnant])

  // ----- Actions du joueur -----
  function jouer(action) {
    setApercuCout(0)
    setMenuCarte(false)
    signalerTutoriel(action.type)
    setEtat((etatActuel) => jouerAction(etatActuel, 'joueur', action))
  }

  function ouvrirMenuCarte() {
    jouerSon('clic')
    setMenuCarte(true)
    signalerTutoriel('ouvrirCarte')
  }

  function demanderRetraite() {
    setMenuCarte(false)
    setChoixChangement(true)
    signalerTutoriel('retraite')
  }

  function lancerUltime(combo) {
    setApercuCout(0)
    signalerTutoriel('ultime')
    setCinematique({ combo, camp: 'joueur', numeros: numerosDuCombo(campJoueur, combo) })
  }

  // La cinématique est finie : on applique l'Ultime pour de vrai
  function quandCinematiqueFinie() {
    const { combo, camp } = cinematique
    setCinematique(null)
    setEtat((etatActuel) => jouerAction(etatActuel, camp, { type: 'ultime', idCombo: combo.id }))
  }

  function rejouer() {
    recompenseDonnee.current = false
    setIndexEtape(0)
    setRecompense(null)
    setEtat(nouveauCombat())
  }

  // Fiche du Supporter ou de l'Objet ouverte
  const numeroFiche = ficheCarte ? campJoueur[ficheCarte].numero : null
  const ficheDisponible = ficheCarte === 'supporter' ? possibles.supporterDispo : possibles.objetDispo
  const texteFiche = ficheCarte === 'supporter' ? fichesSupporters[numeroFiche]?.texte : fichesObjets[numeroFiche]?.texte

  return (
    <FondJeu>
      <View style={[styles.ecran, { paddingTop: marges.top + 6 }]}>
        {/* Score et tour */}
        <View style={styles.barreHaut}>
          <Pressable style={styles.boutonQuitter} onPress={() => router.back()} accessibilityLabel="Quitter le combat">
            <Ionicons name="close" size={20} color={couleurs.texte} />
          </Pressable>
          <View style={styles.score}>
            <Text style={styles.nomScore}>Toi</Text>
            <Text style={styles.chiffreScore}>
              {campBot.ko} – {campJoueur.ko}
            </Text>
            <Text style={styles.nomScore}>Bot {niveau.nom}</Text>
          </View>
          <Text style={styles.tour}>Tour {etat.numeroTour}</Text>
        </View>
        <Text style={styles.regleScore}>Le premier à 3 KO gagne</Text>
        <BandeauTour tour={etat.tour} numeroTour={etat.numeroTour} />
        {modeTutoriel && (
          <BulleTutoriel
            etape={etape}
            numeroEtape={indexEtape}
            totalEtapes={etapesTutoriel.length}
            quandSuivant={() => signalerTutoriel('suivant')}
            style={{ top: marges.top + 58 }}
          />
        )}

        {/* L'arène (tremble pendant les Ultimes) */}
        <Animated.View
          style={[
            styles.arene,
            { transform: [{ translateX: secousseEcran.interpolate({ inputRange: [-1, 1], outputRange: [-10, 10] }) }] },
          ]}
        >
          <View style={styles.ligneBot}>
            <Banc camp={campBot} idCamp="bot" evenement={etat.evenement} />
            <View style={styles.energieBot}>
              <JaugeEnergie energie={campBot.energie} compacte />
            </View>
          </View>

          <PlaceActive camp={campBot} idCamp="bot" evenement={etat.evenement} />

          <Text style={styles.message} numberOfLines={2}>
            {etat.message}
          </Text>

          <PlaceActive
            camp={campJoueur}
            idCamp="joueur"
            evenement={etat.evenement}
            quandOnTouche={possibles.aSonTour && !cinematique && autorise('carteActive') ? ouvrirMenuCarte : null}
            invite={possibles.aSonTour && !cinematique && !menuCarte && autorise('carteActive')}
            enAvant={etape?.cible === 'carteActive'}
          />

          <Banc camp={campJoueur} idCamp="joueur" evenement={etat.evenement} />
        </Animated.View>

        {/* Panneau d'actions */}
        <View style={[styles.panneau, { paddingBottom: marges.bottom + 10 }]}>
          <View style={etape?.cible === 'jauge' && styles.cibleTutoriel}>
            <JaugeEnergie energie={campJoueur.energie} apercu={apercuCout} />
          </View>

          {!possibles.aSonTour ? (
            <Text style={styles.attente}>
              {etat.gagnant ? 'Combat terminé' : etat.remplacementEnAttente ? 'Choisis ton combattant…' : 'Le bot réfléchit…'}
            </Text>
          ) : (
            <>
              {/* Ultimes disponibles */}
              {possibles.ultimes.map(({ combo, possible }) => (
                <Pressable
                  key={combo.id}
                  style={[
                    styles.boutonUltime,
                    possible ? styles.ultimePret : styles.ultimeEnCharge,
                    !autorise('ultime') && styles.boutonDesactive,
                    etape?.cible === 'ultime' && styles.cibleTutoriel,
                  ]}
                  onPress={() => lancerUltime(combo)}
                  onPressIn={() => setApercuCout(Math.min(combo.cout, campJoueur.energie))}
                  onPressOut={() => setApercuCout(0)}
                  disabled={!possible || !autorise('ultime')}
                >
                  <Ionicons name="flash" size={18} color={possible ? '#FFFFFF' : '#B5700A'} />
                  <View style={styles.infosUltime}>
                    <Text style={[styles.texteUltime, !possible && styles.texteUltimeEnCharge]}>{combo.ultime}</Text>
                    <Text style={[styles.detailUltime, !possible && styles.texteUltimeEnCharge]}>
                      {texteUltime(combo)}
                    </Text>
                  </View>
                  <Text style={[styles.coutUltime, !possible && styles.texteUltimeEnCharge]}>
                    {Math.min(campJoueur.energie, combo.cout)} / {combo.cout} ⚡
                  </Text>
                </Pressable>
              ))}

              {/* Autres actions */}
              <View style={styles.rangeeActions}>
                <Pressable
                  style={[
                    styles.petiteAction,
                    !autorise('concentration') && styles.boutonDesactive,
                    etape?.cible === 'concentration' && styles.cibleTutoriel,
                  ]}
                  onPress={() => jouer({ type: 'concentration' })}
                  disabled={!autorise('concentration')}
                >
                  <Ionicons name="hourglass-outline" size={16} color={couleurs.principaleFoncee} />
                  <Text style={styles.textePetiteAction}>Se concentrer</Text>
                  <Text style={styles.detailPetiteAction}>+1 ⚡, finit le tour</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.petiteAction,
                    (!possibles.supporterDispo || !autorise('supporter')) && styles.boutonDesactive,
                    etape?.cible === 'supporter' && styles.cibleTutoriel,
                  ]}
                  onPress={() => setFicheCarte('supporter')}
                  disabled={!autorise('supporter')}
                >
                  <Image source={trouverCarte(campJoueur.supporter.numero).image} style={styles.vignette} />
                  <Text style={styles.textePetiteAction} numberOfLines={1}>
                    {trouverCarte(campJoueur.supporter.numero).nom}
                  </Text>
                  <Text style={styles.detailPetiteAction}>{campJoueur.supporter.utilise ? 'Utilisé' : 'Supporter'}</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.petiteAction,
                    (!possibles.objetDispo || !autorise('objet')) && styles.boutonDesactive,
                    etape?.cible === 'objet' && styles.cibleTutoriel,
                  ]}
                  onPress={() => setFicheCarte('objet')}
                  disabled={!autorise('objet')}
                >
                  <Image source={trouverCarte(campJoueur.objet.numero).image} style={styles.vignette} />
                  <Text style={styles.textePetiteAction} numberOfLines={1}>
                    {trouverCarte(campJoueur.objet.numero).nom}
                  </Text>
                  <Text style={styles.detailPetiteAction}>{campJoueur.objet.utilise ? 'Utilisé' : 'Objet'}</Text>
                </Pressable>
              </View>

            </>
          )}
        </View>

        {/* Menu de ta carte active : attaques, Talent, Retraite */}
        <MenuCarteActive
          visible={menuCarte && possibles.aSonTour}
          combattant={campJoueur.actif}
          energie={campJoueur.energie}
          possibles={possibles}
          quandAttaque={(index) => jouer({ type: 'attaque', index })}
          quandTalent={() => jouer({ type: 'talent' })}
          quandRetraite={demanderRetraite}
          quandFerme={() => setMenuCarte(false)}
          cible={etape?.cible ?? null}
          autorise={autorise}
        />

        {/* Fiche du Supporter / de l'Objet */}
        <Modal visible={ficheCarte !== null} transparent animationType="fade" onRequestClose={() => setFicheCarte(null)}>
          <Pressable style={styles.fondModal} onPress={() => setFicheCarte(null)}>
            {ficheCarte && (
              <Pressable style={styles.feuille} onPress={() => {}}>
                <Image source={trouverCarte(numeroFiche).image} style={styles.imageFiche} />
                <Text style={styles.titreFeuille}>{trouverCarte(numeroFiche).nom}</Text>
                <Text style={styles.texteFiche}>{texteFiche}</Text>
                <Text style={styles.regleFiche}>Gratuit, une fois par combat. Tu peux encore agir ensuite.</Text>
                <Pressable
                  style={[styles.boutonPrincipal, !ficheDisponible && styles.boutonDesactive]}
                  onPress={() => {
                    setFicheCarte(null)
                    jouer({ type: ficheCarte })
                  }}
                  disabled={!ficheDisponible}
                >
                  <Text style={styles.texteBoutonPrincipal}>{ficheDisponible ? 'Jouer cette carte' : 'Déjà utilisée'}</Text>
                </Pressable>
                <Pressable style={styles.boutonAnnuler} onPress={() => setFicheCarte(null)}>
                  <Text style={styles.texteAnnuler}>Fermer</Text>
                </Pressable>
              </Pressable>
            )}
          </Pressable>
        </Modal>

        {/* Choisir un combattant du banc (changement volontaire ou après un KO) */}
        <Modal visible={choixChangement || etat.remplacementEnAttente === 'joueur'} transparent animationType="fade">
          <View style={styles.fondModal}>
            <View style={styles.feuille}>
              <Text style={styles.titreFeuille}>
                {etat.remplacementEnAttente === 'joueur'
                  ? 'KO ! Qui entre en jeu ?'
                  : 'Qui remplace ' + (campJoueur.actif ? campJoueur.actif.nom : '') + ' ?'}
              </Text>
              <View style={styles.choixBanc}>
                {campJoueur.banc.map((combattant, indexBanc) => (
                  <Pressable
                    key={combattant.numero}
                    onPress={() => {
                      setChoixChangement(false)
                      jouer({ type: etat.remplacementEnAttente === 'joueur' ? 'remplacement' : 'changement', indexBanc })
                    }}
                  >
                    <CarteCombat combattant={combattant} largeur={72} />
                  </Pressable>
                ))}
              </View>
              {choixChangement && etat.remplacementEnAttente !== 'joueur' && !etape && (
                <Pressable style={styles.boutonAnnuler} onPress={() => setChoixChangement(false)}>
                  <Text style={styles.texteAnnuler}>Annuler</Text>
                </Pressable>
              )}
            </View>
          </View>
        </Modal>

        {/* Résultat du combat */}
        <Modal visible={recompense !== null} transparent animationType="fade">
          <View style={styles.fondModal}>
            <View style={styles.feuille}>
              <Ionicons
                name={etat.gagnant === 'joueur' ? 'trophy' : 'sad-outline'}
                size={56}
                color={etat.gagnant === 'joueur' ? '#F7B731' : couleurs.texteSecondaire}
              />
              <Text style={styles.titreResultat}>{etat.gagnant === 'joueur' ? (modeTutoriel ? 'Tutoriel réussi !' : 'Victoire !') : 'Défaite…'}</Text>
              {recompense && recompense.tutoriel && (
                <View style={styles.recompenses}>
                  <Text style={styles.texteTutoriel}>
                    {etat.gagnant === 'joueur'
                      ? 'Tu connais les bases : attaques, retraite, Énergie, Supporters, Objets et Ultimes.'
                      : 'Pas grave, on recommence ?'}
                  </Text>
                  {recompense.booster && (
                    <View style={styles.ligneRecompense}>
                      <Ionicons name="gift" size={22} color={couleurs.ticket} />
                      <Text style={styles.texteRecompense}>Booster Hyrule offert !</Text>
                    </View>
                  )}
                </View>
              )}
              {recompense && !recompense.tutoriel && (
                <View style={styles.recompenses}>
                  <View style={styles.ligneRecompense}>
                    <IconeEclat taille={22} />
                    <Text style={styles.texteRecompense}>+{recompense.eclats} Éclats</Text>
                  </View>
                  {recompense.ticket && (
                    <View style={styles.ligneRecompense}>
                      <Ionicons name="ticket" size={20} color={couleurs.ticket} />
                      <Text style={styles.texteRecompense}>+1 Ticket (1re victoire du jour)</Text>
                    </View>
                  )}
                </View>
              )}
              {recompense && recompense.booster ? (
                <Pressable style={styles.boutonPrincipal} onPress={() => router.replace('/ouverture?booster=zelda-botw')}>
                  <Text style={styles.texteBoutonPrincipal}>Ouvrir mon booster</Text>
                </Pressable>
              ) : (
                <Pressable style={styles.boutonPrincipal} onPress={rejouer}>
                  <Text style={styles.texteBoutonPrincipal}>Rejouer</Text>
                </Pressable>
              )}
              <Pressable style={styles.boutonAnnuler} onPress={() => router.back()}>
                <Text style={styles.texteAnnuler}>Retour</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <CinematiqueUltime cinematique={cinematique} quandFinie={quandCinematiqueFinie} />
      </View>
    </FondJeu>
  )
}
