// Onglet Combat : écran "Bientôt" en v1.
import EcranBientot from '../../src/composants/EcranBientot'

export default function EcranCombat() {
  return (
    <EcranBientot
      icone="flash"
      titre="Combat"
      description="Affronte le bot, un boss en raid ou un ami. Deck solo de 5 cartes ou duo de 6 cartes."
      degrade={['#E2483D', '#FF8A5B']}
    />
  )
}
