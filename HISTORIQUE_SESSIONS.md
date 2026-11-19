# Historique des sessions

## Sessions précédentes (début du projet)
- Idée : jeu de cartes multi-univers, cartes au format Pokémon (PV, attaques, faiblesse, retraite).
- Modes voulus : solo contre l'ordinateur ET en ligne à deux joueurs.
- Menus très aboutis avec publicité intégrée (bandeaux pour les cartes du moment et la nouvelle collection).
- Direction artistique : proche de Pokémon TCG Pocket, en version moderne et personnelle.
- Fourniture de 23 cartes BOTW (cards.zip).
- Système de combat : jauge d'ultime, raids, collectif façon FIFA, fusion / attaque duo, endurance.
- Décision : deck de 5 cartes.
- Préférences : pas de copies .txt inutiles ; avancer par petites versions (d'abord les menus).

## Session du 2026-11-19 — description approfondie de l'app
- Écran de chargement.
- Page login / inscription avec Clerk (Google, Apple, etc.).
- Accueil : panneau publicitaire avec les grosses cartes, boosters disponibles, icône de profil.
- Profil : paramètres classiques, victoires / défaites, meilleure carte, carte favorite la plus jouée.
- Barre de navigation : Accueil, Boutique, Combat, Collection, Communauté.
- Boutique : packs achetables avec la monnaie du jeu ou des pubs.
- Combat : boss, solo contre le bot (plusieurs niveaux), contre une personne, solo 5 cartes, duo 6 cartes.
- Collection : choix de la collection (Hollow Knight, Zelda, One Piece).
- Communauté : ajouter des amis.
- Demande : tenir un CLAUDE.md et des README avec tout ce qu'on sait, session après session.

## Session du 2026-11-19 — choix de la stack
- Essai de React + Vite (web seul), puis passage à **Expo** (React Native) pour viser mobile + web.
- Expo SDK 58 installé, Vite retiré ; écran minimal « Ultimate Pocket » qui compile sur le web.
- Styles dans des fichiers séparés (`*.styles.js`) puisque React Native n'utilise pas de CSS.

## Session du 2026-11-19 — grill des menus (skill grill-me)
- Login factice en v1 ; vitrine du jeu (pas de vraie pub) sur l'Accueil.
- Bandeau en haut partout (avatar à gauche, Éclats à droite).
- Économie : 1 monnaie « Éclats » + « Tickets » (pubs, quêtes, connexion) qui accélèrent le booster quotidien.
- Booster quotidien en grand sur l'Accueil sous la vitrine.
- Périmètre v1 : Accueil + Collection Zelda complets, le reste en « Bientôt ».
- Collection : silhouettes grises pour les cartes manquantes + compteur.
- Chargement : logo + barre + astuce.

## Session du 2026-11-19 — menus v1 + ouverture de booster
- Menus v1 codés (Expo + expo-router) : chargement, login factice, accueil, collection Zelda, écrans « Bientôt ».
- Ouverture de booster : 5 cartes, révélation une par une, rares mises en valeur, ajout à la collection.
- Achat du booster Hyrule pour 100 Éclats avec fenêtre de confirmation.
- Sauvegarde locale de la partie (AsyncStorage) : cartes, Éclats, Tickets et minuteur survivent au rechargement.
- Visuels générés avec Figma AI et intégrés : cristal des Éclats, dos de carte, 3 paquets de booster illustrés, icône de l'app.
  (Icônes Canva essayées puis refusées par Elyes.)
- Vitrine de l'accueil : 3 fonds illustrés (Figma AI) à la place des dégradés.

## Règle de mise à jour
À chaque nouvelle session : ajouter une section datée ici, puis mettre à jour `CLAUDE.md` si une décision change.
