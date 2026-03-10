import fs from "fs";

export default function (plop) {
	plop.setActionType("modify-json", function (answers, config, plop) {
		const fs = require("fs");
		const path = require("path");
		const filePath = path.resolve(plop.getDestBasePath(), config.path);

		let fileContent;
		try {
			fileContent = fs.readFileSync(filePath, "utf8");
		} catch (err) {
			throw new Error(`File not found: ${filePath}`);
		}

		const json = JSON.parse(fileContent);
		const updatedJson = config.transform(json, answers);
		fs.writeFileSync(
			filePath,
			JSON.stringify(updatedJson, null, 2) + "\n",
			"utf8",
		);
		return `Modified ${config.path}`;
	});

	plop.setGenerator("primitive", {
		actions: (data) => {
			const actions = [];
			const name = data.name;
			const pathName = `src/core/primitives`;

			// Create index file
			actions.push({
				path: `${pathName}/${name}/index.ts`,
				templateFile: "plop-templates/primitive-index.ts.hbs",
				type: "add",
			});
			// Create primitive file
			actions.push({
				path: `${pathName}/${name}/${name}.tsx`,
				templateFile: "plop-templates/primitive.tsx.hbs",
				type: "add",
			});
			// Create types file
			actions.push({
				path: `${pathName}/${name}/types.ts`,
				templateFile: "plop-templates/primitive.types.ts.hbs",
				type: "add",
			});
			// Create storybook file
			actions.push({
				path: `${pathName}/${name}/${name}.stories.tsx`,
				templateFile: "plop-templates/primitive.stories.tsx.hbs",
				type: "add",
			});
			// Create context file
			actions.push({
				path: `${pathName}/${name}/${name}.context.tsx`,
				templateFile: "plop-templates/primitive.context.tsx.hbs",
				type: "add",
			});

			// Modify package.json
			actions.push({
				path: "package.json",
				transform: (packageJson, answers) => {
					const primName = answers.name;
					const newExport = {
						import: `./dist/module/core/primitives/${primName}/index.js`,
						"react-native": `./src/core/primitives/${primName}/index.ts`,
						require: `./dist/commonjs/core/primitives/${primName}/index.js`,
						types: `./dist/typescript/src/core/primitives/${primName}/index.d.ts`,
					};

					packageJson.exports[`./${primName}`] = newExport;

					const sortedExports = {};
					Object.keys(packageJson.exports)
						.sort()
						.forEach((key) => {
							sortedExports[key] = packageJson.exports[key];
						});
					packageJson.exports = sortedExports;

					return packageJson;
				},
				type: "modify-json",
			});

			// SUCCESS MESSAGE
			actions.push(() => {
				console.log("\n✅ Primitive scaffolded successfully!");
				console.log(`\n📁 Files created:`);
				console.log(`   - src/core/primitives/${name}/${name}.tsx`);
				console.log(`   - src/core/primitives/${name}/index.ts`);
				console.log(`   - src/core/primitives/${name}/${name}.stories.tsx`);
				console.log(`   - src/core/primitives/${name}/${name}.test.tsx`);
				console.log(`\n📝 Files updated:`);
				console.log(`   - package.json`);

				return "Primitive created successfully";
			});

			return actions;
		},
		description: "Create a primitive",
		prompts: [
			{
				message: "Primitive name (e.g. context-menu):",
				name: "name",
				type: "input",
				validate: (value) => {
					if (!value) return "Primitive name is required";
					if (value.length < 3)
						return "Primitive name must be at least 3 characters long";
					if (
						value.includes("-") === false &&
						value.includes(" ") === false &&
						value.includes("_") === false &&
						value.includes(":") === false &&
						!/^[a-z0-9-]+$/.test(value)
					)
						return "Primitive name must be kebab-case (e.g. context-menu)";
					if (value.includes("_"))
						return "Primitive name cannot contain underscores (critical convention)";
					if (value.includes(" "))
						return "Primitive name cannot contain spaces (critical convention)";
					if (value.includes(":"))
						return "Primitive name cannot contain colons (critical convention)";
					return true;
				},
			},
		],
	});
}
