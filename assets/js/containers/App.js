import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { changeTheName } from "../actions";

// possibly @?

const mapStateToProps = (state) => {
  return {
    name: state.testReducer.name
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  ...bindActionCreators(dispatch)
});

export class App extends React.Component {
  // componentWillMount() {
  //   this.props.dispatch(changeTheName())
  // }

  doThing() {
    this.props.dispatch(changeTheName())
  }

  render() {
    const { name } = this.props;

    return(
      <div>
        <button onClick={this.doThing.bind(this)}>change</button>
        <h1>{name}</h1>
        <h1>hello</h1>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
