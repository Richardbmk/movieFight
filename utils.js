const helperBounce = (func, delay = 1000) => {
    let timingID;
    return (...args) => {
        if(timingID) {
            clearInterval(timingID);
    }
    timingID = setTimeout(() => {
        func.apply(null, args);
    }, delay)
}
}