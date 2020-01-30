import * as actionTypes from '../actions/actionTypes';
import { updateObject} from "../../shared/utility";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const authStart = (oldState, action) => {
    return updateObject(oldState, {error: null, loading: true});
};

const authSuccess = (oldState, action) => {
    return updateObject(oldState, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
};

const authFail = (oldState, action) => {
    return updateObject(oldState, {
        error: action.error,
        loading: false
    });
};

const authLogout = (oldState, action) => {
    return updateObject(oldState, {
        token: null,
        userId: null
    })
};

const setAuthRedirectPath = (oldState, action) => {
    return updateObject(oldState, {
        authRedirectPath: action.path
    })
};


const reducer = (oldState = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(oldState, action);

        case actionTypes.AUTH_SUCCESS:
            return authSuccess(oldState, action);

        case actionTypes.AUTH_FAIL:
            return authFail(oldState, action);

        case actionTypes.AUTH_LOGOUT:
            return authLogout(oldState, action);

        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(oldState, action);

        default:
            return oldState;
    }
};

export default reducer;