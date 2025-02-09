const markdownItDefList = require("markdown-it-deflist");

module.exports = (eleventyConfig) => {
	eleventyConfig.addPassthroughCopy("assets");
	eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItDefList));

	return {
		passthroughFileCopy: true,
		dir: {
			input: "views",
		},
	};
};
