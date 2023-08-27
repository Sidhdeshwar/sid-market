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
  }
);

const registerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      // unique: true,
    },
    name: String,
    company: String,
    _org: {
      type: mongoose.Schema.Types.ObjectId,
      ref: '_org'
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: 'admin',
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  // {
  //   toJSON: { virtuals: true }, //* to add any virtuals
  //   toObject: { virtuals: true },
  // },
  {
    timestamps: true,
  },
);

// registerSchema.virtual('isEmailVerified').get(() => false);
// registerSchema.virtual('role').get(() => 'admin');
// registerSchema.virtual('deleted').get(() => false);

const registerModel = mongoose.model('users', registerSchema);

const orgModel = mongoose.model('org', organisationSchema);

module.exports = { registerModel, orgModel };
