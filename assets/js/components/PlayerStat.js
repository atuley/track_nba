import React from 'react';

const PlayerStat = ({player}) => {
  return(
    <div className="col-md-5 player-stat__container">
      <div className="row">
        <div className="col-md-4">
          <div className="row">
            <div className="player-pic"></div>
          </div>
          <div className="row player-name">
            {player.firstName} {player.lastName}
          </div>
        </div>
        <div className="col-md-8">
          <h2 className="main-stat">{player.stats.points}PTS {player.stats.assists}AST {player.stats.totReb}REB</h2>
          <div className="row">
            <div className="col-md-6">{player.stats.steals}</div>
            <div className="col-md-6">STL</div>
          </div>
          <div className="row">
            <div className="col-md-6">{player.stats.blocks}</div>
            <div className="col-md-6">BLK</div>
          </div>
          <div className="row">
            <div className="col-md-6">{player.stats.turnovers}</div>
            <div className="col-md-6">TO</div>
          </div>
          <div className="row">
            <div className="col-md-6">{player.stats.fgm}/{player.stats.fga}</div>
            <div className="col-md-6">{player.stats.fgp}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStat;
