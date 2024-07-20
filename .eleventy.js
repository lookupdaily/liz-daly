module.exports = (eleventyConfig) => {
	eleventyConfig.addPassthroughCopy({ "src/assets": "assets/" });

	return {
		passthroughFileCopy: true,
		dir: {
			input: "src/views",
		},
	};
};
