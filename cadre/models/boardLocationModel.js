import mongoose from 'mongoose';

let BillboardLocationSchema = new mongoose.Schema({
  location: {
    lat: {
      type: Number,
      require: true,
    },
    lng: {
      type: Number,
      require: true,
    },
  },

  addr: {
    street_number: {
      type: String,
      require: true,
    },
    route: {
      type: String,
      require: true,
    },
    ward: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'wards',
      required: true,
    },
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'districts',
      required: true,
    },
    city: {
      type: String,
      require: true,
    },
  },

  isPlan: {
    type: Boolean,
    require: true,
  },

  advertisementForm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'advertisement_forms',
    required: true,
  },

  locationCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'location_categories',
    },
  ],

  imgBillboardLocation: {
    type: Array,
    require: true,
  },
});

BillboardLocationSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'addr.ward',
    select: 'ward',
  }).populate({
    path: 'addr.district',
    select: 'district',
  }).populate({
    path: 'advertisementForm',
    select: 'advertisementForm',
  }).populate({
    path: 'locationCategory',
    select: 'locationCategory',
  });
  next();
});

const boardLocationModel = mongoose.model('board_locations', BillboardLocationSchema);

export default boardLocationModel;
