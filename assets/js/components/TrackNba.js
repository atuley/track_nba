import React from "react";
import _ from 'lodash';
import { changeTheName } from "../actions";
import { bindActionCreators } from 'redux';
import PlayerStat from "./PlayerStat"

export default class TrackNba extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playersWatching: []
    };
  }

  // componentDidUpdate(prevProps) {

  // }

  onChangeNameBtnClick() {
    this.props.dispatch(changeTheName())
  }

  onAddBtnClick() {
    const playersWatching = this.state.playersWatching;
    this.setState({
      playersWatching: _.concat(playersWatching, <PlayerStat key={playersWatching.length} />)
    });
  }

  searchPlayers(searchContent, { target: { value: searchText } }) {
    //needs refactoring and doesn't like spaces
    let temp = this.props[searchContent];
    const updated = _.filter(temp, function(tp)
      {
        return _.chain(tp).values().lowerCase().includes(_.lowerCase(searchText)).value();
      }
    )
    this.setState({ [searchContent]: updated });
  }

  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <button onClick={this.onChangeNameBtnClick.bind(this)}>Change Name</button>

        <button onClick={this.onAddBtnClick.bind(this)}>Add</button>
        <div className="row">
          {_.map(this.state.playersWatching, (player) => {
              return player;
          })}
        </div>
        <input placeholder="Search" type="text" onChange={this.searchPlayers.bind(this, 'players')}/>
        <ul>
          {_.map(this.state.players, (player) => {
              return <li key={player.id}>{`${player.firstName} ${player.lastName}`}</li>;
          })}
        </ul>
      </div>
    );
  }
}
