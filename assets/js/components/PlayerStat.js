import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removePlayer } from '../actions';

const remove = (dispatch, playersWatching, player, players) => {
  dispatch(removePlayer(playersWatching, player, players));
};

const PlayerStat = ({
  players, player, playersWatching, dispatch,
}) => (
  <div>
    <div className="col-sm-6 col-md-6 col-lg-4">
      <div className="row">
        <img className="large-team-logo" src={`https://www.nba.com/assets/logos/teams/primary/web/${player.tricode}.svg`} />
      </div>
      <div className="player-stat__container" style={{ borderLeft: `10px solid ${player.teamColor}`, backgroundImage: `linear-gradient(to right, transparent 38%, ${player.teamColor} 150%)` }}>
        <div className="col-md-5 col-xs-5 pic-border">
          <div className="row team-logo-container" style={{ borderTop: `55px solid ${player.teamColor}` }}>
            <img className="team-logo" src={`https://www.nba.com/assets/logos/teams/primary/web/${player.tricode}.svg`} />
          </div>
          <div className="left-player-info">
            <div className="row">
              <img className="player-pic" src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${player.teamId}/2017/260x190/${player.personId}.png`} />
            </div>
            <div className="row player-name">
              <strong>
                {player.firstName}
                {' '}
                {player.lastName}
              </strong>
            </div>
            <div className="row game-stat">
              {`${player.stats.game.hTeam.triCode} ${player.stats.game.hTeam.score} - ${player.stats.game.vTeam.triCode} ${player.stats.game.vTeam.score}`}
            </div>
          </div>
        </div>
        <div className="col-md-7 col-xs-7">
          <div className="row main-stats">
            <div className="col-md-4 col-xs-4 u-border-right u-main-stat">
              <h2>
                {player.stats.stats.points || 0}
              </h2>
              PTS
            </div>
            <div className="col-md-4 col-xs-4 u-border-right u-main-stat">
              <h2>
                {player.stats.stats.assists || 0}
              </h2>
              AST
            </div>
            <div className="col-md-4 col-xs-4 u-main-stat">
              <div className="remove">
                <span className="delete" onClick={remove.bind(this, dispatch, playersWatching, player, players)}>
                  X
                </span>
              </div>
              <h2>
                {player.stats.stats.totReb || 0}
              </h2>
              REB
            </div>
          </div>
          <div className="secondary-stats">
            <div className="row u-border-secondary u-main-stat">
              <div className="col-md-6 col-xs-6">
                {player.stats.stats.fgp || 0}
                %
              </div>
              <div className="col-md-6 col-xs-6">
                FGP
              </div>
            </div>
            <div className="row u-border-secondary u-main-stat">
              <div className="col-md-6 col-xs-6">
                {player.stats.stats.fgm || 0}
                /
                {player.stats.stats.fga || 0}
              </div>
              <div className="col-md-6 col-xs-6">
                FGM/FGA
              </div>
            </div>
            <div className="row u-border-secondary u-main-stat">
              <div className="col-md-6 col-xs-6">
                {player.stats.stats.min || 0}
              </div>
              <div className="col-md-6 col-xs-6">
                min
              </div>
            </div>
            <div className="row u-border-secondary u-main-stat">
              <div className="col-md-6 col-xs-6">
                {player.stats.stats.steals || 0}
              </div>
              <div className="col-md-6 col-xs-6">
                STL
              </div>
            </div>
            <div className="row u-border-secondary u-main-stat">
              <div className="col-md-6 col-xs-6">
                {player.stats.stats.blocks || 0}
              </div>
              <div className="col-md-6 col-xs-6">
                BLK
              </div>
            </div>
            <div className="row u-main-stat">
              <div className="col-md-6 col-xs-6">
                {player.stats.stats.turnovers || 0}
              </div>
              <div className="col-md-6 col-xs-6">
                TO
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindActionCreators(dispatch),
});

export default connect(mapDispatchToProps)(PlayerStat);
