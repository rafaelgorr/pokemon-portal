import { getTypesActions } from '@pokemon-portal/utils/redux'

import * as selectors from './selectors'
import session from './slice'

export * from './slice'

export const actions = session.actions
export const reducer = session.reducer
export const types = getTypesActions(session.actions)

export default session

export { selectors }
