import React from 'react';

const PlayerStat = ({stats, player}) => {
  // componentDidMount() {
  //   //fire off action that will join the channel with the playerId
  // }

  // console.log(`PROPS: ${stats.points}`);
  // console.log(player);
  // console.log(`PLAYER ${player.firstName}`);
  return(
    <div className="col-md-5 player-stat__container">
      <div className="row">
        <div className="col-md-4">Name:</div>
        <div className="col-md-8">{player.firstName}</div>
      </div>
      <div className="row">
        <div className="col-md-4">Points:</div>
        <div className="col-md-8">{stats.points}</div>
      </div>
      <div className="row">
        <div className="col-md-4">Assists:</div>
        <div className="col-md-8">{stats.assists}</div>
      </div>
      <div className="row">
        <div className="col-md-4">Rebounds:</div>
        <div className="col-md-8">4</div>
      </div>
    </div>
  );
};

export default PlayerStat;
