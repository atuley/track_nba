import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { removePlayer, subscribeToPlayerStats } from "../actions";

const remove = (dispatch, player) => {
  dispatch(removePlayer(player));
}

const watchLive = (dispatch, player) => {
  dispatch(subscribeToPlayerStats(player));
}

const watchLiveButton = (dispatch, player) => {
  return(
    <button onClick={watchLive.bind(this, dispatch, player)}>Watch live</button>
  );
}

const gameToday = (dispatch, player) => {
  //isGameActivated field can be used if this doesn't work
  // this could have issues if game log isnt updated frequently
  // change functionality to look at previous game id which is on boxscore. Go back until there is game info?
  if (player.stats.game.endTimeUTC == "") {
    return (<button onClick={watchLive.bind(this, dispatch, player)}>Watch live</button>);
  } else {
    return(`${player.stats.game.hTeam.triCode} ${player.stats.game.hTeam.score} - ${player.stats.game.vTeam.triCode} ${player.stats.game.vTeam.score}`);
  }
}

const PlayerStat = ({player, dispatch, isLoading}) => {
  return(
    <div>
      <div className="col-md-5 player-stat__container">
        <div className="row player-stat__border" style={{borderLeft: `8px solid ${player.teamColor}`}}>
          <div className="col-md-5 col-xs-5">
            <div className="row">
              <img className="player-pic" src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${player.teamId}/2017/260x190/${player.personId}.png`}/>
            </div>
            <div className="row player-name">
              <strong>{player.firstName} {player.lastName}</strong>
            </div>
            <div className="row game-stat">
              {gameToday(dispatch, player)}
            </div>
          </div>
          <div className="col-md-7 col-xs-7 u-border-left">
            <div className="row main-stats">
              <div className="col-md-4 col-xs-4 u-border-right u-main-stat">
                <h2>{player.stats.stats.points || 0}</h2>PTS
              </div>
              <div className="col-md-4 col-xs-4 u-border-right u-main-stat">
                <h2>{player.stats.stats.assists || 0}</h2>AST
              </div>
              <div className="col-md-4 col-xs-4 u-main-stat">
                <div className="remove">
                  <span className="delete" onClick={remove.bind(this, dispatch, player)}>X</span>
                </div>
                <h2>{player.stats.stats.totReb || 0}</h2>REB
              </div>
            </div>
            <div className="secondary-stats">
              <div className="row u-border-bottom u-main-stat">
                <div className="col-md-6 col-xs-6">{player.stats.stats.steals || 0}</div>
                <div className="col-md-6 col-xs-6">STL</div>
              </div>
              <div className="row u-border-bottom u-main-stat">
                <div className="col-md-6 col-xs-6">{player.stats.stats.blocks || 0}</div>
                <div className="col-md-6 col-xs-6">BLK</div>
              </div>
              <div className="row u-border-bottom u-main-stat">
                <div className="col-md-6 col-xs-6">{player.stats.stats.turnovers || 0}</div>
                <div className="col-md-6 col-xs-6">TO</div>
              </div>
              <div className="row u-border-bottom u-main-stat">
                <div className="col-md-6 col-xs-6">{player.stats.stats.fgp || 0}%</div>
                <div className="col-md-6 col-xs-6">FGP</div>
              </div>
              <div className="row u-border-bottom u-main-stat">
                <div className="col-md-6 col-xs-6">{player.stats.stats.fgm || 0}/{player.stats.stats.fga || 0}</div>
                <div className="col-md-6 col-xs-6">FGM/FGA</div>
              </div>
              <div className="row u-main-stat">
                <div className="col-md-6 col-xs-6">{player.stats.stats.min || 0}</div>
                <div className="col-md-6 col-xs-6">min</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  ...bindActionCreators(dispatch)
});

export default connect(mapDispatchToProps)(PlayerStat);
