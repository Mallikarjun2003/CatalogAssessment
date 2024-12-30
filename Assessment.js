const fs = require("fs");

// Function to decode a value from a given base to decimal
function decodeEncodedValue(base, encodedValue) {
  return parseInt(encodedValue, base); // Converts encoded value from the specified base to decimal
}

// Function to perform Lagrange interpolation and compute the secret (constant term f(0))
function computeLagrangeInterpolation(dataPoints) {
  let secretValue = 0;
  const totalPoints = dataPoints.length;

  for (let i = 0; i < totalPoints; i++) {
    let xi = dataPoints[i][0]; // x-coordinate (root)
    let yi = dataPoints[i][1]; // y-coordinate (value at root)

    let lagrangeMultiplier = 1;
    // Calculate Lagrange basis polynomial L_i(x) at x = 0
    for (let j = 0; j < totalPoints; j++) {
      if (i !== j) {
        let xj = dataPoints[j][0];
        lagrangeMultiplier *= (0 - xj) / (xi - xj); // Basis polynomial at x = 0
      }
    }
    secretValue += yi * lagrangeMultiplier; // Add the contribution of the basis polynomial
  }

  return secretValue;
}

// Main function to read JSON input, decode the points, and compute the secret constant term
function computeSecretConstant(inputFilePath) {
  const inputData = JSON.parse(fs.readFileSync(inputFilePath, "utf8"));

  const totalRoots = inputData.keys.n; // Total number of polynomial roots
  const minimumRootsRequired = inputData.keys.k; // Minimum number of roots needed (k = m + 1)

  // Decode the points (x, y)
  const dataPoints = [];
  for (let i = 1; i <= totalRoots; i++) {
    if (inputData[i]) {
      const xValue = i; // The key represents the x-value (root)
      const baseValue = parseInt(inputData[i].base); // Base for decoding the y-value
      const encodedYValue = inputData[i].value; // Encoded y-value
      const decodedYValue = decodeEncodedValue(baseValue, encodedYValue); // Decode the y-value from its base
      dataPoints.push([xValue, decodedYValue]);
    }
  }

  // Select the first 'k' points for interpolation (enough for determining the secret term)
  const selectedPoints = dataPoints.slice(0, minimumRootsRequired);

  // Calculate the constant (secret) term using Lagrange interpolation
  const secretConstant = computeLagrangeInterpolation(selectedPoints);

  console.log("Calculated secret constant (c):", secretConstant);
}

// Execute the function for both input files
computeSecretConstant("input1.json");
computeSecretConstant("input2.json");
