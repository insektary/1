module.exports = {
    "env": {
        "node": true,
        "es6": false
    },
    "extends": "eslint-config-airbnb-es5",
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
        ]
    }
};