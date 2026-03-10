/// <reference types="jest" />
import "@testing-library/jest-native/extend-expect";

global.console = {
	...console,
	warn: jest.fn(),
};

jest.mock("react-native-reanimated", () => {
	const Reanimated = require("react-native-reanimated/mock");

	Reanimated.default.call = () => {};

	return Reanimated;
});

jest.mock("react-native-safe-area-context", () => ({
	SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
	SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
	useSafeAreaInsets: () => ({ bottom: 0, left: 0, right: 0, top: 0 }),
}));

// Limpiar Mocks después de cada prueba
afterEach(() => {
	jest.clearAllMocks();
});
