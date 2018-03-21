import React from 'react';
import { connect } from 'react-redux';
import { changeTheName } from "../actions";
//
connect((store) => {
  return {
    name: store.name
  };
})
export class TrackNbaApp extends React.Component {
  render() {
    const { name } = this.props;

    return(
      <div>
        <h1>{name}</h1>
        <h1>hello</h1>
      </div>
    );
  }
}

// <button onClick={this.changeName.bind(this)}>load tweets</button>
