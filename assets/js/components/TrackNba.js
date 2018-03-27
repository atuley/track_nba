import React from "react";
import _ from 'lodash';
import { changeTheName, subscribeToPlayerStats } from "../actions";
import { bindActionCreators } from 'redux';
import PlayerStat from "./PlayerStat"

export default class TrackNba extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playersWatching: []
    };
  }

  addPlayer() {
    const playersWatching = this.state.playersWatching;
    this.setState({
      playersWatching: _.concat(playersWatching, <PlayerStat key={playersWatching.length} />)
    });
  }

  subscribeToPlayerStats(playerId) {
    this.props.dispatch(subscribeToPlayerStats(playerId))
    this.addPlayer()
  }

  searchPlayers(searchContent, { target: { value: searchText } }) {
    //needs refactoring and doesn't like spaces
    //doesnt seem to downcase for lebron james?
    let temp = this.props[searchContent];
    const updated = _.filter(temp, function(tp)
      {
        return _.chain(tp).values().lowerCase().includes(_.lowerCase(searchText)).value();
      }
    )
    this.setState({ [searchContent]: updated });
  }

  render() {
    return (
      <div>
        <input placeholder="Search" type="text" onChange={this.searchPlayers.bind(this, 'players')}/>
        <ul>
          {_.map(this.state.players, (player) => {
              return (
                <li key={player.id}>
                  {`${player.firstName} ${player.lastName}`}
                  <button onClick={this.subscribeToPlayerStats.bind(this, player.id)}>Add</button>
                </li>
              );
          })}
        </ul>

        <div className="row">
          {_.map(this.state.playersWatching, (player) => {
              return player;
          })}
        </div>
      </div>
    );
  }
}
