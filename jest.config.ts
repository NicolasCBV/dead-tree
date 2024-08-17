import { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	clearMocks: true,
	collectCoverageFrom: ['**/*.ts'],
	coverageDirectory: './coverage',
	testEnvironment: 'node',
	testRegex: '.*\\.spec\\.ts$',
	testTimeout: 30000,

	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: '<rootDir>/',
	}),
};

export default config;
