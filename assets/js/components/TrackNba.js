import React from "react";
import _ from 'lodash';
import { changeTheName } from "../actions";
import { bindActionCreators } from 'redux';
import PlayerStat from "./PlayerStat"

export default class TrackNba extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playersWatching: []
    };
  }

  onChangeNameBtnClick() {
    this.props.dispatch(changeTheName())
  }

  onAddBtnClick() {
    const playersWatching = this.state.playersWatching;
    this.setState({
      playersWatching: _.concat(playersWatching, <PlayerStat key={playersWatching.length} />)
    });
  }

  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <button onClick={this.onChangeNameBtnClick.bind(this)}>Change Name</button>

        <button onClick={this.onAddBtnClick.bind(this)}>Add</button>
        <div className="row">
          {_.map(this.state.playersWatching, (player) => {
              return player;
          })}
        </div>
      </div>
    );
  }
}
