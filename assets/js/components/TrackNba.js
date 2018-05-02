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
                      <tr className="search-border" key={player.personId}>
                        <td className="col-md-2">
                          <img className="search-player-pic" src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${player.teamId}/2017/260x190/${player.personId}.png`}/>
                        </td>
                        <td className="col-md-8">
                          <span className="player-name">
                            {`${player.firstName} ${player.lastName}`}
                          </span>
                          <span className="player-pos">
                            {player.pos}
                          </span>
                        </td>
                        <td className="u-align-right col-md-2">
                          <button className="add-button" onClick={this.subscribeToPlayerStats.bind(this, player)}>
                            <span>
                              Watch
                            </span>
                          </button>
                        </td>
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
