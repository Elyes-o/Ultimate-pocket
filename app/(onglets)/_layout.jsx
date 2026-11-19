// Les 5 onglets du menu principal, avec la barre de navigation en bas
// et le bandeau (avatar + monnaie) en haut de chaque onglet.
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import BandeauHaut from '../../src/composants/BandeauHaut'
import { couleurs, polices } from '../../src/theme'

// Liste des onglets : nom du fichier, titre affiché, icône (Ionicons)
const onglets = [
  { nom: 'accueil', titre: 'Accueil', icone: 'home' },
  { nom: 'boutique', titre: 'Boutique', icone: 'bag-handle' },
  { nom: 'combat', titre: 'Combat', icone: 'flash' },
  { nom: 'collection', titre: 'Collection', icone: 'albums' },
  { nom: 'communaute', titre: 'Communauté', icone: 'people' },
]

export default function MiseEnPageOnglets() {
  return (
    <Tabs
      screenOptions={{
        header: () => <BandeauHaut />,
        sceneStyle: { backgroundColor: couleurs.fond },
        tabBarActiveTintColor: couleurs.principale,
        tabBarInactiveTintColor: '#A3AAC0',
        tabBarLabelStyle: { fontFamily: polices.grasse, fontSize: 10.5 },
        tabBarItemStyle: { paddingHorizontal: 0 },
        tabBarStyle: {
          backgroundColor: couleurs.surface,
          borderTopWidth: 0,
          height: 72,
          paddingTop: 8,
          paddingBottom: 10,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          position: 'absolute',
          shadowColor: '#1B2440',
          shadowOpacity: 0.08,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: -4 },
          elevation: 12,
        },
      }}
    >
      {onglets.map((onglet) => (
        <Tabs.Screen
          key={onglet.nom}
          name={onglet.nom}
          options={{
            title: onglet.titre,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? onglet.icone : onglet.icone + '-outline'} size={24} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  )
}
