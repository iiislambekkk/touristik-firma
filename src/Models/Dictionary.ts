interface Dictionary {
    [key: string]: {[key: string]: string}
}

interface LayoutDictionary {
    [key: string]: {[key: string]: {
        [key: string]: {
            [key: string]: string
        }}
    }
}