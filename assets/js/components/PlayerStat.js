import React from 'react';

const PlayerStat = ({stats, player}) => {
  return(
    <div className="col-md-5 player-stat__container">
      <div className="row">
        <div className="col-md-4">Name:</div>
        <div className="col-md-8">{player.firstName}</div>
      </div>
      <div className="row">
        <div className="col-md-4">Points:</div>
        <div className="col-md-8">{player.stats.stats.points}</div>
      </div>
      <div className="row">
        <div className="col-md-4">Assists:</div>
        <div className="col-md-8">{player.stats.stats.assists}</div>
      </div>
      <div className="row">
        <div className="col-md-4">Rebounds:</div>
        <div className="col-md-8">hard coded</div>
      </div>
    </div>
  );
};

export default PlayerStat;
