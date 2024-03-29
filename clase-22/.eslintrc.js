module.exports = {
    'env': {
        'commonjs': true,
        'es2021': true,
        'node': true,
        'jest/globals': true
    },
    'plugins': ['jest'],
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 'latest'
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'windows'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ]
    }
}
