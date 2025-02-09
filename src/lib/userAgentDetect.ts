/**
 Forked from https://github.com/yousifalraheem/browser-detector
 */

function agentHas(keyword: string) {
    return navigator.userAgent.toLowerCase().search(keyword.toLowerCase()) > -1;
}

export function isIE() {
    // @ts-expect-error Expected to be available on IE only
    return !!(document as never).documentMode;
}

export function isSafari() {
    // @ts-expect-error Expected to be available on Safari-based only
    return (!!(window as never).ApplePaySetupFeature || !!(window as never).safari) && agentHas("Safari") && !agentHas("Chrome") && !agentHas("CriOS");
}

export function isChrome() {
    // @ts-expect-error Expected to be available on Chromium-based only
    return agentHas("CriOS") || agentHas("Chrome") || !!(window as never).chrome;
}

export function isFirefox() {
    return agentHas("Firefox") || agentHas("FxiOS") || agentHas("Focus");
}

export function isEdge() {
    return agentHas("Edg");
}

export function isOpera() {
    return agentHas("OPR");
}

export function isVivaldi() {
    return agentHas("Vivaldi");
}

export default function whichBrowser() {
    if (isFirefox()) {
        return "Firefox";
    } else if (isEdge()) {
        return "Edge";
    } else if (isIE()) {
        return "Internet Explorer";
    } else if (isOpera()) {
        return "Opera";
    } else if (isVivaldi()) {
        return "Vivaldi";
    } else if (isChrome()) {
        return "Chrome";
    } else if (isSafari()) {
        return "Safari";
    } else {
        return "Unknown";
    }
}