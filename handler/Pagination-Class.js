const mongoose = require("mongoose");

module.exports = class Paginate {
  constructor({ req, res, model, limit }) {
    this.req = req;
    this.res = res;
    this.model = model;
    this.limit = limit || 10;
  }

  async response() {
    const model = this.model;
    const currentPage = this.req.params.page || 1;
    const skip = currentPage * this.limit - this.limit;

    const dataPromise = model
      .find()
      .skip(skip)
      .limit(this.limit)
      .sort("-_id");

    const totalPromise = model.count();

    const [data, total] = await Promise.all([dataPromise, totalPromise]);

    const meta = {
      current_page: currentPage,
      from: skip + 1,
      last_page: Math.ceil(total / this.limit),
      per_page: this.limit,
      to: skip + 1 + this.limit - 1,
      total
    };
    return { data, meta };
  }
};
