const user = navigator.userAgent;
const os = user.substring(user.indexOf('(') + 1, user.indexOf(';'));

const checkVersionLength = (str, begin) => {
    return str.split('').findIndex((symbol, position) => (symbol === ' ') && (position > begin));
};

let browser;
let version;
let begin;

if (user.indexOf('Edge') > 0) {
    browser = 'Edge';
    begin = user.indexOf('Edge') + 5;
    version = user.substring(begin);
} else if (user.indexOf('OPR') > 0) {
    browser = 'Opera';
    begin = user.indexOf('OPR') + 4;
    version = user.substring(begin);
} else if (user.indexOf('Firefox') > 0) {
    browser = 'Firefox';
    begin = user.indexOf('Firefox') + 8;
    version = user.substring(begin);
} else if (user.indexOf('.NET') > 0) {
    browser = 'Internet Explorer';
    begin = user.indexOf('rv') + 3;
    version = user.substring(begin, checkVersionLength(user, begin));
} else if (navigator.vendor === 'Google Inc.' && user.indexOf('OPR') < 0) {
    browser = 'Chrome';
    begin = user.indexOf('Chrome') + 7;
    version = user.substring(begin, checkVersionLength(user, begin));
}

console.log(browser);
console.log(version);
console.log(location.href);
console.log(os);

