import mongoose from 'mongoose';

const goalSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Goal', goalSchema);
