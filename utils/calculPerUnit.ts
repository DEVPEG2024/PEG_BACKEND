function calculatePricePerUnit(price: number, weightOrVolume: string): { value: number; unit: string } {
    // Extraire la valeur numérique et l'unité de la chaîne weightOrVolume
    const regex = /^([\d\.]+)(kg|g|l|ml|unit)$/i;
    const match = weightOrVolume.match(regex);
  
    if (!match) {
      throw new Error("Format de poids ou volume invalide. Utilisez des formats comme '253g', '1kg', '500ml', ou '1unit'.");
    }
  
    const numericValue = parseFloat(match[1]);
    const unit = match[2].toLowerCase();
  
    let pricePerUnit: number;
    let unitLabel: string;
  
    // Calculer en fonction de l'unité fournie
    if (unit === 'g') {
      pricePerUnit = (price / numericValue) * 1000; // Convertir en prix par kilogramme
      unitLabel = 'kg';
    } else if (unit === 'kg') {
      pricePerUnit = price / numericValue;
      unitLabel = 'kg';
    } else if (unit === 'ml') {
      pricePerUnit = (price / numericValue) * 1000; // Convertir en prix par litre
      unitLabel = 'l';
    } else if (unit === 'l') {
      pricePerUnit = price / numericValue;
      unitLabel = 'l';
    } else if (unit === 'unit') {
      pricePerUnit = price / numericValue;
      unitLabel = 'unit';
    } else {
      throw new Error("Unité de mesure non prise en charge. Utilisez 'g', 'kg', 'ml', 'l', ou 'unit'.");
    }
  
    return {
      value: parseFloat(pricePerUnit.toFixed(2)), // Arrondir à deux décimales
      unit: unitLabel
    };
  }
  
// Exemple d'utilisation
//   const productPrice = 3.99;
//   const productWeight = "253g"; // Peut aussi être "1kg", "500ml", "1unit", etc.
  
//   const pricePerUnit = calculatePricePerUnit(productPrice, productWeight);
  