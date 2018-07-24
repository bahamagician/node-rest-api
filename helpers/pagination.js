const mongoose = require("mongoose");

module.exports = async (req, res, model) => {
  const currentPage = req.params.page || 1;
  const limit = 2;
  const skip = currentPage * limit - limit;

  const dataPromise = await model
    .find()
    .skip(skip)
    .limit(limit)
    .sort("-_id");

  const totalPromise = model.count();

  const [data, total] = await Promise.all([dataPromise, totalPromise]);

  const meta = {
    current_page: currentPage,
    from: skip + 1,
    last_page: Math.ceil(total / limit),
    per_page: limit,
    to: skip + 1 + limit - 1,
    total
  };
  return { data, meta };
};
