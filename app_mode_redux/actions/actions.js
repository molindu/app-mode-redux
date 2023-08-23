// actions.js
import { SET_VALUE } from './actionTypes';

export const setValue = (value) => ({
    type: SET_VALUE,
    payload: value,
});
