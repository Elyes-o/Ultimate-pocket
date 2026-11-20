// Cadre commun aux 5 onglets : le fond du jeu (FondJeu) + le bandeau du haut (avatar, Tickets, Éclats),
// puis le contenu de l'onglet. Chaque onglet dessine ainsi SON propre fond, opaque.
import FondJeu from './FondJeu'
import BandeauHaut from './BandeauHaut'

export default function EcranOnglet({ children }) {
  return (
    <FondJeu>
      <BandeauHaut />
      {children}
    </FondJeu>
  )
}
