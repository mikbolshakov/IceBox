import React from 'react';
import "./ColorPicker.css"

const ColorPicker = ({selectedColor, setSelectedColor}) => {

    const myList = ["#E6D1FF","#99D4FF","#B1F6C8","#FFC1AC","#FFDF80"];

	return (
		<div className='color-picker'>
        <div>Pick your note color!</div>
         <div className='color-picker-list'>
            {myList.map((item, index) => {
                return <text className={"color-picker-text" + ((index == selectedColor) ? "-active":"")}
                onClick={() => setSelectedColor(index)}
                style={{
                    backgroundColor: item
                }}
                ></text>
            })}
         </div>
		</div>
	);
};

export default ColorPicker;