import { getTypesActions } from '@pokemon-portal/utils/redux'

import * as selectors from './selectors'
import login from './slice'

export * from './slice'
const actions = login.actions
const reducer = login.reducer
const types = getTypesActions(login.actions)

export { actions, reducer, types, selectors }

export default login
