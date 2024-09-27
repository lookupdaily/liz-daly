const path = require("node:path");
const sass = require("sass");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: ["./index.js", "./index.scss"],
	output: {
		path: path.resolve(__dirname, "_site"),
	},
	plugins: [new MiniCssExtractPlugin()],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
							implementation: require.resolve("sass"),
							api: "modern",
							sassOptions: {
								importers: [new sass.NodePackageImporter()],
							},
						},
					},
				],
			},
		],
	},
};
