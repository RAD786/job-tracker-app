import mongoose from 'mongoose';
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: String,
  tech: [String],
  repoUrl: String,
  liveUrl: String,
  image: String,
  highlight: { type: Boolean, default: false }
}, { timestamps: true });
export default mongoose.model('Project', ProjectSchema);
