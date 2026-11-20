# Ultimate Pocket

Jeu de cartes à collectionner multi-univers, inspiré de Pokémon TCG Pocket.
Collectionne des cartes de Zelda, One Piece, Hollow Knight et plus encore, ouvre des boosters,
construis ton deck et affronte un bot, un boss ou un ami.

> Statut : en développement (menus, boutique, boosters, combat contre 5 bots). Voir `CLAUDE.md` pour le résumé complet.

## Fonctionnalités prévues
- Écran de chargement et connexion / inscription avec Clerk (Google, Apple, etc.)
- Accueil : panneau publicitaire avec les grosses cartes du moment, boosters disponibles
- Profil : paramètres, victoires / défaites, meilleure carte, carte favorite
- Boutique : packs achetables avec la monnaie du jeu ou en regardant des pubs
- Combats : boss, solo contre le bot (plusieurs niveaux), contre une personne, solo (5 cartes), duo (6 cartes)
- Collection : une collection par univers (Hollow Knight, Zelda, One Piece...)
- Communauté : ajout d'amis

## Navigation
Barre en bas : **Accueil | Boutique | Combat | Collection | Communauté**
Le profil s'ouvre depuis l'icône en haut de l'accueil.

## Lancer le projet
1. `npm install`
2. **Ajouter les images des cartes** (elles ne sont pas sur GitHub, voir plus bas)
3. `npm start` (QR code pour Expo Go) ou `npm run web`

## Images des cartes (non publiées)
Les illustrations des 23 cartes Zelda ne nous appartiennent pas : elles ne sont **pas** dans ce dépôt
(dossier `images/` ignoré par git). Pour faire tourner le jeu, place-les dans `images/` à la racine,
avec ces noms (format `.webp`, 400 × 560) :
`bokoblin, daruk, gardien, hinox, impa, le-roi-d-hyrule, link, link-2, lynel, master-sword, mipha,
paravoile, pru-ha, revali, riju, sidon, sooga, tablette-sheikah, teba, terry, urbosa, yunobo, zelda`.

Les autres visuels (`assets/`), les bruitages et les musiques sont des créations originales du projet.

## Documentation
- `CLAUDE.md` : tout ce qu'on sait sur l'application (lu à chaque session)
- `ECRANS.md` : détail de chaque écran
- `MODES_DE_JEU.md` : modes de combat et règles du combat
- `CARTES_COMBAT.md` : fiche de combat de chaque carte et combos
- `HISTORIQUE_SESSIONS.md` : ce qui a été décidé, session par session
