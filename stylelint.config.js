/** @type {import('stylelint').Config} */
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-tailwindcss',
  ],
  rules: {
    // Add any custom rules here
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'layer', 'theme'],
      },
    ],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
  },
}; 