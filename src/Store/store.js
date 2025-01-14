import { createStore } from 'redux';
import produce from 'immer';

const initialState = {
    aaa: 1

}

const reducer = produce((state, action) => {
    switch (action.type) {
        case 'SET_CONTROL_TYPE':
            state.aaa = action.paylod
            break;

    }
}, initialState);

const Store = createStore(reducer);

export default Store;