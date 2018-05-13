import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { changeTheName, getAllPlayers, getCachedPlayers } from "../actions";
import TrackNba from "../components/TrackNba"

const mapStateToProps = (state) => {
  return {
    name: state.playerReducer.name,
    players: state.playerReducer.players,
    stats: state.playerReducer.stats,
    playersWatching: state.playerReducer.playersWatching,
    playerLoading: state.playerReducer.playerLoading
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  ...bindActionCreators(dispatch)
});

export class TrackNbaContainer extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('playersWatching')) {
      this.props.dispatch(getCachedPlayers());
    }
    this.props.dispatch(getAllPlayers());
  }
  render() {
    return <TrackNba {...this.props} />;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TrackNbaContainer);
