# Modes de jeu et règles

## Modes de combat
1. **Solo contre le bot** : 5 niveaux à débloquer (voir plus bas). ← première version
2. **Combat de boss** : raid contre un boss (plus tard).
3. **Contre une personne** : combat en ligne contre un ami de la Communauté (plus tard, demande un serveur).
4. **Duo** : 6 cartes (à préciser : 2 joueurs x 3 cartes, ou 1 joueur avec 6 cartes).

## Règles du combat (décidées au grill du 2026-11-19)

### Le deck
- **5 combattants** : 1 **actif** (celui qui se bat) + 4 sur le **banc**.
- **1 Supporter** et **1 Objet** (cartes sans PV).

### L'Énergie (la ressource à gérer)
- **Une jauge par joueur**, partagée par toute l'équipe, de 0 à **10**.
- Départ à **3/10**. **+2 au début de chaque tour.** L'énergie non dépensée est **gardée**.
- **+1 Énergie chaque fois qu'on prend des dégâts** (permet de revenir quand on est mené).
- Une attaque coûte **autant d'Énergie que de symboles** sur la carte.

### Un tour
1. (Optionnel, gratuit) Jouer son **Supporter** et/ou son **Objet** — **une seule fois chacun par combat**.
2. **Une action** au choix :
   - **Attaquer** avec le combattant actif (payer le coût) ;
   - **Se concentrer** : pas d'attaque, **+2 Énergie** en plus ;
   - **Changer de combattant** : payer le **coût de retraite** en Énergie.
- Qui commence : tiré au hasard.

### Dégâts et KO
- Une attaque touche le **combattant actif** adverse.
- Seules les **attaques de zone** (ex. la foudre d'Urbosa) touchent **aussi le banc**.
- **Faiblesse** : dégâts **x2** si le type de l'attaquant correspond à la faiblesse de la cible.
- Un combattant à 0 PV est **KO** ; son propriétaire choisit le remplaçant sur le banc.
- **Victoire : le premier à 3 KO gagne.**

### Les Ultimes (combos de cartes)
- Pas imprimés sur les cartes : ils se débloquent quand **certaines cartes sont réunies** dans l'équipe.
- Coût : **7 à 10 Énergie** (il faut économiser plusieurs tours).
- Le combattant actif doit faire partie du combo.
- **Si une carte du combo est KO, l'Ultime n'est plus disponible** (contre-jeu : la viser avec une attaque de zone).
- Chaque Ultime a une **mini-cinématique** (~3 s). Les attaques normales ont une animation courte.
- Liste des combos et effets : `CARTES_COMBAT.md`.

### Bots (5 niveaux à débloquer)
| Niveau | Comportement | Récompense (provisoire) |
|---|---|---|
| Facile | Joue au hasard, n'économise jamais | +20 Éclats |
| Normal | Plus grosse attaque possible, change avant le KO | +40 |
| Difficile | Économise pour ses Ultimes, vise les combos, garde son Supporter | +80 |
| Légendaire | Comme Difficile + deck plein de rares et 2 combos | +120 |
| Ultime | Boss : démarre à 5/10, anticipe les Ultimes, meilleur deck | +200 + badge |

- **+1 Ticket** pour la première victoire du jour. **+5 Éclats** en cas de défaite.

### Première version du combat (v1)
Écran Deck (5 combattants + 1 Supporter + 1 Objet parmi les cartes possédées) ; combat contre le bot
Facile et Normal ; 2 combos (Link + Zelda, Prodiges) ; animations simples + 1 cinématique d'Ultime ; récompenses.

## À définir plus tard
- Équilibrage des chiffres après les premières parties.
- Combat de boss, combat en ligne, mode duo.
- Bonus de collectif (ex. deck 100 % même univers = départ à 4/10 d'Énergie ?).
