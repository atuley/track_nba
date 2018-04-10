import _ from 'lodash';
import React from 'react';

export function replaceListItem(list, oldItem, newItem) {
  var index = _.findIndex(list, {personId: oldItem.personId}); //use newItem instead?

  if(newItem) {
    return [
      ..._.slice(list, 0, index),
      newItem,
      ..._.slice(list, index + 1, list.length)
    ];
  } else {
    return [
      ..._.slice(list, 0, index),
      ..._.slice(list, index + 1, list.length)
    ];
  }
}
