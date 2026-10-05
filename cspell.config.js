import { defineConfig } from 'cspell'

export default defineConfig({
  version: '0.2',
  dictionaryDefinitions: [
    {
      name: 'nb-no',
      path: './dictionaries/nb_NO.txt',
      addWords: true,
    },
    {
      name: 'custom-project-words',
      path: './dictionaries/custom-nb.txt',
      addWords: true,
    },
  ],
  dictionaries: ['nb-no', 'custom-project-words'],
  ignorePaths: [
    'node_modules',
    'dist',
    'dictionaries/**',
    'AGENTS.md',
    'cspell.config.js',
    'bun.lock',
  ],
})
