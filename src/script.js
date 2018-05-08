const user = navigator.userAgent;
const os = user.substring(user.indexOf('(') + 1, user.indexOf(';'));

const checkVersionLength = (str, begin) => {
    return str.split('').findIndex((symbol, position) => (symbol === ' ') && (position > begin));
};

let browser;
let version;
let begin;

switch (true) {
    case user.includes('Edge'):
        browser = 'Edge';
        begin = user.indexOf('Edge') + 5;
        version = user.substring(begin);
        break;
    case user.includes('OPR'):
        browser = 'Opera';
        begin = user.indexOf('OPR') + 4;
        version = user.substring(begin);
        break;
    case user.includes('Firefox'):
        browser = 'Firefox';
        begin = user.indexOf('Firefox') + 8;
        version = user.substring(begin);
        break;
    case user.includes('.NET'):
        browser = 'Internet Explorer';
        begin = user.indexOf('rv') + 3;
        version = user.substring(begin, checkVersionLength(user, begin));
        break;
    case (navigator.vendor === 'Google Inc.' && !user.includes('OPR')):
        browser = 'Chrome';
        begin = user.indexOf('Chrome') + 7;
        version = user.substring(begin, checkVersionLength(user, begin));
        break;
}

console.log(browser);
console.log(version);
console.log(location.href);
console.log(os);
