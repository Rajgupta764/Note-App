import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // reference to user
  title: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

const Note = mongoose.model('Note', NoteSchema);
export default Note;
