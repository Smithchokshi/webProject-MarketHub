import ApiUtils from '../../helpers/APIUtils';

const api = msg => new ApiUtils(msg);

export const loadUser = () => async dispatch => {
  try {
    return true;
  } catch (err) {
    dispatch({ type: 'AUTH_FAILED' });
    return false;
  }
};

export const register = data => async () => {
  try {
    return true;
  } catch (e) {
    return false;
  }
};

export const login = data => async dispatch => {
  try {
    return true;
  } catch (err) {
    dispatch({ type: 'AUTH_FAILED' });
    return false;
  }
};

export const logout = () => async dispatch => {
  try {
    return true;
  } catch (err) {
    return false;
  }
};
