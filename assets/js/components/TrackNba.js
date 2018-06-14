import React from "react";
import _ from 'lodash';
import { addPlayer, addPlayerToWatch } from "../actions";
import { searchPlayers } from "../utils";
import { bindActionCreators } from 'redux';
import PlayerStat from "./PlayerStat";

export default class TrackNba extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    };
  }

  findPlayerStats(player) {
    this.disableButton(player)
    this.props.dispatch(addPlayer())
    this.props.dispatch(addPlayerToWatch(player))
  }

  disableButton(player) {
    var updatedPlayers = this.state.players
    var index = _.findIndex(updatedPlayers, function(p) {
      return p.personId == player.personId;
    })
    updatedPlayers[index].isWatching = true

    this.setState({
      players: updatedPlayers
    })
  }

  render() {
    const loading = () => {
      return (
        <img className="loading-gif" src="images/load.gif"/>
      );
    }

    const playersLoaded = () => {
      return (
        _.map(this.props.playersWatching, (player) => {
            return <PlayerStat key={player.personId} {...this.props} player={player}/>;
        })
      );
    }
    return (
      <div>
        <div className="row">
          <input className="player-search-bar" placeholder="Search for a player by name" type="text" onChange={searchPlayers.bind(this, 'players')}/>
          <div className="player-search">
            <table className="table">
              <tbody>
                {_.map(this.state.players, (player) => {
                  return (
                    <tr className="search-border" key={player.personId} style={{borderLeft: `8px solid ${player.teamColor}`}}>
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
                        <button className="add-button" disabled={player.isWatching} onClick={this.findPlayerStats.bind(this, player)}>
                          <span>
                            {player.isWatching ? "Watching" : "Watch"}
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
          {this.props.isLoading ? loading() : playersLoaded()}
        </div>
      </div>
    );
  }
}
