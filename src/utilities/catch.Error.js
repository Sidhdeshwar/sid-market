const catchAsync = (fun) => (req, res, next) => {
  fun(req, res, next).catch((err) => next(err));
};

module.exports = catchAsync;
