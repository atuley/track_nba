import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { changeTheName, getAllPlayers } from "../actions";
import TrackNba from "../components/TrackNba"

const mapStateToProps = (state) => {
  return {
    name: state.playerReducer.name,
    players: state.playerReducer.players
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  ...bindActionCreators(dispatch)
});

export class TrackNbaContainer extends React.Component {
  // fetch all players on component mount to search through
  componentDidMount() {
    this.props.dispatch(getAllPlayers());
  }
  render() {
    return <TrackNba {...this.props} />;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TrackNbaContainer);
