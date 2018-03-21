import React from 'react';
import { changeTheName } from '../actions';


export default function TestComp({
  name

}){
  return(
    <div>
      <button onClick={this.changeTheName.bind(this)}></button>
      <h1>{this.props.name}</h1>
      <h1>Below</h1>
    </div>
  );
};
