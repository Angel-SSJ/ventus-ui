module.exports = {
	source: "src",
	output: "dist",
	targets: [
		[
			"commonjs",
			{
				configFile: true,
				copyFlow: false,
			},
		],
		[
			"module",
			{
				configFile: true,
				copyFlow: false,
			},
		],
		[
			"typescript",
			{
				project: "tsconfig.json",
				tsc: "./node_modules/.bin/tsc",
			},
		],
	],
};
