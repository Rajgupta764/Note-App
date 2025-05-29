import React, { useState, useEffect } from 'react';

const Home = ({ searchTerm }) => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (!title.trim() && !description.trim()) return;

    if (editingId) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingId ? { ...note, title, description } : note
        )
      );
      setEditingId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
      };
      setNotes((prev) => [newNote, ...prev]);
    }

    setTitle('');
    setDescription('');
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setTitle('');
      setDescription('');
      setShowForm(false);
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setDescription(note.description);
    setEditingId(note.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setShowForm(false);
  };

  // ✅ Filter notes based on searchTerm
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-pink-100 p-6 relative">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Your Notes</h1>

      {/* Notes list */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredNotes.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">No matching notes found.</p>
        )}
        {filteredNotes.map((note) => (
          <div key={note.id} className="bg-white p-4 rounded-xl shadow-md relative">
            <h3 className="font-semibold text-lg mb-2 text-gray-800">
              {note.title || <em>No Title</em>}
            </h3>
            <p className="whitespace-pre-wrap text-gray-700 min-h-[80px]">
              {note.description || <em>No Description</em>}
            </p>

            <div className="flex justify-between mt-3">
              <button
                onClick={() => handleEdit(note)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(note.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Note Form */}
      {showForm && (
        <div className="fixed bottom-20 right-6 bg-white p-4 rounded-xl shadow-lg w-80 max-w-full z-50">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            {editingId ? 'Edit Note' : 'Add New Note'}
          </h2>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-blue-400"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-blue-400"
            rows={4}
          />

          <div className="flex justify-end space-x-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleAddNote}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {editingId ? 'Save' : 'Add'}
            </button>
          </div>
        </div>
      )}

      {/* + Button */}
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full w-14 h-14 text-4xl font-bold flex items-center justify-center shadow-lg hover:bg-blue-700 transition z-50"
        title={showForm ? "Close form" : "Add new note"}
      >
        +
      </button>
    </div>
  );
};

export default Home;
