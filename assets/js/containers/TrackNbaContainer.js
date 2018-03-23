import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { changeTheName } from "../actions";

const mapStateToProps = (state) => {
  return {
    name: state.testReducer.name
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  ...bindActionCreators(dispatch)
});

export class TrackNbaContainer extends React.Component {
  doThing() {
    this.props.dispatch(changeTheName())
  }

  render() {
    const { name } = this.props;

    //this will eventually be returning a main component
    return(
      <div>
        <button onClick={this.doThing.bind(this)}>change</button>
        <h1>{name}</h1>
        <h1>hello</h1>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TrackNbaContainer);
