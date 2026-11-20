# Écrans de l'application

## 0. Bandeau du haut (tous les onglets)
- À gauche : avatar + pseudo → ouvre le Profil.
- À droite : nombre d'**Éclats** + bouton « + » → ouvre la Boutique.

## 1. Écran de chargement
Affiché au lancement de l'app : logo, barre de progression, astuce qui change.

## 2. Page de connexion / inscription
- v1 : boutons **factices** qui mènent directement à l'Accueil.
- Authentification avec **Clerk** (v2).
- Connexion avec un compte Google, Apple, etc.
- Inscription et connexion sur la même page (ou deux onglets).

## 3. Accueil (menu principal)
- **Panneau publicitaire** : vitrine du jeu qui défile, avec de GROSSES cartes (cartes du moment, nouvelle collection).
- **Booster quotidien gratuit** juste en dessous : minuteur + bouton « Utiliser un ticket » (1 Ticket = -1 h, provisoire).
- **Boosters disponibles** : liste des packs qu'on peut ouvrir.
- **Icône de profil** : un clic ouvre la page Profil.
- Barre de navigation en bas (voir plus bas).

## 4. Profil
Ouvert en cliquant sur l'icône de profil.
- **Avatar** (une carte possédée, recadrée sur le dessin) et **pseudo** modifiables.
- **Victoires**, **défaites**, taux de victoire, **bots battus** (médailles).
- **Meilleure carte** (la plus rare) et **carte favorite** (la plus jouée en combat).
- Paramètres : son, vibrations, langue, se déconnecter, recommencer la partie (avec confirmation).

## 5. Barre de navigation (en bas)
| Onglet | Rôle |
|---|---|
| Accueil | Panneau pub, boosters, profil |
| Boutique | Acheter des packs |
| Combat | Choisir un mode de combat |
| Collection | Voir ses cartes par univers |
| Communauté | Gérer ses amis |

## 6. Boutique
- **Boosters** : achat en Éclats, ou gratuit après X pubs ; certains boosters (Légendaire) en Éclats uniquement.
- **Tickets gratuits** : 1 pub = 1 Ticket, limité par jour.
- **Éclats** : packs en argent réel (affichés « Bientôt » en v1).
- **Prochainement** : boosters des univers à venir (verrouillés).

## 7. Combat (menu)
Choix du mode (détail dans `MODES_DE_JEU.md`) :
- Combat de boss
- Solo contre le bot (plusieurs niveaux)
- Contre une personne
- Solo : 5 cartes dans le deck
- Duo : 6 cartes

## 8. Collection
- Écran de choix : on clique sur la collection voulue.
- Collections prévues : **Hollow Knight**, **Zelda**, **One Piece** (d'autres plus tard).
- Affichage en grille de cartes, façon Pokémon TCG Pocket (onglets en haut).
- Zelda : 23 cartes BOTW déjà disponibles.
- Cartes non possédées : silhouette grise + numéro ; compteur « possédées / total » en haut.
- Paliers de récompenses à 25 / 50 / 75 / 100 % sous le compteur (cadeau à réclamer).
- Doublons : pastille « ×2 » sur la carte, bouton pour tout recycler en Éclats.
- Filtres : Toutes / Possédées / Manquantes, rareté, catégorie.
- Appui sur une carte possédée : fiche complète (carte inclinable, stats de combat, combos, exemplaires).

## 9. Communauté
- Ajouter des amis.
- Les amis servent aussi pour affronter une personne (mode combat en ligne).
