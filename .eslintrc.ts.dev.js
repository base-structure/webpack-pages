module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
        // 优先使用 interface 而不是 type
        '@typescript-eslint/consistent-type-definitions': [
            "error",
            "interface"
        ],
        "no-alert": 0,
        "no-console": [ 0, { "allow": ["warn", "error"] }],
        "no-debugger": 0,
        "no-extra-semi": 0,
        "no-unreachable": 0,
        "eqeqeq": [0, "always"],
        "indent": [1, 4],
        "semi": [0, "always"],
        "no-unused-vars": [0]
    }
}