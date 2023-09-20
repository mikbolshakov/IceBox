import React from 'react';
import "./StickerPicker.css"

const StickerPicker = ({selectedSticker, setSelectedSticker}) => {

    const myList = [0,1,2,3,4];

	return (
		<div className='sticker-picker'>
        <div>Pick your sticker!</div>
         {myList.map((item, index) => {
            return <img className={"sticker-picker-image" + ((index == selectedSticker) ? "-active":"")}
            src={`./img/stickers/${index}.svg`}
            onClick={() => setSelectedSticker(index)}
            ></img>
         })}
		</div>
	);
};

export default StickerPicker;