import React from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Replies } from 'components';
import { staleReplies } from 'helpers/utils';
import * as repliesActionCreators from 'redux/modules/replies';
const { bool, string, number, object, func } = PropTypes;

class RepliesContainer extends React.Component {
  componentDidMount() {
    if (staleReplies(this.props.lastUpdated)) {
      this.props.fetchAndHandleReplies(this.props.duckId);
    }
  }

  render() {
    return (
      <Replies
        isFetching={this.props.isFetching}
        error={this.props.error}
        lastUpdated={this.props.lastUpdated}
        replies={this.props.replies}
      />
    );
  }
}

RepliesContainer.propTypes = {
  isFetching: bool.isRequired,
  error: string.isRequired,
  lastUpdated: number.isRequired,
  replies: object,
  duckId: string.isRequired,
  fetchAndHandleReplies: func.isRequired,
};

RepliesContainer.defaultProps = {
  lastUpdated: 0,
  replies: {},
};
// const RepliesContainer = React.createClass({
//   propTypes: {
//     isFetching: PropTypes.bool.isRequired,
//     error: PropTypes.string.isRequired,
//     lastUpdated: PropTypes.number.isRequired,
//     replies: PropTypes.object,
//     duckId: PropTypes.string.isRequired,
//     fetchAndHandleReplies: PropTypes.func.isRequired,
//   },
//   getDefaultProps () {
//     return {
//       lastUpdated: 0,
//       replies: {},
//     }
//   },
//   componentDidMount () {
//     if (staleReplies(this.props.lastUpdated)) {
//       this.props.fetchAndHandleReplies(this.props.duckId)
//     }
//   },
//   render () {
//     return (
//       <Replies
//         isFetching={this.props.isFetching}
//         error={this.props.error}
//         lastUpdated={this.props.lastUpdated}
//         replies={this.props.replies} />
//     )
//   },
// })

function mapStateToProps(state, props) {
  const duckRepliesInfo = state.replies[props.duckId] || {};
  const { lastUpdated, replies } = duckRepliesInfo;
  return {
    isFetching: state.replies.isFetching,
    error: state.replies.error,
    lastUpdated,
    replies,
  };
}

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(repliesActionCreators, dispatch)
)(RepliesContainer);
