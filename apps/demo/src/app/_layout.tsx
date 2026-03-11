import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import React from "react";
import { useColorScheme, View } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import AppTabs from "@/components/app-tabs";
import { STORYBOOK_ENABLED } from "../../env";

let StorybookUIRoot: any = null;
if (STORYBOOK_ENABLED) {
	StorybookUIRoot = require("../../.storybook").default;
}

export default function RootLayout() {
	const colorScheme = useColorScheme();

	if (STORYBOOK_ENABLED && StorybookUIRoot) {
		return (
			<View style={{ flex: 1 }}>
				<StorybookUIRoot />
			</View>
		);
	}

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<AnimatedSplashOverlay />
			<AppTabs />
		</ThemeProvider>
	);
}
