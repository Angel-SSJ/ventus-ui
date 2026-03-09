module.exports = {
	overrides: [
		{
			exclude: /\/node_modules\//,
			presets: ["module:react-native-builder-bob/babel-preset"],
			plugins: [
				[
					"module-resolver",
					{
						root: ["./"],
						alias: {
							"@": "./src",
						},
					},
				],
			],
		},
		{
			include: /\/node_modules\//,
			presets: ["module:@react-native/babel-preset"],
		},
	],
};
