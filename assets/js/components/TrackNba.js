import React from "react";
import _ from 'lodash';
import { addPlayerToWatch, changeTheName, subscribeToPlayerStats } from "../actions";
import { bindActionCreators } from 'redux';
import PlayerStat from "./PlayerStat"

export default class TrackNba extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    };
  }

  subscribeToPlayerStats(player) {
    this.props.dispatch(addPlayerToWatch(player))
    this.props.dispatch(subscribeToPlayerStats(player, this.props.playersWatching))
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
                <li key={player.personId}>
                  {`${player.firstName} ${player.lastName}`}
                  <button onClick={this.subscribeToPlayerStats.bind(this, player)}>Add</button>
                </li>
              );
          })}
        </ul>
        <div className="row">
          {_.map(this.props.playersWatching, (player) => {
              return <PlayerStat key={player.personId} {...this.props} player={player}/>;
          })}
        </div>
      </div>
    );
  }
}
