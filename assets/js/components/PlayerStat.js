import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { removePlayer, subscribeToPlayerStats } from "../actions";

export default class PlayerStat extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   players: []
    // };
  }

  removeThing(playersWatching, player) {
    this.props.dispatch(removePlayer(playersWatching, player));
  }

  render() {
    return(
      <div>
        <div className="col-md-5 player-stat__container">
          <div className="row player-stat__border" style={{borderLeft: `8px solid ${this.props.player.teamColor}`}}>
            <div className="col-md-5 col-xs-5">
              <div className="row">
                <img className="player-pic" src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${this.props.player.teamId}/2017/260x190/${this.props.player.personId}.png`}/>
              </div>
              <div className="row player-name">
                <strong>{this.props.player.firstName} {this.props.player.lastName}</strong>
              </div>
              <div className="row game-stat">
                {`${this.props.player.stats.game.hTeam.triCode} ${this.props.player.stats.game.hTeam.score} - ${this.props.player.stats.game.vTeam.triCode} ${this.props.player.stats.game.vTeam.score}`}
              </div>
            </div>
            <div className="col-md-7 col-xs-7 u-border-left">
              <div className="row main-stats">
                <div className="col-md-4 col-xs-4 u-border-right u-main-stat">
                  <h2>{this.props.player.stats.stats.points || 0}</h2>PTS
                </div>
                <div className="col-md-4 col-xs-4 u-border-right u-main-stat">
                  <h2>{this.props.player.stats.stats.assists || 0}</h2>AST
                </div>
                <div className="col-md-4 col-xs-4 u-main-stat">
                  <div className="remove">
                    <span className="delete" onClick={this.removeThing.bind(this, this.props.playersWatching, this.props.player)}>X</span>
                  </div>
                  <h2>{this.props.player.stats.stats.totReb || 0}</h2>REB
                </div>
              </div>
              <div className="secondary-stats">
                <div className="row u-border-bottom u-main-stat">
                  <div className="col-md-6 col-xs-6">{this.props.player.stats.stats.steals || 0}</div>
                  <div className="col-md-6 col-xs-6">STL</div>
                </div>
                <div className="row u-border-bottom u-main-stat">
                  <div className="col-md-6 col-xs-6">{this.props.player.stats.stats.blocks || 0}</div>
                  <div className="col-md-6 col-xs-6">BLK</div>
                </div>
                <div className="row u-border-bottom u-main-stat">
                  <div className="col-md-6 col-xs-6">{this.props.player.stats.stats.turnovers || 0}</div>
                  <div className="col-md-6 col-xs-6">TO</div>
                </div>
                <div className="row u-border-bottom u-main-stat">
                  <div className="col-md-6 col-xs-6">{this.props.player.stats.stats.fgp || 0}%</div>
                  <div className="col-md-6 col-xs-6">FGP</div>
                </div>
                <div className="row u-border-bottom u-main-stat">
                  <div className="col-md-6 col-xs-6">{this.props.player.stats.stats.fgm || 0}/{this.props.player.stats.stats.fga || 0}</div>
                  <div className="col-md-6 col-xs-6">FGM/FGA</div>
                </div>
                <div className="row u-main-stat">
                  <div className="col-md-6 col-xs-6">{this.props.player.stats.stats.min || 0}</div>
                  <div className="col-md-6 col-xs-6">min</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
