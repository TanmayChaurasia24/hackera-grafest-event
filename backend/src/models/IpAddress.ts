const mongoose = require('mongoose');

const IpAddressSchema = new mongoose.Schema({
  teamId: {
    type: String,
    required: true
  },
  day: {
    type: Number,
    required: true
  },
  round: {
    type: Number,
    required: true
  },
  ipAddress: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('IpAddress', IpAddressSchema);
