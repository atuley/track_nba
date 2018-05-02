import React from 'react';

const PlayerStat = ({player}) => {
  return(
    <div className="col-md-5 player-stat__container">
      <div className="row player-stat__border" style={{borderLeft: '8px solid #006BB6'}}>
        <div className="col-md-5">
          <div className="row">
            <img className="player-pic" src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${player.teamId}/2017/260x190/${player.personId}.png`}/>
          </div>
          <div className="row player-name">
            <strong>{player.firstName} {player.lastName}</strong>
          </div>
          <div className="row game-stat">
            PHL 100 - GSW 101
          </div>
        </div>
        <div className="col-md-7 u-border-left">
          <div className="row main-stats">
            <div className="col-md-4 u-border-right u-main-stat">
              <h2>{player.stats.points}</h2>PTS
            </div>
            <div className="col-md-4 u-border-right u-main-stat">
              <h2>{player.stats.assists}</h2>AST
            </div>
            <div className="col-md-4 u-main-stat">
              <h2>{player.stats.totReb}</h2>REB
            </div>
          </div>
          <div className="secondary-stats">
            <div className="row u-border-bottom u-main-stat">
              <div className="col-md-6">{player.stats.steals}</div>
              <div className="col-md-6">STL</div>
            </div>
            <div className="row u-border-bottom u-main-stat">
              <div className="col-md-6">{player.stats.blocks}</div>
              <div className="col-md-6">BLK</div>
            </div>
            <div className="row u-border-bottom u-main-stat">
              <div className="col-md-6">{player.stats.turnovers}</div>
              <div className="col-md-6">TO</div>
            </div>
            <div className="row u-border-bottom u-main-stat">
              <div className="col-md-6">{player.stats.fgp}%</div>
              <div className="col-md-6">FGP</div>
            </div>
            <div className="row u-border-bottom u-main-stat">
              <div className="col-md-6">{player.stats.fgm}/{player.stats.fga}</div>
              <div className="col-md-6">FGM/FGA</div>
            </div>
            <div className="row u-main-stat">
              <div className="col-md-6">{player.min}</div>
              <div className="col-md-6">min</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStat;
