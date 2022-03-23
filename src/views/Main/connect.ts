import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { StoreState } from '@pokemon-portal/store'
import {
  actions as drawerActions,
  selectors as drawerSelectors
} from '@pokemon-portal/store/ui/drawer'
import {
  actions as systemActions,
  selectors as systemSelectors,
  State as ThemeState
} from '@pokemon-portal/store/ui/theme'

export interface ConnectedProps {
  drawerOpen: boolean
  toggleDrawer: typeof drawerActions.toggleDrawer
  mode: ThemeState['mode']
  setMode: typeof systemActions.setMode
}

const mapStateToProps = (state: StoreState) => ({
  drawerOpen: drawerSelectors.isDrawerOpen(state.ui.drawer),
  mode: systemSelectors.getMode(state.ui.theme),
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      toggleDrawer: drawerActions.toggleDrawer,
      setMode: systemActions.setMode,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)
