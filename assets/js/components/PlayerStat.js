import React from 'react';

const PlayerStat = ({player}) => {
  return(
    <div className="col-md-5 player-stat__container">
      <div className="row">
        <div className="col-md-4">Name:</div>
        <div className="col-md-8">{player.firstName}</div>
      </div>
      <div className="row">
        <div className="col-md-4">Points:</div>
        <div className="col-md-8">{player.stats.points}</div>
      </div>
      <div className="row">
        <div className="col-md-4">Assists:</div>
        <div className="col-md-8">{player.stats.assists}</div>
      </div>
      <div className="row">
        <div className="col-md-4">Rebounds:</div>
        <div className="col-md-8">{player.stats.totReb}</div>
      </div>
    </div>
  );
};

export default PlayerStat;
