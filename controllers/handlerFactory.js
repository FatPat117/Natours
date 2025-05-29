import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

exports.deleteOne = (Model) => {
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
};

exports.updateOne = (Model) => {
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Validate from schema
    });

    if (!document) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: document,
      },
    });
  });
};

exports.createOne = (Model) => {
  catchAsync(async (req, res, next) => {
    const document = await Model.create(req.body);

    return res
      .status(201)
      .json({ status: 'success', data: { data: document } });
  });
};
