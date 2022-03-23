export const getIdFromUrl = (url: string) => url.replace(/.*\/(\d*)\/$/g, '$1')
