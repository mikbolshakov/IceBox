import { useState } from 'react';
import './AddNote.css'

const AddNote = ({addNoteText, setAddNoteText, selectedSticker, selectedColor}) => {
	const characterLimit = 256;
	
    const myList = ["#E6D1FF","#99D4FF","#B1F6C8","#FFC1AC","#FFDF80"];

    // Limits note length to 156 chars as per design doc
	const handleChange = (event) => {
		if (characterLimit - event.target.value.length >= 0) {
			setAddNoteText(event.target.value);
		}
	};

	return (
		<div className='add-note-container'>
			<div className='note-new' style={{backgroundColor: myList[selectedColor]}}>
			<textarea
				// rows='20'
				placeholder='Type to add a note...'
				value={addNoteText}
				onChange={handleChange}
				style={{backgroundColor: myList[selectedColor]}}
			></textarea>
			<div className='note-footer'>
				<small>
					{characterLimit - addNoteText.length} Remaining
				</small>
				<img src={`./img/stickers/${selectedSticker}.svg`}></img>
			</div>
		</div>
		</div>
	);
};

export default AddNote;