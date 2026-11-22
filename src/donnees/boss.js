// Boss : Ganondorf, Roi Démon (combat à 2 phases). Chiffres PROVISOIRES.
// Il est SEUL face à tes 5 cartes : tu gagnes en le mettant KO, tu perds si 3 de tes cartes tombent.
// À la moitié de ses PV, il passe en phase 2 : nouvelles attaques, +1 Énergie par tour,
// et des miasmes (20 dégâts) frappent chaque carte de ton banc.

export const bossGanondorf = {
  id: 'ganondorf',
  numero: 122, // la carte Ganondorf VMAX (pour l'image et le type)
  nom: 'Ganondorf',
  nomPhase2: 'Ganondorf, Roi Démon',
  pv: 400,
  seuilPhase2: 200, // PV à partir desquels la phase 2 commence
  miasmesPhase2: 20, // dégâts sur chaque carte de ton banc au changement de phase
  energieBonusPhase2: 1, // Énergie en plus à chaque tour en phase 2
  attaquesPhase1: [
    { nom: 'Lame du Démon', cout: 1, degats: 30 },
    { nom: 'Onde Ténébreuse', cout: 2, degats: 50, effets: { zone: 10 } },
    { nom: 'Cataclysme du Roi Démon', cout: 4, degats: 100, effets: { energieAdverse: 1 } },
  ],
  attaquesPhase2: [
    { nom: 'Griffes du Roi Démon', cout: 2, degats: 70 },
    { nom: 'Fléau des Profondeurs', cout: 3, degats: 120, effets: { zone: 20, energieAdverse: 1 } },
  ],
  // Débloqué après avoir battu ce bot
  niveauRequis: 'difficile',
  // Récompenses : 1re victoire = booster offert + Éclats ; ensuite des Éclats, une fois par jour
  boosterPremiereVictoire: 'zelda-totk',
  eclatsPremiereVictoire: 300,
  eclatsVictoireDuJour: 100,
}
