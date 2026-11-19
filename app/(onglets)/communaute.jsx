// Onglet Communauté : écran "Bientôt" en v1.
import EcranBientot from '../../src/composants/EcranBientot'

export default function EcranCommunaute() {
  return (
    <EcranBientot
      icone="people"
      titre="Communauté"
      description="Ajoute tes amis pour comparer vos collections et vous affronter en ligne."
      degrade={['#1FB6E6', '#4FD8C4']}
    />
  )
}
