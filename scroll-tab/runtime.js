// ref: https://jsfiddle.net/6spj1059/
const isFirefox = typeof InstallTrigger !== "undefined";

// Override window.chrome if is Firefox
chrome = isFirefox ? browser : chrome;