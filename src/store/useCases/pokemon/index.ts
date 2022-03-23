import * as selectors from './selectors'
import slice from './slice'

export * from './slice'
export * from './actions'
const reducer = slice.reducer
export { selectors, reducer }
