
# Secret Constant Computation using Lagrange Interpolation

This project computes the constant term (secret `c`) of a polynomial using Lagrange Interpolation from given polynomial roots in JSON format.

# Requirements
- Node.js (Version 12 or higher)

# Installation
1. Install Node.js from [nodejs.org](https://nodejs.org/).
2. Place `input1.json` and `input2.json` in the project directory.

# Running the Code
1. Navigate to the project directory.
2. Run the command:
   ```bash
   node <your-file-name.js>

# Input Format
- JSON with the following format:
   ```json
   {
     "keys": { "n": 3, "k": 2 },
     "1": { "base": "2", "value": "111" },
     "2": { "base": "10", "value": "7" },
     "3": { "base": "10", "value": "5" }
   }
   ```
   - `n`: Total roots
   - `k`: Minimum roots required
   - Each root has `base` and `value` for decoding `y`.
