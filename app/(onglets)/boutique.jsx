// Onglet Boutique : écran "Bientôt" en v1.
import EcranBientot from '../../src/composants/EcranBientot'

export default function EcranBoutique() {
  return (
    <EcranBientot
      icone="bag-handle"
      titre="Boutique"
      description="Achète des boosters avec tes Éclats, ou regarde des pubs pour en débloquer certains."
      degrade={['#5B4CF5', '#9B7BFF']}
    />
  )
}
