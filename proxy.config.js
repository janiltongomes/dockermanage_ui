const proxy = [
	{
		context: '/api',
		target: 'http://localhost:5000/api',
		pathRewrite: { '^/api': '' }
	}
];

module.exports = proxy;
