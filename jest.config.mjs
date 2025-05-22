// jest.config.mjs
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['@testing-library/jest-dom', './jest.setup.js'], // Added ./jest.setup.js
  testEnvironment: 'jest-environment-jsdom',
  // preset: 'ts-jest', // Removed to let next/jest handle TypeScript transformation
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    // Handle CSS modules (if any, though not explicitly in registration-form.tsx)
    '\\.module\\.css$': 'identity-obj-proxy',
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'next.config.mjs',
    'postcss.config.mjs',
    'tailwind.config.ts',
    'components.json',
    'app/layout.tsx',
    'app/metadata.ts',
    'app/globals.css',
    'components/ui/',
    '.*.config.js', // Ignore other config files
    'coverage/', // Ignore coverage directory
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
