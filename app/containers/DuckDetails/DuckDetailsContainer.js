import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { DuckDetails } from 'components'
import { bindActionCreators } from 'redux'
import * as duckActionCretors from 'redux/modules/ducks'
import * as likeCountActionCreators from 'redux/modules/likeCount'

const DuckDetailsContainer = React.createClass({
  propTypes: {
    authedUser: PropTypes.object.isRequired,
    duckId: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    duckAlreadyFetched: PropTypes.bool.isRequired,
    removeFetching: PropTypes.func.isRequired,
    fetchAndHandleDuck: PropTypes.func.isRequired,
    initLikeFetch: PropTypes.func.isRequired,
  },
  componentDidMount () {
    this.props.initLikeFetch(this.props.duckId)
    if (this.props.duckAlreadyFetched === false) {
      this.props.fetchAndHandleDuck(this.props.duckId)
    } else {
      this.props.removeFetching()
    }
  },
  render () {
    return (
      <DuckDetails
        authedUser={this.props.authedUser}
        duckId={this.props.duckId}
        error={this.props.error}
        isFetching={this.props.isFetching} />
    )
  },
})

function mapStateToProps ({ducks, likeCount, users}, props) {
  return {
    isFetching: ducks.isFetching || likeCount.isFetching,
    error: ducks.error,
    authedUser: users[users.authedId].info,
    duckId: props.routeParams.duckId,
    duckAlreadyFetched: !!ducks[props.routeParams.duckId]
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...duckActionCretors,
    ...likeCountActionCreators
  }, dispatch)
}

export default connect(
  mapStateToProps
)(DuckDetailsContainer)