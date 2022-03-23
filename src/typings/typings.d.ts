declare module 'curiojs' {
  const n: any
  export default n
}

declare module '*.scss' {
  const obj: any
  export default obj
}

declare module '*.sass' {
  const obj: any
  export default obj
}

declare module '*.json' {
  const json: any
  export const version: any
  export default json
}
declare module '*.env' {
  const json: any
  export default json
}
declare module '*.png' {
  const obj: any
  export default json
}

declare module '*.svg' {
  const obj: any
  export default json
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    PROFILE: any
  }
}
