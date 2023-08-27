const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
email: String,
password: String,
name: String,
role: String,
owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
}
},
{
    timestamps: true,
  });

const usersModel = mongoose.model('user', userSchema);

