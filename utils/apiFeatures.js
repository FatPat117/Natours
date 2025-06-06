class APIFeatures {
  constructor(query, queryString) {
    this.query = query; //query in mongoose
    this.queryString = queryString; // Query string in postman
  }

  filter() {
    // 1A) Filtering

    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields']; // some Fields don't need to the database
    excludedFields.forEach((el) => delete queryObj[el]);

    // Convert arrays to $in queries
    Object.keys(queryObj).forEach((key) => {
      if (Array.isArray(queryObj[key])) {
        queryObj[key] = { $in: queryObj[key] };
      }
    });
    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
      //  sort('price ratingsAverage') first sort price then sort for ratingsAverage
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
