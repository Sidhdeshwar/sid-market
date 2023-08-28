const colors = require('console-log-colors');

class UsersClass {
  constructor(allUsers, query) {
    this.allUsers = allUsers;
    this.query = query;
  }

  filter() {
    const queryObj = { ...this.query };
    const obj = JSON.stringify(queryObj);
    // eslint-disable-next-line camelcase
    const add_$ = obj.replace(/\b(lt|lte|gt|gte)\b/g, (match) => `$${match}`);
    const finalQueryObj = JSON.parse(add_$);
    console.log(colors.bgGreen('QUERY is : '), finalQueryObj);
    this.allUsers = this.allUsers.find();
    return this;
  }

  sort() {
    if (this.query.sort) {
      const sortBy = this.query.sort.split(',').join(' ');
      this.allUsers = this.allUsers.find().sort(sortBy);
    }
    return this;
  }

  fields() {
    if (this.query.fields) {
      const fieldName = this.query.fields.split(',').join(' ');
      this.allUsers = this.allUsers.find().select(fieldName);
    }
    return this;
  }

  exactMatch() {
    if (this.query.name || this.query.role || this.query.email) {
      const exactRequired = this.query;
      console.log(colors.bgYellow('Exact Match : '), exactRequired);
      this.allUsers = this.allUsers.find(exactRequired);
    }
    return this;
  }
}

module.exports = UsersClass;
