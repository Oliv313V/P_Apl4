import { resetMessage } from "../slices/adminSlice.jsx";

export const useResetComponentMessage = (dispatch) => {
    return() => {
        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    };
};