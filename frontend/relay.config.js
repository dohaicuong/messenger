module.exports = {
  src: './src',
  schema: './schema.graphql',
  language: 'typescript',
  // artifactDirectory: './src/__relay__',
  exclude: [
    '**/node_modules/**',
    '**/__mocks__/**',
    '**/__generated__/**'
  ],
}
