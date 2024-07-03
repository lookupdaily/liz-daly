module.exports = (eleventyConfig) => {
	eleventyConfig.addPassthroughCopy("assets");

	return {
		passthroughFileCopy: true,
		dir: {
			input: "views",
		},
	};
};
