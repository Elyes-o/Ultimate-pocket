// Écran de combat contre un bot.
// De haut en bas : score + tour, banc du bot, les DEUX cartes actives face à face, ton banc, tes actions.
// Les règles sont dans src/combat/moteur.js, le cerveau du bot dans src/combat/bot.js.
import { useEffect, useRef, useState } from 'react'
import { View, Text, Pressable, Modal, Image, Animated, Platform } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import CarteCombat from '../src/composants/CarteCombat'
import JaugeEnergie from '../src/composants/JaugeEnergie'
import CinematiqueUltime from '../src/composants/CinematiqueUltime'
import IconeEclat from '../src/composants/IconeEclat'
import { DegatsFlottants, CarteKo, BandeauTour } from '../src/composants/EffetsCombat'
import { creerCombat, jouerAction, actionsPossibles } from '../src/combat/moteur'
import { choisirActionsDuBot } from '../src/combat/bot'
import { decksBots, niveauxBot, fichesSupporters, fichesObjets, combos, nomsTypes } from '../src/donnees/combat'
import { trouverCarte } from '../src/donnees/cartes'
import { useJoueur } from '../src/donnees/JoueurContexte'
import { couleurs } from '../src/theme'
import styles from '../src/ecrans/Partie.styles'

const DELAI_BOT = 1300 // le bot "réfléchit" un peu avant de jouer (millisecondes)
const LARGEUR_ACTIF = 90
const LARGEUR_BANC = 34
const ANIMATION_NATIVE = Platform.OS !== 'web'

// Couleur de l'onde de choc selon le type de l'attaquant
const couleursTypes = {
  feu: '#E2483D', eau: '#1FB6E6', electrique: '#F7B731', combat: '#C0702B', psy: '#C77DFF',
  tenebres: '#3B4A6B', metal: '#8C98A8', incolore: '#5B4CF5',
}

// Texte court qui résume les effets d'une attaque
function texteEffets(effets) {
  if (!effets) {
    return ''
  }
  const morceaux = []
  if (effets.zone) morceaux.push('Zone ' + effets.zone)
  if (effets.bouclier) morceaux.push('Bouclier ' + effets.bouclier)
  if (effets.soinBanc) morceaux.push('Soin banc ' + effets.soinBanc)
  if (effets.energieAdverse) morceaux.push('-' + effets.energieAdverse + ' ⚡ adverse')
  if (effets.recul) morceaux.push('Recul ' + effets.recul)
  if (effets.bloque) morceaux.push('Bloque')
  if (effets.ignoreBouclier) morceaux.push('Perce boucliers')
  if (effets.critique) morceaux.push('Critique +' + effets.critique.bonus)
  if (effets.bonusParProdige) morceaux.push('+' + effets.bonusParProdige + '/Prodige')
  if (effets.fatigue) morceaux.push('Fatigue')
  return morceaux.join(' · ')
}

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
function PlaceActive({ camp, idCamp, evenement }) {
  const estJoueur = idCamp === 'joueur'
  const recue = attaqueRecuePar(evenement, idCamp)
  const coup = recue ? { id: evenement.id, couleur: couleursTypes[evenement.typeAttaquant] } : null
  const elan = evenement && evenement.type === 'attaque' && evenement.attaquant === idCamp ? evenement.id : null

  return (
    <View style={styles.placeActive}>
      <View>
        <CarteCombat combattant={camp.actif} largeur={LARGEUR_ACTIF} coup={coup} elan={elan} versLeHaut={estJoueur} />
        {recue && evenement.koActif && (
          <CarteKo combattant={evenement.koActif} largeur={LARGEUR_ACTIF} versLeHaut={estJoueur} idEvenement={evenement.id} />
        )}
        {recue && <DegatsFlottants key={evenement.id} evenement={evenement} />}
      </View>
      {camp.actif && (
        <View style={styles.etiquetteActif}>
          <Text style={styles.nomActif} numberOfLines={1}>
            {camp.actif.nom}
          </Text>
          <Text style={styles.typeActif}>
            {nomsTypes[camp.actif.type]} · faible : {nomsTypes[camp.actif.faiblesse]}
          </Text>
        </View>
      )}
    </View>
  )
}

export default function EcranPartie() {
  const marges = useSafeAreaInsets()
  const { niveau: idNiveau } = useLocalSearchParams()
  const niveau = niveauxBot.find((element) => element.id === idNiveau) ?? niveauxBot[0]
  const { deckDeCombat, recompenserCombat } = useJoueur()

  function nouveauCombat() {
    return creerCombat(deckDeCombat(), decksBots[niveau.id], 'Bot ' + niveau.nom)
  }

  const [etat, setEtat] = useState(nouveauCombat)
  const [cinematique, setCinematique] = useState(null) // { combo, numeros, camp }
  const [choixChangement, setChoixChangement] = useState(false)
  const [ficheCarte, setFicheCarte] = useState(null) // 'supporter' ou 'objet'
  const [apercuCout, setApercuCout] = useState(0) // cases de la jauge qui clignotent
  const [recompense, setRecompense] = useState(null)
  const recompenseDonnee = useRef(false)
  const secousseEcran = useRef(new Animated.Value(0)).current

  const possibles = actionsPossibles(etat, 'joueur')
  const campJoueur = etat.camps.joueur
  const campBot = etat.camps.bot

  // ----- Tour du bot -----
  useEffect(() => {
    if (etat.tour !== 'bot' || etat.gagnant || etat.remplacementEnAttente || cinematique) {
      return
    }
    const minuteur = setTimeout(() => {
      let nouvelEtat = etat
      for (const action of choisirActionsDuBot(etat, niveau.id)) {
        if (action.type === 'ultime') {
          // L'Ultime passe d'abord par sa cinématique
          const combo = combos.find((element) => element.id === action.idCombo)
          setEtat(nouvelEtat)
          setCinematique({ combo, camp: 'bot', numeros: numerosDuCombo(nouvelEtat.camps.bot, combo) })
          return
        }
        nouvelEtat = jouerAction(nouvelEtat, 'bot', action)
        if (nouvelEtat.gagnant || nouvelEtat.remplacementEnAttente) {
          break
        }
      }
      setEtat(nouvelEtat)
    }, DELAI_BOT)
    return () => clearTimeout(minuteur)
  }, [etat, cinematique])

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
      const deckJoue = deckDeCombat()
      const numerosJoues = [...deckJoue.combattants, deckJoue.supporter, deckJoue.objet]
      setTimeout(() => setRecompense(recompenserCombat(etat.gagnant === 'joueur', niveau.id, numerosJoues)), 1500)
    }
  }, [etat.gagnant])

  // ----- Actions du joueur -----
  function jouer(action) {
    setApercuCout(0)
    setEtat((etatActuel) => jouerAction(etatActuel, 'joueur', action))
  }

  function lancerUltime(combo) {
    setApercuCout(0)
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
    setRecompense(null)
    setEtat(nouveauCombat())
  }

  // Fiche du Supporter ou de l'Objet ouverte
  const numeroFiche = ficheCarte ? campJoueur[ficheCarte].numero : null
  const ficheDisponible = ficheCarte === 'supporter' ? possibles.supporterDispo : possibles.objetDispo
  const texteFiche = ficheCarte === 'supporter' ? fichesSupporters[numeroFiche]?.texte : fichesObjets[numeroFiche]?.texte

  return (
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

        <PlaceActive camp={campJoueur} idCamp="joueur" evenement={etat.evenement} />

        <Banc camp={campJoueur} idCamp="joueur" evenement={etat.evenement} />
      </Animated.View>

      {/* Panneau d'actions */}
      <View style={[styles.panneau, { paddingBottom: marges.bottom + 10 }]}>
        <JaugeEnergie energie={campJoueur.energie} apercu={apercuCout} />

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
                style={[styles.boutonUltime, possible ? styles.ultimePret : styles.ultimeEnCharge]}
                onPress={() => lancerUltime(combo)}
                onPressIn={() => setApercuCout(Math.min(combo.cout, campJoueur.energie))}
                onPressOut={() => setApercuCout(0)}
                disabled={!possible}
              >
                <Ionicons name="flash" size={18} color={possible ? '#FFFFFF' : '#B5700A'} />
                <View style={styles.infosUltime}>
                  <Text style={[styles.texteUltime, !possible && styles.texteUltimeEnCharge]}>Ultime · {combo.ultime}</Text>
                  <Text style={[styles.detailUltime, !possible && styles.texteUltimeEnCharge]}>
                    {combo.degats} dégâts{combo.zone ? ' + zone ' + combo.zone : ''}
                  </Text>
                </View>
                <Text style={[styles.coutUltime, !possible && styles.texteUltimeEnCharge]}>
                  {Math.min(campJoueur.energie, combo.cout)} / {combo.cout} ⚡
                </Text>
              </Pressable>
            ))}

            {/* Attaques */}
            <View style={styles.grilleAttaques}>
              {possibles.attaques.map(({ index, attaque, possible }) => (
                <Pressable
                  key={index}
                  style={[styles.boutonAttaque, !possible && styles.boutonDesactive]}
                  onPress={() => jouer({ type: 'attaque', index })}
                  onPressIn={() => setApercuCout(attaque.cout)}
                  onPressOut={() => setApercuCout(0)}
                  disabled={!possible}
                >
                  <View style={styles.ligneAttaque}>
                    <Text style={styles.nomAttaque} numberOfLines={1}>
                      {attaque.nom}
                    </Text>
                  </View>
                  <View style={styles.ligneAttaque}>
                    <View style={styles.cout}>
                      <Ionicons name="flash" size={11} color="#FFFFFF" />
                      <Text style={styles.texteCout}>{attaque.cout}</Text>
                    </View>
                    <Text style={styles.degatsAttaque}>{attaque.degats}</Text>
                  </View>
                  {attaque.effets && (
                    <Text style={styles.effetsAttaque} numberOfLines={1}>
                      {texteEffets(attaque.effets)}
                    </Text>
                  )}
                </Pressable>
              ))}
            </View>

            {/* Autres actions */}
            <View style={styles.rangeeActions}>
              <Pressable style={styles.petiteAction} onPress={() => jouer({ type: 'concentration' })}>
                <Ionicons name="hourglass-outline" size={16} color={couleurs.principaleFoncee} />
                <Text style={styles.textePetiteAction}>Se concentrer</Text>
                <Text style={styles.detailPetiteAction}>+2 ⚡</Text>
              </Pressable>
              <Pressable
                style={[styles.petiteAction, !possibles.peutChanger && styles.boutonDesactive]}
                onPress={() => setChoixChangement(true)}
                onPressIn={() => setApercuCout(possibles.coutRetraite)}
                onPressOut={() => setApercuCout(0)}
                disabled={!possibles.peutChanger}
              >
                <Ionicons name="swap-vertical" size={16} color={couleurs.principaleFoncee} />
                <Text style={styles.textePetiteAction}>Changer</Text>
                <Text style={styles.detailPetiteAction}>{possibles.coutRetraite} ⚡</Text>
              </Pressable>
              <Pressable style={[styles.petiteAction, !possibles.supporterDispo && styles.boutonDesactive]} onPress={() => setFicheCarte('supporter')}>
                <Image source={trouverCarte(campJoueur.supporter.numero).image} style={styles.vignette} />
                <Text style={styles.textePetiteAction} numberOfLines={1}>
                  {trouverCarte(campJoueur.supporter.numero).nom}
                </Text>
                <Text style={styles.detailPetiteAction}>{campJoueur.supporter.utilise ? 'Utilisé' : 'Supporter'}</Text>
              </Pressable>
              <Pressable style={[styles.petiteAction, !possibles.objetDispo && styles.boutonDesactive]} onPress={() => setFicheCarte('objet')}>
                <Image source={trouverCarte(campJoueur.objet.numero).image} style={styles.vignette} />
                <Text style={styles.textePetiteAction} numberOfLines={1}>
                  {trouverCarte(campJoueur.objet.numero).nom}
                </Text>
                <Text style={styles.detailPetiteAction}>{campJoueur.objet.utilise ? 'Utilisé' : 'Objet'}</Text>
              </Pressable>
            </View>

            {possibles.talent && (
              <Pressable
                style={[styles.boutonTalent, !possibles.talentDispo && styles.boutonDesactive]}
                onPress={() => jouer({ type: 'talent' })}
                disabled={!possibles.talentDispo}
              >
                <Ionicons name="sparkles" size={14} color={couleurs.principaleFoncee} />
                <Text style={styles.texteTalent} numberOfLines={1}>
                  Talent · {possibles.talent.nom} : {possibles.talent.texte}
                </Text>
              </Pressable>
            )}
          </>
        )}
      </View>

      {/* Fiche du Supporter / de l'Objet */}
      <Modal visible={ficheCarte !== null} transparent animationType="fade" onRequestClose={() => setFicheCarte(null)}>
        <Pressable style={styles.fondModal} onPress={() => setFicheCarte(null)}>
          {ficheCarte && (
            <Pressable style={styles.feuille} onPress={() => {}}>
              <Image source={trouverCarte(numeroFiche).image} style={styles.imageFiche} />
              <Text style={styles.titreFeuille}>{trouverCarte(numeroFiche).nom}</Text>
              <Text style={styles.texteFiche}>{texteFiche}</Text>
              <Text style={styles.regleFiche}>Gratuit · 1 fois par combat · tu peux encore agir ensuite</Text>
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
            {choixChangement && etat.remplacementEnAttente !== 'joueur' && (
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
            <Text style={styles.titreResultat}>{etat.gagnant === 'joueur' ? 'Victoire !' : 'Défaite…'}</Text>
            {recompense && (
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
            <Pressable style={styles.boutonPrincipal} onPress={rejouer}>
              <Text style={styles.texteBoutonPrincipal}>Rejouer</Text>
            </Pressable>
            <Pressable style={styles.boutonAnnuler} onPress={() => router.back()}>
              <Text style={styles.texteAnnuler}>Retour</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <CinematiqueUltime cinematique={cinematique} quandFinie={quandCinematiqueFinie} />
    </View>
  )
}
