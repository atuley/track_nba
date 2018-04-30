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
        <div className="row">
          <input className="form-control" placeholder="Search for a player by name" type="text" onChange={this.searchPlayers.bind(this, 'players')}/>
          <div className="player-search">
            <table className="table">
              <tbody>
                {_.map(this.state.players, (player) => {
                    return (
                      <tr key={player.personId}>
                        <td className="search-border">{`${player.firstName} ${player.lastName}`}</td>
                        <td className="u-align-right"><button className="add-button" onClick={this.subscribeToPlayerStats.bind(this, player)}>Add</button></td>
                      </tr>
                    );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          {_.map(this.props.playersWatching, (player) => {
              return <PlayerStat key={player.personId} {...this.props} player={player}/>;
          })}
        </div>
      </div>
    );
  }
}
