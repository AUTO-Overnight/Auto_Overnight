module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo', '@babel/preset-typescript'],
		plugins: [
			['@babel/plugin-proposal-private-property-in-object', { loose: true }]
		]
	};
};
