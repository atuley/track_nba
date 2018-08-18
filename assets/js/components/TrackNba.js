import React from 'react';
import _ from 'lodash';
import { addPlayerToWatch } from '../actions';
import { searchPlayers } from '../utils';
import PlayerStat from './PlayerStat';

export default class TrackNba extends React.Component {
  constructor(props) {
    super(props);
    this.state = { players: [] };
  }

  findPlayerStats(player, playersWatching) {
    const { dispatch } = this.props;

    this.disableButton(player);
    dispatch(addPlayerToWatch(player, playersWatching));
    this.clearInputText();
  }

  disableButton(player) {
    const { players } = this.state;

    const updatedPlayers = players;
    const index = _.findIndex(updatedPlayers, p => p.personId === player.personId);

    updatedPlayers[index].isWatching = true;
    this.setState({ players: updatedPlayers });
  }

  clearInputText() {
    document.getElementById('reset-value').value = '';
    this.setState({ players: [] });
  }

  searchForPlayers() {
    const { players } = this.props;
    const searchText = document.getElementById('reset-value').value;
    const updatedPlayers = searchPlayers(players, searchText);

    this.setState({ players: updatedPlayers });
  }

  render() {
    const { players } = this.state;
    const { playersWatching, loading } = this.props;

    const playersLoading = () => (
      <img alt="" className="loading-gif" src="images/load.gif" />
    );

    const playersLoaded = () => (
      _.map(playersWatching, player =>
        <PlayerStat key={player.personId} {...this.props} player={player} />
      )
    );
    return (
      <div>
        <div className="row">
          <input id="reset-value" className="player-search-bar" placeholder="Search for a player by name" type="text" onChange={this.searchForPlayers.bind(this)} />
          <div className="player-search">
            <table className="table">
              <tbody>
                {_.map(players, player => (
                  <tr className="player-search-border" key={player.personId} style={{ borderLeft: `8px solid ${player.teamColor}` }}>
                    <td className="col-md-2">
                      <img className="player-search-pic" src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${player.teamId}/2017/260x190/${player.personId}.png`} />
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
                      <button className={`add-button player-${player.personId}`} disabled={player.isWatching} onClick={this.findPlayerStats.bind(this, player, playersWatching)}>
                        <span>
                          {player.isWatching ? 'Watching' : 'Watch'}
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row u-margin-bottom">
          {loading ? playersLoading() : playersLoaded()}
        </div>
      </div>
    );
  }
}
