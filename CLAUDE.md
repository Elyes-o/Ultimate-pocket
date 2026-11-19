# CLAUDE.md — Ultimate Pocket

Ce fichier est lu au début de chaque session. Il résume TOUT ce qu'on sait sur l'application.
Si une info change, on met ce fichier à jour (et `docs/HISTORIQUE_SESSIONS.md`).

## En une phrase
Jeu vidéo de cartes à collectionner multi-univers (style Pokémon TCG Pocket) : on collectionne des
cartes de plusieurs univers appréciés (Zelda, One Piece, Hollow Knight...), on ouvre des boosters
et on se bat contre un bot, un boss ou un ami.

## Qui / comment travailler
- Développeur : Elyes (Epitech Marseille). Répondre en français.
- Avancer par PETITES VERSIONS : d'abord une version simple (ex. juste les menus), on étoffe ensuite.
- Pas de fichiers inutiles (pas de copies .txt) : seulement les vrais fichiers du projet.
- Conventions de code voulues :
  - code lisible par un débutant, avec des commentaires clairs ;
  - implémentations concises, réutiliser les fonctions existantes (pas de doublons) ;
  - boucles simples et noms de variables explicites (pas de raccourcis "malins") ;
  - HTML / CSS / JS dans des fichiers séparés ;
  - noms de variables en français pour tout ce qui touche à l'interface ;
  - éviter les solutions trop complexes (ex. Bootstrap / SweetAlert2 plutôt que du sur-mesure si le web est utilisé).

## Direction artistique
Proche de l'écran de collection de Pokémon TCG Pocket (clair, arrondi, onglets en haut, barre de
navigation en bas, grille de cartes) mais en version moderne et personnelle.
Menus très aboutis, avec de la publicité INTÉGRÉE au jeu (panneau publicitaire, bandeaux).

## Parcours de l'application (vue d'ensemble)
1. Écran de chargement
2. Page de connexion / inscription (Clerk : Google, Apple, etc.)
3. Menu principal avec barre de navigation en bas : Accueil, Boutique, Combat, Collection, Communauté
4. Profil (icône en haut) avec paramètres et statistiques

Détail complet de chaque écran : `docs/ECRANS.md`.
Détail des modes de combat : `docs/MODES_DE_JEU.md`.

## Résumé des écrans
| Écran | Contenu principal |
|---|---|
| Chargement | Écran de démarrage de l'app |
| Login / Inscription | Clerk, connexion via Google, Apple, etc. |
| Accueil | Panneau publicitaire avec les grosses cartes ; boosters disponibles ; icône de profil |
| Profil | Paramètres classiques, victoires / défaites, meilleure carte, carte favorite (la plus jouée), etc. |
| Boutique | Acheter des packs avec la monnaie du jeu ou en regardant des pubs |
| Combat | Combat de boss ; solo contre le bot (plusieurs niveaux) ; contre une personne ; solo 5 cartes ; duo 6 cartes |
| Collection | Choisir une collection : Hollow Knight, Zelda, One Piece (d'autres plus tard) |
| Communauté | Ajouter des amis |

## Combat (décidé au grill du 2026-11-19) — détail dans `MODES_DE_JEU.md`
- Deck : 5 combattants (1 actif + 4 banc) + 1 Supporter + 1 Objet.
- **Jauge d'Énergie par joueur** (0-10) : départ 3, +2 par tour, gardée, +1 quand on prend des dégâts.
- 1 action par tour : attaquer (coût = symboles) / se concentrer (+2) / changer (coût de retraite).
- Supporter et Objet : gratuits, en plus de l'action, 1 fois chacun par combat.
- **Ultimes = combos de cartes** (Link+Zelda, Prodiges…), 7-10 Énergie, perdus si une carte du combo est KO.
- Seules les attaques de zone touchent le banc. Premier à 3 KO gagne.
- Bots : Facile, Normal, Difficile, Légendaire, Ultime (+20 à +200 Éclats).
- Toutes les attaques animées ; mini-cinématique pour les Ultimes.
- Fiche de chaque carte (attaques réécrites, combos) : `CARTES_COMBAT.md`.

### Combat v1 codé (2026-11-19)
- `src/donnees/combat.js` : fiches de combat, Supporters/Objets, combos (`disponible: true` = jouable), decks des bots, niveaux.
- `src/combat/moteur.js` : TOUTES les règles, sans affichage. `jouerAction(etat, camp, action)` renvoie un nouvel état.
  `etat.evenement` (avec un `id` qui augmente) sert à déclencher les animations.
- `src/combat/bot.js` : cerveau des bots Facile et Normal (`choisirActionsDuBot`).
- Écrans : `app/(onglets)/combat.jsx` (deck + bots), `app/deck.jsx`, `app/partie.jsx` (le combat).
- Composants : `CarteCombat` (élan, secousse, dégâts qui s'envolent), `JaugeEnergie`, `CinematiqueUltime`.
- Le deck et les statistiques (victoires, niveaux battus) sont sauvegardés dans `JoueurContexte`.
- Simplifications v1 : Impa choisit automatiquement (ton combattant le plus en forme / la carte adverse la
  plus faible) ; l'échange gratuit après l'attaque de Revali n'est pas codé.
- À équilibrer : Link (Prodige) avec les 4 Prodiges au banc fait 340 dégâts (one-shot).

## Règles de jeu connues (cartes)
- Format de carte type Pokémon : PV, attaque(s), type, faiblesse, coût de retraite, plus une ENDURANCE.
- Jauge d'ultime et raids contre un boss.
- Collectif façon FIFA : bonus si les cartes du deck sont du même univers (d'autres points communs seront ajoutés plus tard).
- Fusion de cartes / attaque duo (ex. Link + Zelda).
- Taille du deck : 5 cartes en combat solo, 6 cartes en combat duo.

## Visuels du jeu (générés avec Figma AI, 2026-11-19)
- Fichier Figma de travail : « Ultimate Pocket — Visuels » (équipe d'Elyes) : https://www.figma.com/design/3amaVdV0lvODQ4c2v4nYw3
- `assets/visuels/` : `cristal.png` (icône des Éclats, vectoriel à l'origine), `dos-carte.webp`,
  `booster-hyrule.webp`, `booster-grand-line.webp`, `booster-hallownest.webp` (fond retiré, transparents),
  `vitrine-collection.webp`, `vitrine-epee.webp`, `vitrine-prodiges.webp` (fonds de la vitrine, côté gauche calme
  pour le texte ; un voile sombre à gauche est ajouté dans `Vitrine.jsx`).
- `assets/icon.png` (+ `adaptive-icon.png`, `favicon.png`) : icône de l'app, déclarée dans `app.json`.
- Composants : `IconeEclat` (cristal), `DosCarte`, `PaquetBooster` (prop `visuel`, `verrouille`).
- Canva testé pour l'icône : propositions refusées (as de poker = image de casino, pas de TCG).
- Univers décrits sans reprendre logos/personnages officiels (risque de droits d'auteur).

## Données et assets
- 23 cartes illustrées de la collection BOTW (Breath of the Wild), dans `cards.zip` (fourni par Elyes), à utiliser dans le jeu.
- Exemples de cartes déjà évoquées : Link (Zelda), Luffy ex (One Piece), Prince Sidon (Zelda).
- Univers prévus : Hollow Knight, Zelda, One Piece.

## Stack technique (décidée le 2026-11-19)
- **Expo SDK 58** (React Native 0.88, React 19.3) : une seule base de code pour Android, iOS et web.
- Langage : JavaScript (pas TypeScript), pour rester lisible par un débutant.
- Navigation : **expo-router** (un fichier dans `app/` = un écran).
  - `app/index.jsx` chargement, `app/connexion.jsx`, `app/profil.jsx`
  - `app/(onglets)/` les 5 onglets (accueil, boutique, combat, collection, communaute) + `_layout.jsx` (barre du bas)
- `src/theme.js` : TOUTES les couleurs, espacements, arrondis, polices (Nunito). Ne pas mettre de couleur en dur ailleurs.
- `src/composants/` : morceaux réutilisables (BandeauHaut, Vitrine, BoosterQuotidien, PaquetBooster, CarteBooster, CarteCollection, EcranBientot, Logo).
- `src/ecrans/` : styles des écrans de `app/`. `src/donnees/` : cartes, contenu de l'accueil, JoueurContexte (faux joueur).
- Styles : React Native n'utilise pas de fichiers `.css` ; chaque composant a son fichier de styles
  à part (`StyleSheet`), ex. `Vitrine.jsx` + `Vitrine.styles.js`.
- Piège web : une `Image` ignore `aspectRatio` → la mettre dans une `View` qui a le ratio.
- Piège navigation : depuis un écran plein écran (ex. ouverture), pour aller sur un onglet faire
  `router.back()` puis `router.navigate('/onglet')`, PAS `router.replace` (sinon 2 barres d'onglets).
- Installer une dépendance : `npx expo install <paquet>` (choisit la version compatible avec le SDK).
- Lancer : `npm start` (QR code pour Expo Go), `npm run web`, `npm run android`, `npm run ios`.
- Clerk (imposé pour l'auth) : utiliser `@clerk/clerk-expo` (compatible Google / Apple).

## Décisions ouvertes (à trancher avec Elyes)
- Le multijoueur en ligne (combat contre une personne) demandera un backend temps réel.
- Prix des packs en Éclats, nombre de pubs par pack, liste des packs réservés aux Éclats.
- Chiffres du booster quotidien (provisoire : recharge 12 h, 1 Ticket = -1 h).
- Nombre de niveaux du bot, liste des boss, cartes des collections Hollow Knight et One Piece.
- Définition précise du duo (6 cartes = 2 joueurs x 3 cartes ? ou 1 joueur avec 6 cartes ?).

## Économie (décidée au grill du 2026-11-19)
- **1 seule monnaie : les Éclats** (icône cristal). Gagnés en jouant, achetables avec de l'argent réel.
- **Tickets** : gagnés via pubs, quêtes et connexion (jamais achetés avec de l'argent).
  Un Ticket fait avancer le minuteur du **booster quotidien gratuit**.
- Boutique : le nombre de pubs à regarder dépend du pack ; certains packs sont achetables
  UNIQUEMENT en Éclats.

## Version 1 des menus (décidée au grill du 2026-11-19)
- Login **factice** (boutons Google / Apple qui mènent à l'Accueil). Vrai Clerk en v2.
- Chargement : logo, barre de progression, astuce qui change.
- Bandeau en haut de TOUS les onglets : avatar + pseudo à gauche (→ Profil), Éclats + « + » à droite (→ Boutique).
- Accueil : vitrine du jeu qui défile (grosses cartes, PAS de vraie pub de marque), puis booster
  quotidien (minuteur + « Utiliser un ticket »), puis liste des boosters.
- Collection Zelda complète : grille des 23 cartes, cartes manquantes en silhouette grise + numéro, compteur « 9 / 23 ».
- Boutique, Combat, Communauté, Profil : écran « Bientôt » soigné.
- Les données du joueur sont fausses (fichiers dans `src/donnees/`) tant qu'il n'y a pas de backend.

## Ouverture de booster (v1.1, 2026-11-19)
- Déclenchée par le booster quotidien (« Ouvrir » quand le minuteur est à 0) ou par Hyrule (confirmation, 100 Éclats).
- Écran `app/ouverture.jsx` en 3 étapes : paquet qui flotte (toucher → secousse + flash) → 5 cartes révélées
  une par une (halo doré « RARE » 3★, violet « ULTRA RARE » 4★, badge « NOUVEAU ») → résumé + ajout à la collection.
- Tirage dans `src/donnees/tirage.js` : 5 cartes, emplacements 4 et 5 plus rares. Pourcentages PROVISOIRES.
- Les cartes possédées vivent dans `JoueurContexte`.

## Boutique (v1.3, 2026-11-19) — chiffres PROVISOIRES
- Booster **Hyrule** : 100 Éclats OU 3 pubs (progression « Pub 1/3 » sauvegardée par booster).
- Booster **Hyrule Légendaire** : 300 Éclats UNIQUEMENT (`nombrePubs: null`), tirage `legendaire`
  (3★ garantie en 5e carte, 4★ plus fréquentes). Ruban doré + étoile (`PaquetBooster legendaire`).
- **Tickets gratuits** : 1 pub = 1 Ticket, 5 par jour max (`PUBS_TICKETS_PAR_JOUR`), remis à zéro chaque jour.
- **Éclats** en argent réel : 500 / 1 200 / 2 600 (4,99 / 9,99 / 19,99 €) affichés « Bientôt », aucun paiement.
- Les pubs sont SIMULÉES (`FenetrePub`, 5 s). À remplacer par une vraie pub récompensée (ex. AdMob) plus tard.
- `ConfirmationAchat` : fenêtre d'achat partagée accueil + boutique. L'ouverture reçoit `/ouverture?booster=<id>`.

## Sauvegarde (v1.2, 2026-11-19)
- `JoueurContexte` sauvegarde Éclats, Tickets, minuteur du booster, cartes possédées et compteurs de pubs avec
  **AsyncStorage** (clé `ultimate-pocket:joueur`), à chaque changement. Relue au démarrage.
- Sauvegarde LOCALE à l'appareil (pas encore de compte en ligne ; viendra avec Clerk + backend).
- L'écran de chargement attend `donneesChargees` avant de passer à la connexion.
- Repartir de zéro sur le web : console du navigateur → `localStorage.removeItem('ultimate-pocket:joueur')`.
