const isIE = () => {
    const user = navigator.userAgent;

    return (user.includes('.NET') || user.includes('Edge'));
};