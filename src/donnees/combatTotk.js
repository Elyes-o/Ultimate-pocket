// Données de combat de la collection Zelda : Tears of the Kingdom (numéros 101 à 134).
// Valeurs reprises des cartes fournies par Elyes. Même vocabulaire d'effets que combat.js.
// Les textes trop libres des cartes ont été traduits en effets que le moteur connaît (voir CARTES_COMBAT.md).

export const fichesCombattantsTotk = {
  // ----- 1★ -----
  101: { type: 'incolore', pv: 60, faiblesse: 'psy', retraite: 1, attaques: [{ nom: 'Coup de Massue', cout: 1, degats: 30 }] },
  102: { type: 'eau', pv: 50, faiblesse: 'electrique', retraite: 1, attaques: [{ nom: "Décharge d'eau", cout: 1, degats: 20, effets: { zone: 10 } }] },
  103: {
    type: 'plante', pv: 50, faiblesse: 'feu', retraite: 1,
    attaques: [{ nom: 'Jet de Gland', cout: 1, degats: 20 }],
    talent: { id: 'cachette', nom: 'Cachette', texte: 'Soin 20 au plus blessé de ton banc' },
  },
  104: { type: 'incolore', pv: 80, faiblesse: 'combat', retraite: 1, attaques: [{ nom: 'Crachat', cout: 2, degats: 40 }] },
  105: { type: 'combat', pv: 110, faiblesse: 'psy', retraite: 2, attaques: [{ nom: 'Lancer de Bokoblin', cout: 2, degats: 60, effets: { recul: 10 } }] },
  106: { type: 'tenebres', pv: 110, faiblesse: 'fee', retraite: 2, attaques: [{ nom: 'Ruée du Gibdo', cout: 2, degats: 60, effets: { recul: 10 } }] },
  107: {
    type: 'tenebres', pv: 80, faiblesse: 'fee', retraite: 1,
    attaques: [{ nom: 'Entaille Furtive', cout: 2, degats: 50, effets: { critique: { energieMin: 6, bonus: 30 } } }],
  },

  // ----- 2★ -----
  108: {
    type: 'incolore', pv: 110, faiblesse: 'electrique', retraite: 2,
    attaques: [
      { nom: 'Bourrasque de Babil', cout: 2, degats: 50, effets: { zone: 10 } },
      { nom: 'Flèche Critique', cout: 3, degats: 80, effets: { critique: { energieMin: 6, bonus: 30 } } },
    ],
  },
  109: {
    type: 'electrique', pv: 120, faiblesse: 'combat', retraite: 2,
    attaques: [
      { nom: 'Glisse Gerudo', cout: 2, degats: 60 },
      { nom: 'Foudre du Sage', cout: 3, degats: 90, effets: { zone: 20 } },
    ],
  },
  110: {
    type: 'eau', pv: 130, faiblesse: 'electrique', retraite: 2,
    attaques: [{ nom: "Vague d'eau", cout: 3, degats: 90, effets: { ignoreBouclier: true } }],
    talent: { id: 'bulleProtectrice', nom: 'Bulle Protectrice', texte: 'Soin 30 au plus blessé de ton banc' },
  },
  111: {
    type: 'feu', pv: 140, faiblesse: 'eau', retraite: 3,
    attaques: [
      { nom: 'Bouclier de Feu', cout: 1, degats: 20, effets: { bouclier: 40 } },
      { nom: 'Roulade du Sage', cout: 3, degats: 110, effets: { recul: 10 } },
    ],
  },
  112: {
    type: 'psy', pv: 120, faiblesse: 'tenebres', retraite: 2,
    attaques: [{ nom: 'Sphère Télékinétique', cout: 2, degats: 110, effets: { fatigue: true } }],
  },
  113: {
    type: 'tenebres', pv: 150, faiblesse: 'fee', retraite: 3,
    attaques: [
      { nom: 'Charge Miasmatique', cout: 2, degats: 70, effets: { ignoreBouclier: true } },
      { nom: 'Déflagration', cout: 4, degats: 140, effets: { zone: 20, recul: 20 } },
    ],
  },
  114: {
    type: 'dragon', pv: 150, faiblesse: 'fee', retraite: 3,
    attaques: [
      { nom: 'Garde Draconique', cout: 2, degats: 50, effets: { bouclier: 20 } },
      { nom: 'Triple Souffle', cout: 3, degats: 110, effets: { ignoreBouclier: true } },
    ],
  },

  // ----- 3★ : les Sages -----
  115: {
    type: 'incolore', pv: 120, faiblesse: 'electrique', retraite: 2,
    attaques: [{ nom: 'Tempête des Cieux', cout: 3, degats: 90, effets: { zone: 25 } }],
    talent: { id: 'rafaleCeleste', nom: 'Rafale Céleste', texte: '-1 ⚡ sur ta prochaine attaque ou retraite de ce tour' },
  },
  116: {
    type: 'electrique', pv: 140, faiblesse: 'combat', retraite: 2,
    attaques: [
      { nom: 'Cimeterre Électrique', cout: 2, degats: 70 },
      { nom: 'Orage Gerudo', cout: 3, degats: 100, effets: { zone: 20, energieAdverse: 1 } },
    ],
  },
  117: {
    type: 'eau', pv: 130, faiblesse: 'tenebres', retraite: 4,
    attaques: [{ nom: 'Sourire du Héros', cout: 3, degats: 100, effets: { zone: 20, soinBanc: 20 } }],
    talent: { id: 'mareeProtectrice', nom: 'Marée Protectrice', texte: 'Soin 40 au plus blessé de ton équipe' },
  },
  118: {
    type: 'feu', pv: 140, faiblesse: 'eau', retraite: 3,
    attaques: [{ nom: 'Détonation Goron', cout: 3, degats: 110, effets: { ignoreBouclier: true } }],
    talent: { id: 'bouleDeFeuSage', nom: 'Boule de Feu du Sage', texte: '-1 ⚡ sur ta prochaine attaque ou retraite de ce tour' },
  },
  119: {
    type: 'metal', pv: 130, faiblesse: 'feu', retraite: 3,
    attaques: [{ nom: "Frappe de l'Armure", cout: 2, degats: 60, effets: { soinBanc: 30 } }],
    talent: { id: 'eveilEsprit', nom: "Éveil de l'Esprit", texte: 'Soin 50 au plus blessé de ton équipe' },
  },

  // ----- 4★ -----
  120: {
    type: 'metal', pv: 220, faiblesse: 'tenebres', retraite: 5,
    attaques: [{ nom: 'Éclat de la Master Sword', cout: 3, degats: 160, effets: { bonusParSage: 20 } }],
    talent: { id: 'amalgame', nom: 'Amalgame', texte: 'Prochaine attaque +40 et perce les Boucliers' },
  },
  121: {
    type: 'fee', pv: 200, faiblesse: 'tenebres', retraite: 4,
    attaques: [
      { nom: 'Barrière de Lumière', cout: 1, degats: 40, effets: { bouclier: 40 } },
      { nom: 'Sceau du Crépuscule', cout: 3, degats: 150, effets: { bonusContre: { numero: 122, bonus: 100 }, bloque: true } },
    ],
  },
  122: {
    type: 'tenebres', pv: 250, faiblesse: 'fee', retraite: 5,
    attaques: [{ nom: 'Cataclysme du Roi Démon', cout: 3, degats: 180, effets: { energieAdverse: 2, bloque: true } }],
    talent: { id: 'mareeMiasmes', nom: 'Marée de Miasmes', texte: '20 dégâts à chaque carte du banc adverse' },
  },

  // ----- Secrètes (logo arc-en-ciel) : les Prodiges en vitrail -----
  131: {
    type: 'combat', pv: 200, faiblesse: 'plante', retraite: 3,
    attaques: [{ nom: 'Charge Colossale', cout: 2, degats: 160, effets: { recul: 40 } }],
    talent: { id: 'bouclierDarukEx', nom: 'Bouclier de Daruk', texte: 'Toujours actif : Daruk ne subit que la moitié des dégâts', passif: true },
  },
  132: {
    type: 'eau', pv: 120, faiblesse: 'plante', retraite: 2,
    attaques: [{ nom: 'Cascade Apaisante', cout: 2, degats: 60, effets: { zone: 60 } }],
    talent: { id: 'priereMiphaEx', nom: 'Prière de Mipha', texte: 'Rend la moitié de ses PV max au plus blessé de ton équipe' },
  },
  133: {
    type: 'incolore', pv: 150, faiblesse: 'electrique', retraite: 3,
    attaques: [
      { nom: 'Torpide Céleste', cout: 2, degats: 50, effets: { bloque: true } },
      { nom: 'Rafale Triangulaire', cout: 3, degats: 120, effets: { critique: { energieMin: 5, bonus: 40 } } },
    ],
  },
  134: {
    type: 'electrique', pv: 180, faiblesse: 'combat', retraite: 3,
    attaques: [{ nom: "Foudre d'Urbosa", cout: 3, degats: 150, effets: { zone: 20 } }],
    talent: { id: 'colereUrbosa', nom: "Colère d'Urbosa", texte: '20 dégâts à chaque carte du banc adverse' },
  },
}

// Les 5 Sages (pour « Éclat de la Master Sword » et le combo des Sages)
export const numerosSages = [115, 116, 117, 118, 119]

export const fichesSupportersTotk = {
  123: { effet: 'noia', texte: '+3 Énergie' },
  124: { effet: 'pruhaTotk', texte: '+2 Énergie, et -1 ⚡ sur ta prochaine attaque ce tour' },
  125: { effet: 'rauru', texte: 'Ton actif : Bouclier 20 permanent' },
  126: { effet: 'dragonBlanc', texte: 'Soin 40 à ton actif et +2 Énergie' },
}

export const fichesObjetsTotk = {
  127: { effet: 'bananes', texte: 'Prochaine attaque +40 (+70 si Kohga ou un Sbire Yiga est actif)' },
  128: { effet: 'bouclierHylia', texte: 'Ton actif : la prochaine attaque reçue fait 0 dégât' },
  129: { effet: 'fee', texte: 'Soin 70 au plus blessé de ton équipe' },
  130: { effet: 'masterSwordTotk', texte: 'Prochaine attaque +60 et perce les Boucliers' },
}

// Ultimes en combo de la collection (créés pour le jeu, chiffres provisoires)
export const combosTotk = [
  {
    id: 'sages',
    nom: 'Éveil des Sages',
    ultime: 'Lumière des Sages',
    groupes: [[120], numerosSages],
    cout: 8,
    degats: 200,
    effets: { ignoreBouclier: true },
    disponible: true,
  },
  {
    id: 'couronne',
    nom: "Héritiers d'Hyrule",
    ultime: 'Sceau Ancestral',
    groupes: [[120], [121]],
    cout: 9,
    degats: 220,
    zone: 30,
    disponible: true,
  },
  {
    id: 'yiga',
    nom: 'Clan Yiga',
    ultime: 'Embuscade Yiga',
    groupes: [[112], [107]],
    objet: 127,
    cout: 7,
    degats: 130,
    effets: { energieAdverse: 2 },
    disponible: true,
  },
  {
    id: 'roiDemon',
    nom: 'Armée du Roi Démon',
    ultime: 'Fléau des Profondeurs',
    groupes: [[122], [113, 106]],
    cout: 9,
    degats: 180,
    zone: 40,
    disponible: true,
  },
  {
    id: 'vitrail',
    nom: 'Prodiges de Vitrail',
    ultime: 'Rayons des Quatre Prodiges',
    groupes: [[131], [132], [133], [134]],
    cout: 10,
    degats: 180,
    zone: 60,
    disponible: true,
  },
]
