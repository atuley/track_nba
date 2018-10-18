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
          <div className="col-md-12">
            <input id="reset-value" className="player-search-bar" placeholder="Search for a player by name" type="text" onChange={this.searchForPlayers.bind(this)} />
            <div className="player-search">
              <table className="table">
                <tbody>
                  {_.map(players, player => (
                    <tr className="player-search-border" key={player.personId} style={{
                      backgroundImage: `linear-gradient(to right, transparent 38%, ${player.teamColor} 150%)`,
                      backgroundImage: `-webkit-linear-gradient(to right, transparent 38%, ${player.teamColor} 150%)`,
                      backgroundImage: `-o-linear-gradient(to right, transparent 38%, ${player.teamColor} 150%)` }}>
                      <td className="table-pic" style={{ borderLeft: `10px solid ${player.teamColor}` }}>
                        <div className="row player-search-logo" style={{ borderTop: `55px solid ${player.teamColor}` }}>
                          <img className="player-search-team-logo" src={`https://www.nba.com/assets/logos/teams/primary/web/${player.tricode}.svg`} />
                        </div>
                        <img className="player-search-pic" src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${player.teamId}/2017/260x190/${player.personId}.png`} />
                      </td>
                      <td className="table-name">
                        <p className="title">
                          NAME
                        </p>
                        <p className="value u-pad-left">
                          {`${player.firstName} ${player.lastName}`}
                        </p>
                      </td>
                      <td className="table-pos u-border-right">
                        <p className="title">
                          POSITION
                        </p>
                        <p className="value u-pad-left">
                          {player.pos}
                        </p>
                      </td>
                      <td className="table-pos">
                        <p className="title">
                          NUMBER
                        </p>
                        <p className="value u-pad-left">
                          {player.jersey}
                        </p>
                      </td>
                      <td className="table-logo">
                        <div className="row">
                          <div className="logo-image" style={{ backgroundImage: `url("https://www.nba.com/assets/logos/teams/primary/web/${player.tricode}.svg")` }} />
                        </div>
                      </td>
                      <td className="table-watch-button u-align-right">
                        <button className={`add-button player-${player.personId}`} disabled={player.isWatching} onClick={this.findPlayerStats.bind(this, player, playersWatching)}>
                          <span className="button-text">
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

        </div>
        <div className="row u-margin-bottom">
          {loading ? playersLoading() : playersLoaded()}
        </div>
      </div>
    );
  }
}
