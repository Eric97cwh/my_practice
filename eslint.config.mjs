import globals from "globals";
import js from "@eslint/js";
import jestPlugin from "eslint-plugin-jest";

export default [
  // Base JS configuration
  js.configs.recommended,

  // Node.js-specific config
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node,  // Adds Node.js globals (require, module, process)
        ...globals.es2021 // Adds ES2021 globals
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module" // For ES modules
      }
    },
    rules: {
      "semi": ["error", "always"],
      "no-unused-vars": "warn",
      "no-console": "off" // Adjust based on your preference
    }
  },
  {
    files: ["**/*.test.js"],
    plugins: {
      jest: jestPlugin
    },
    languageOptions: {
      globals: {
        ...globals.jest
      }
    },
    rules: {
      ...jestPlugin.configs.recommended.rules
    }
  },

  // Browser-specific config (if needed)
  {
    files: ["**/public/*.js"],
    languageOptions: {
      globals: globals.browser
    }
  }
];