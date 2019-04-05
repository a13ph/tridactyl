// Interfaces common to the tridactyl project.

// For some obscure reason, tsc doesn't like .d.ts files to share a name with
// .ts files. So don't do that.

// Ill-advised monkeypatching
interface Number {
    mod(n: number): number
    clamp(lo: number, hi: number): number
}

// Firefox-specific dom properties
interface Window {
    scrollByLines(n: number): void
    scrollByPages(n: number): void
    eval(str: string): any
}

// Firefox Document interface
interface Document {
    fullscreenElement: HTMLElement | void
}

// Record that we've added a property with convenience objects to the
// window object:
interface Window {
    tri: any
}

// Again, firefox-specific
interface UIEvent {
    pageX: number
    pageY: number
}

// This isn't an actual firefox type but it's nice to have one for this kind of object
// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/find/find
interface findResult {
    count: number
    rangeData: {
        framePos: number
        startTextNodePos: number
        endTextNodePos: number
        startOffset: number
        endOffset: number
        text: string
    }[]
    rectData: {
        rectsAndTexts: {
            top: number
            left: number
            bottom: number
            right: number
        }[]
        textList: string[]
    }
}

interface HTMLElement {
    // Let's be future proof:
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
    focus(options: any): void
    // Let's also implement the current function signature.
    focus(): void
}

declare function exportFunction(
    func: Function,
    targetScope: object,
    options?: { defineAs?: string; allowCrossOriginArguments?: boolean },
): Function

// Fix typescript bugs
interface StringConstructor {
    toLowerCase(): string
}

// Web extension types not in web-ext-types yet
declare namespace browser.find {
    function find(query, object): any
}

// setZoom has an optional first argument of tabId. Unclear how first argument can be optional.
declare namespace browser.tabs {
    function setZoom(zoomFactor: number): Promise<void>
    function setZoom(tabId: number, zoomFactor: number): Promise<void>
    function toggleReaderMode(tabId?: number): Promise<void>
}

// html-tagged-template.js
declare function html(
    strings: TemplateStringsArray,
    ...values: any[]
): HTMLElement

declare namespace browser.webRequest {
    function filterResponseData(requestId: string): any
}

declare namespace browser.search {
    function search(searchProperties: {
        query: string
        engine?: string
        tabId?: number
    }): never
    function get(): {
        name: string
        isDefault: boolean
        alias?: string
        faviconURL?: string
    }[]
}

// Stop typedoc complaining about toBeAll.
declare namespace jest {
    interface Matchers<R> {
        toBeAll: any
    }
}
