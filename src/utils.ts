export interface timelineConfig {
    past: Array<any>,
    present: any,
    future: Array<any>
};

export const addToPresent = (_timeline: timelineConfig, newPresent) => {
    const _past = [..._timeline.past];
    _past.push(_timeline.present);
    const newTimeline = {
        past: _past,
        present: newPresent,
        future: []
    };

    return newTimeline;
}

export const doUndo = (timeline: timelineConfig) => {
    if (!timeline.past.length) return timeline;
    const newPresent = timeline.past.pop();
    const newFuture = [...timeline.future];
    newFuture.unshift(timeline.present);
    const present = newPresent;

    return {
        past: timeline.past,
        present,
        future: newFuture
    }
}

export const doRedo = (timeline: timelineConfig) => {
    if (!timeline.future.length) return timeline;
    const newPresent = timeline.future.pop();
    const newPast = [...timeline.past];
    newPast.unshift(timeline.present);
    const present = newPresent;

    return {
        past: newPast,
        present,
        future: timeline.future
    }
}
