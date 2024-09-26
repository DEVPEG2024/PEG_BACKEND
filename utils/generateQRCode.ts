export function generateQRCode() {
  // Partie basée sur le temps : Date actuelle en millisecondes, convertie en base 36 pour diversité
  const partieTemps = Date.now().toString(36);

  // Première partie aléatoire : Nombre aléatoire converti en base 36 pour diversité
  const premierePartieAleatoire = Math.random().toString(36).substring(2, 15);

  // Seconde partie aléatoire : Autre nombre aléatoire pour plus de complexité
  const secondePartieAleatoire = Math.random().toString(36).substring(2, 15);

  // Troisième partie aléatoire : Encore un autre nombre aléatoire pour étendre la longueur
  const troisiemePartieAleatoire = Math.random().toString(36).substring(2, 15);

  // Combinaison des parties pour un ID unique plus long
  const idUnique = `${partieTemps}-${premierePartieAleatoire}-${secondePartieAleatoire}-${troisiemePartieAleatoire}`;

  return idUnique;
}
