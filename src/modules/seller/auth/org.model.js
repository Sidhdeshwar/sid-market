const mongoose = require('mongoose');

const organisationSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      // unique: true,
    },
    email: {
      type: String,
      // unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const Organization = mongoose.model('Organization', organisationSchema);

module.exports = Organization;
