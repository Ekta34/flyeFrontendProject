import { push } from 'react-router-redux';

export const goToRoute = (route) => {
    return (dispatch,getState) => {
        console.log('route ',route);
        dispatch(push(route));
    }
}