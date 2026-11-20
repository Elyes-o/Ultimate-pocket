// Les 5 onglets du menu principal, avec la barre de navigation en bas (BarreOnglets)
// Le fond et le bandeau (avatar + monnaie) sont dans chaque onglet (composant EcranOnglet).
import { Tabs } from 'expo-router'
import BarreOnglets from '../../src/composants/BarreOnglets'
import { useEffetsSonores } from '../../src/sons'

// Liste des onglets : nom du fichier et titre affiché (icônes et dessin : BarreOnglets)
const onglets = [
  { nom: 'accueil', titre: 'Accueil' },
  { nom: 'boutique', titre: 'Boutique' },
  { nom: 'combat', titre: 'Combat' },
  { nom: 'collection', titre: 'Collection' },
  { nom: 'communaute', titre: 'Communauté' },
]

export default function MiseEnPageOnglets() {
  const { jouerSon } = useEffetsSonores()

  return (
    <Tabs
      tabBar={(proprietes) => <BarreOnglets {...proprietes} />}
      screenListeners={{ tabPress: () => jouerSon('clic') }}
      // Pas d'en-tête automatique : chaque onglet dessine son fond OPAQUE et son bandeau (EcranOnglet).
      // La scène reste transparente (voir app/_layout.jsx).
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: 'transparent' } }}
    >
      {onglets.map((onglet) => (
        <Tabs.Screen
          key={onglet.nom}
          name={onglet.nom}
          options={{ title: onglet.titre }}
        />
      ))}
    </Tabs>
  )
}
