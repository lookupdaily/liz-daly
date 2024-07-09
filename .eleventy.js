module.exports = (eleventyConfig) => {
	eleventyConfig.addPassthroughCopy("src/assets");

	return {
		passthroughFileCopy: true,
		dir: {
			input: "src/views",
		},
	};
};
