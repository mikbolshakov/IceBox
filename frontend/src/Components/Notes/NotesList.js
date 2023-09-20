import Note from './Note';
// import AddNote from './AddNote';
import './NotesList.css'

const NotesList = ({
	notes,
	// handleAddNote,
	handleDeleteNote,
}) => {
	return (
		<div className='upper-note-list-container'>
			<div className='notes-list-container'>
				<div className='notes-list'>
					{notes.map((note,idx) => (
						<Note
							key={idx}
							id={note.id}
							text={note.text}
							date={note.date}
							handleDeleteNote={handleDeleteNote}
							stickerIndex = {note.stickerIndex}
							noteColor = {note.noteColor}
						/>
					))}
					{/* <AddNote handleAddNote={handleAddNote} /> */}
				</div>
			</div>
		</div>
	);
};

export default NotesList;