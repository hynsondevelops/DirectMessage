import { connect } from 'react-redux'
import Alert from '../components/Alert'

const mapStateToProps = state => ({
	alerts: state.alerts
})


export default connect(
  mapStateToProps
)(Alert)
