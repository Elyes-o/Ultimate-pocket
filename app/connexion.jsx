// Écran de connexion FACTICE (v1) : les boutons mènent directement à l'accueil.
// En v2, on branchera Clerk (@clerk/clerk-expo) sur ces mêmes boutons.
import { View, Text, Image, Pressable } from 'react-native'
import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import Logo from '../src/composants/Logo'
import { trouverCarte } from '../src/donnees/cartes'
import styles from '../src/ecrans/Connexion.styles'
import FondJeu from '../src/composants/FondJeu'

// Les 3 cartes en éventail en haut de l'écran
const cartesEventail = [
  { carte: trouverCarte(6), style: styles.carteGauche },
  { carte: trouverCarte(9), style: styles.carteDroite },
  { carte: trouverCarte(23), style: styles.carteCentre },
]

function entrerDansLeJeu() {
  router.replace('/accueil')
}

export default function EcranConnexion() {

  return (
    <FondJeu>
      <View style={styles.ecran}>
        <LinearGradient colors={['rgba(191, 227, 240, 0.25)', 'rgba(248, 250, 252, 0)']} style={styles.haut}>
          <View style={styles.eventail}>
            {cartesEventail.map((element) => (
              <Image key={element.carte.numero} source={element.carte.image} style={[styles.carte, element.style]} />
            ))}
          </View>
        </LinearGradient>

        <View style={styles.bas}>
          <Logo />
          <Text style={styles.slogan}>Tous tes univers préférés. Un seul deck.</Text>

          <Pressable style={[styles.bouton, styles.boutonApple]} onPress={entrerDansLeJeu}>
            <Ionicons name="logo-apple" size={20} color="#FFFFFF" />
            <Text style={[styles.texteBouton, styles.texteBoutonApple]}>Continuer avec Apple</Text>
          </Pressable>

          <Pressable style={[styles.bouton, styles.boutonGoogle]} onPress={entrerDansLeJeu}>
            <Ionicons name="logo-google" size={18} color="#EA4335" />
            <Text style={styles.texteBouton}>Continuer avec Google</Text>
          </Pressable>

          <Pressable onPress={entrerDansLeJeu}>
            <Text style={styles.lienInvite}>Jouer en invité</Text>
          </Pressable>

          <Text style={styles.mentions}>
            En continuant, tu acceptes les conditions d'utilisation et la politique de confidentialité.
          </Text>
        </View>
      </View>
    </FondJeu>
  )
}
