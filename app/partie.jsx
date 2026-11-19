// Écran de combat contre un bot.
// En haut : l'équipe du bot. En bas : ton équipe. Tout en bas : tes actions.
// Les règles sont dans src/combat/moteur.js, le cerveau du bot dans src/combat/bot.js.
import { useEffect, useRef, useState } from 'react'
import { View, Text, Pressable, Modal, Image } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import CarteCombat from '../src/composants/CarteCombat'
import JaugeEnergie from '../src/composants/JaugeEnergie'
import CinematiqueUltime from '../src/composants/CinematiqueUltime'
import IconeEclat from '../src/composants/IconeEclat'
import { creerCombat, jouerAction, actionsPossibles, KO_POUR_GAGNER } from '../src/combat/moteur'
import { choisirActionsDuBot } from '../src/combat/bot'
import { decksBots, niveauxBot, fichesSupporters, fichesObjets, combos } from '../src/donnees/combat'
import { trouverCarte } from '../src/donnees/cartes'
import { useJoueur } from '../src/donnees/JoueurContexte'
import { couleurs } from '../src/theme'
import styles from '../src/ecrans/Partie.styles'

const DELAI_BOT = 1200 // le bot "réfléchit" un peu avant de jouer (millisecondes)

// Texte court qui résume les effets d'une attaque
function texteEffets(effets) {
  if (!effets) {
    return ''
  }
  const morceaux = []
  if (effets.zone) morceaux.push('Zone ' + effets.zone)
  if (effets.bouclier) morceaux.push('Bouclier ' + effets.bouclier)
  if (effets.soinBanc) morceaux.push('Soin banc ' + effets.soinBanc)
  if (effets.energieAdverse) morceaux.push('-' + effets.energieAdverse + ' Énergie adverse')
  if (effets.recul) morceaux.push('Recul ' + effets.recul)
  if (effets.bloque) morceaux.push('Bloque')
  if (effets.ignoreBouclier) morceaux.push('Ignore boucliers')
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

// Une moitié du terrain (un camp)
function ZoneCamp({ camp, idCamp, evenement }) {
  const estJoueur = idCamp === 'joueur'
  const attaqueRecue = evenement && evenement.type === 'attaque' && evenement.attaquant !== idCamp
  const coupActif = attaqueRecue ? { id: evenement.id, degats: evenement.degats } : null
  const coupBanc = attaqueRecue && evenement.zone ? { id: evenement.id } : null
  const elan = evenement && evenement.type === 'attaque' && evenement.attaquant === idCamp ? evenement.id : null

  const pastillesKo = []
  for (let index = 0; index < KO_POUR_GAGNER; index++) {
    pastillesKo.push(<View key={index} style={[styles.pastilleKo, index < camp.ko && styles.pastilleKoPleine]} />)
  }

  return (
    <View style={[styles.zoneCamp, estJoueur && styles.zoneCampJoueur]}>
      <CarteCombat combattant={camp.actif} largeur={88} coup={coupActif} elan={elan} versLeHaut={estJoueur} />

      <View style={styles.colonneInfos}>
        <View style={styles.ligneNom}>
          <Text style={styles.nomCamp} numberOfLines={1}>
            {camp.actif ? camp.actif.nom : '—'}
          </Text>
          <View style={styles.pastillesKo}>{pastillesKo}</View>
        </View>
        <Text style={styles.sousNom}>{camp.nom}</Text>
        <JaugeEnergie energie={camp.energie} />
        <View style={styles.banc}>
          {camp.banc.map((combattant) => (
            <CarteCombat key={combattant.numero} combattant={combattant} largeur={42} coup={coupBanc} detaille={false} />
          ))}
        </View>
      </View>
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
  const [recompense, setRecompense] = useState(null)
  const recompenseDonnee = useRef(false)

  const possibles = actionsPossibles(etat, 'joueur')
  const campJoueur = etat.camps.joueur

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

  // ----- Fin du combat : récompense (une seule fois) -----
  useEffect(() => {
    if (etat.gagnant && !recompenseDonnee.current) {
      recompenseDonnee.current = true
      // Petit délai pour laisser voir le dernier coup
      setTimeout(() => setRecompense(recompenserCombat(etat.gagnant === 'joueur', niveau.id)), 900)
    }
  }, [etat.gagnant])

  // ----- Actions du joueur -----
  function jouer(action) {
    setEtat((etatActuel) => jouerAction(etatActuel, 'joueur', action))
  }

  function lancerUltime(combo) {
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

  return (
    <LinearGradient colors={['#FDECEC', '#F2F4FA', '#ECEAFF']} style={[styles.ecran, { paddingTop: marges.top + 6 }]}>
      {/* Barre du haut */}
      <View style={styles.barreHaut}>
        <Pressable style={styles.boutonQuitter} onPress={() => router.back()}>
          <Ionicons name="close" size={20} color={couleurs.texte} />
        </Pressable>
        <Text style={styles.titreBarre}>Bot {niveau.nom}</Text>
        <Text style={styles.tour}>Tour {etat.numeroTour}</Text>
      </View>

      <ZoneCamp camp={etat.camps.bot} idCamp="bot" evenement={etat.evenement} />

      {/* Message du milieu */}
      <View style={styles.milieu}>
        <Text style={styles.message} numberOfLines={2}>
          {etat.message}
        </Text>
      </View>

      <ZoneCamp camp={campJoueur} idCamp="joueur" evenement={etat.evenement} />

      {/* Panneau d'actions */}
      <View style={[styles.panneau, { paddingBottom: marges.bottom + 10 }]}>
        {!possibles.aSonTour ? (
          <Text style={styles.attente}>
            {etat.gagnant ? 'Combat terminé' : etat.remplacementEnAttente ? 'Choisis ton combattant…' : 'Le bot réfléchit…'}
          </Text>
        ) : (
          <>
            {/* Ultimes disponibles */}
            {possibles.ultimes.map(({ combo, possible }) => (
              <Pressable key={combo.id} onPress={() => lancerUltime(combo)} disabled={!possible}>
                <LinearGradient
                  colors={possible ? ['#F7B731', '#F5A524', '#E2483D'] : ['#D9DEEA', '#D9DEEA']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.boutonUltime}
                >
                  <Ionicons name="flash" size={18} color="#FFFFFF" />
                  <Text style={styles.texteUltime}>ULTIME · {combo.ultime}</Text>
                  <Text style={styles.coutUltime}>
                    {Math.min(campJoueur.energie, combo.cout)}/{combo.cout}
                  </Text>
                </LinearGradient>
              </Pressable>
            ))}

            {/* Attaques */}
            {possibles.attaques.map(({ index, attaque, possible }) => (
              <Pressable
                key={index}
                style={[styles.boutonAttaque, !possible && styles.boutonDesactive]}
                onPress={() => jouer({ type: 'attaque', index })}
                disabled={!possible}
              >
                <View style={styles.cout}>
                  <Ionicons name="flash" size={12} color="#FFFFFF" />
                  <Text style={styles.texteCout}>{attaque.cout}</Text>
                </View>
                <View style={styles.infosAttaque}>
                  <Text style={styles.nomAttaque} numberOfLines={1}>
                    {attaque.nom}
                  </Text>
                  {attaque.effets && <Text style={styles.effetsAttaque}>{texteEffets(attaque.effets)}</Text>}
                </View>
                <Text style={styles.degatsAttaque}>{attaque.degats}</Text>
              </Pressable>
            ))}

            {/* Petites actions */}
            <View style={styles.rangeeActions}>
              <Pressable style={styles.petiteAction} onPress={() => jouer({ type: 'concentration' })}>
                <Ionicons name="hourglass" size={18} color={couleurs.principale} />
                <Text style={styles.textePetiteAction}>+2</Text>
              </Pressable>
              <Pressable
                style={[styles.petiteAction, !possibles.peutChanger && styles.boutonDesactive]}
                onPress={() => setChoixChangement(true)}
                disabled={!possibles.peutChanger}
              >
                <Ionicons name="swap-horizontal" size={18} color={couleurs.principale} />
                <Text style={styles.textePetiteAction}>{possibles.coutRetraite}</Text>
              </Pressable>
              <Pressable
                style={[styles.petiteAction, styles.actionCarte, !possibles.supporterDispo && styles.boutonDesactive]}
                onPress={() => jouer({ type: 'supporter' })}
                disabled={!possibles.supporterDispo}
              >
                <Image source={trouverCarte(campJoueur.supporter.numero).image} style={styles.vignette} />
                <Text style={styles.texteCarteAction} numberOfLines={2}>
                  {fichesSupporters[campJoueur.supporter.numero].texte}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.petiteAction, styles.actionCarte, !possibles.objetDispo && styles.boutonDesactive]}
                onPress={() => jouer({ type: 'objet' })}
                disabled={!possibles.objetDispo}
              >
                <Image source={trouverCarte(campJoueur.objet.numero).image} style={styles.vignette} />
                <Text style={styles.texteCarteAction} numberOfLines={2}>
                  {fichesObjets[campJoueur.objet.numero].texte}
                </Text>
              </Pressable>
            </View>
            {possibles.talent && (
              <Pressable
                style={[styles.boutonTalent, !possibles.talentDispo && styles.boutonDesactive]}
                onPress={() => jouer({ type: 'talent' })}
                disabled={!possibles.talentDispo}
              >
                <Ionicons name="sparkles" size={14} color={couleurs.principaleFoncee} />
                <Text style={styles.texteTalent}>
                  Talent · {possibles.talent.nom} : {possibles.talent.texte}
                </Text>
              </Pressable>
            )}
          </>
        )}
      </View>

      {/* Choisir un combattant du banc (changement volontaire ou après un KO) */}
      <Modal visible={choixChangement || etat.remplacementEnAttente === 'joueur'} transparent animationType="fade">
        <View style={styles.fondModal}>
          <View style={styles.feuille}>
            <Text style={styles.titreFeuille}>
              {etat.remplacementEnAttente === 'joueur' ? 'KO ! Qui entre en jeu ?' : 'Qui remplace ' + (campJoueur.actif ? campJoueur.actif.nom : '') + ' ?'}
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
                  <CarteCombat combattant={combattant} largeur={70} />
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
          <View style={styles.feuilleResultat}>
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
            <Pressable style={styles.boutonRejouer} onPress={rejouer}>
              <Text style={styles.texteRejouer}>Rejouer</Text>
            </Pressable>
            <Pressable style={styles.boutonAnnuler} onPress={() => router.back()}>
              <Text style={styles.texteAnnuler}>Retour</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <CinematiqueUltime cinematique={cinematique} quandFinie={quandCinematiqueFinie} />
    </LinearGradient>
  )
}
