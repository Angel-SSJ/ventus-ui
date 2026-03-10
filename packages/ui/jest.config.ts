import type { Config } from "jest";

const config: Config = {
	automock: false,
	bail: 1,
	collectCoverage: true,
	collectCoverageFrom: [
		"src/**/*.{js,jsx,ts,tsx}",
		"!src/**/*.d.ts",
		"!src/**/types.ts",
		"!src/**/index.ts",
		"!src/core/utils/**/*.{ts,tsx}",
		"!src/core/hooks/**/*.{ts,tsx}",
	],
	coverageDirectory: "__test__",
	coverageProvider: "babel",
	displayName: { color: "gray", name: "ventus-ui-core" },
	haste: {
		enableSymlinks: false,
		platforms: ["ios", "android"],
		throwOnModuleCollision: true,
	},
	maxConcurrency: 5,
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
	preset: "react-native",
	randomize: false,
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	testEnvironment: "node",
	transformIgnorePatterns: [
		"node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
	],
	verbose: true,
	watchman: true,
};

export default config;
