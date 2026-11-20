// Onglet Communauté : écran "Bientôt" en v1.
import EcranBientot from '../../src/composants/EcranBientot'
import EcranOnglet from '../../src/composants/EcranOnglet'

export default function EcranCommunaute() {
  return (
    <EcranOnglet>
      <EcranBientot
        icone="people"
        titre="Communauté"
        description="Ajoute tes amis pour comparer vos collections et vous affronter en ligne."
        degrade={['#1FB6E6', '#4FD8C4']}
      />
    </EcranOnglet>
  )
}
