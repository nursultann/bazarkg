import { ActionTypes } from "../../constants/action_types"

const initialState = {
    user: null
}

export const userReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case ActionTypes.SET_USER:
            return { ...state, user: payload };
        default: 
            return state;
    }
}