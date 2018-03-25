import React from 'react';

const PlayerStat = () => {
  // componentDidMount() {
  //   //fire off action that will join the channel with the playerId
  // }

  return(
    <div className="col-md-5 player-stat__container">
      <div className="row">
        <div className="col-md-4">Name:</div>
        <div className="col-md-8">LeBron James</div>
      </div>
      <div className="row">
        <div className="col-md-4">Points:</div>
        <div className="col-md-8">20</div>
      </div>
      <div className="row">
        <div className="col-md-4">Assists:</div>
        <div className="col-md-8">5</div>
      </div>
      <div className="row">
        <div className="col-md-4">Rebounds:</div>
        <div className="col-md-8">4</div>
      </div>
      <div className="row">
        <div className="col-md-4">Steals:</div>
        <div className="col-md-8">1</div>
      </div>
      <div className="row">
        <div className="col-md-4">Blocks:</div>
        <div className="col-md-8">0</div>
      </div>
    </div>
  );
};

export default PlayerStat;
