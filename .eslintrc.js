module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint-config-es6",
    "rules": {
        "linebreak-style": [
            "off",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            0,
            "never"
        ],
        "func-names": [
            "error",
            "never"
        ],
        "no-console": "off",
        "no-require": [
            "off"
        ],
        "consistent-return": [
            "off"
        ],
        "no-loop-func": [
            "off"
        ],
        "indent": [
            "error",
            4,
            { "SwitchCase": 1 }
        ],
        "no-extend-native": [
            "error",
            { "exceptions": ["Array", "Function"] }]
    }
};