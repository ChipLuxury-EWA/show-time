// this asyncHandler file is needed to catch the error in express, it saves as try catch code....
// when writing catch(next) the err param transferred to next
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
export default asyncHandler;
