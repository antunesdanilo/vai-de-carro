export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom', // Ambiente de DOM simulado
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest", // Transpila JSX e JS com Babel
  },
  transformIgnorePatterns: [
    "/node_modules/(?!@testing-library/react).+\\.js$"  // Permite que dependências específicas como @testing-library sejam processadas
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setup-tests.js'], // Arquivo de setup dos testes
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'], // Extensões dos arquivos suportados
  testPathIgnorePatterns: ['/node_modules/', '/build/'], // Ignora pastas indesejadas
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
