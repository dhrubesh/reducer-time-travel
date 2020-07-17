import { useReducer } from 'react';
import { UNDO, REDO, RESET } from './constants';
import { timelineConfig, doUndo, doRedo, addToPresent } from './utils';

export const useTimeTravel = (reducer: (any, string) => any, initialState: any): { state: any, timeline: timelineConfig, dispatch: ({ type: string, payload: any }) => (any), goToPast: () => any, goToFuture: () => any, doReset: () => any } => {
    const timeline: timelineConfig = {
        past: [],
        present: initialState,
        future: []
    };

    const wrapperReducer = (_tl: timelineConfig, action: string) => {
        if (action === UNDO) {
            return doUndo(_tl);
        } else if (action === REDO) {
            return doRedo(_tl);
        } else if (action === RESET) {
            return timeline;
        } else {
            const newState = reducer(_tl.present, action);
            return addToPresent(_tl, newState);
        }
    };

    const [_timeline, _dispatch] = useReducer(wrapperReducer, timeline);

    return {
        state: _timeline.present,
        timeline: _timeline,
        dispatch: _dispatch,
        goToPast: () => _dispatch(UNDO),
        goToFuture: () => _dispatch(REDO),
        doReset: () => _dispatch(RESET)
    };
}
