/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  //important: true,
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      listStyleType: {
        none: 'none',
        disc: 'disc',
        decimal: 'decimal',
        square: 'square',
        roman: 'upper-roman',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
  corePlugins: {
    preflight: false,
  },
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}'],
  },
}

