import mongoose from 'mongoose';
const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  link: String,
  location: String,
  status: { type: String, enum: ['Saved','Applied','Interview','Offer','Rejected'], default: 'Saved' },
  dateApplied: Date,
  notes: String,
  tags: [String]
}, { timestamps: true });
export default mongoose.model('Job', JobSchema);
