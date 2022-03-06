const uriSchemes = ["Http", 
    "Https", 
    "Telegram",
    "Ftp",
    "Ftps",
    "Mailto",
    "Ssh",
    "Git"] as const

export type UriSchemes = typeof uriSchemes[number]

const ValidationsRegExp: { [key in UriSchemes]: RegExp } = {
    Http: /^http:\/\//, //
    Https: /^https:\/\//, //
    Telegram: /^tg:\/\//,
    Ftp: /^ftp:\/\//,
    Ftps: /^ftps:\/\//,
    Mailto: /@/,
    Ssh: /^ssh:\/\//,
    Git: /^git/,
}
//TODO LicalizeIt!
export function hyperLinkValidator(value: string | undefined, types: UriSchemes[]) {

    if (!value) { return false }
    let isValid = true;
    for (let i = 0; i < types.length; i++) {
        isValid = isValid && !ValidationsRegExp[types[i]].test(value)
    }
    return isValid

}

export function checkLinkType(value: string | undefined): UriSchemes | undefined {
    if (!value) { return }
    for (let i = 0; i < uriSchemes.length; i++) {
        if (ValidationsRegExp[uriSchemes[i]].test(value)) {
            return uriSchemes[i]
        }
    }
}
