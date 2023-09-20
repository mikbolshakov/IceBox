import "./App.css";
import { useState } from "react";
import NotesList from "./Components/Notes/NotesList";
import Navbar from "./Components/Navbar/Navbar";
import { ethers } from "ethers";
import { IntmaxWalletSigner } from "webmax";

const App = () => {
  const [account, setAccount] = useState(null);
  const web3Handler = async () => {
    // const signer = new IntmaxWalletSigner();
    // const account = await signer.connectToAccount();
    // console.log(account);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
  };

  // The list of notes to display
  // TODO: Figure out how to fetch the notes list from database
  const [notes, setNotes] = useState([
    {
      id: "testNoteId123123123",
      text: "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem",
      date: "16/03/2023",
      stickerIndex: 0,
      noteColor: "#E6D1FF",
    },
    {
      id: "testN12oteId",
      text: "Test Note",
      date: "16/03/2023",
      stickerIndex: 1,
      noteColor: "#99D4FF",
    },
    {
      id: "tesawdawtNoteId3",
      text: "Test Note",
      date: "16/03/2023",
      stickerIndex: 0,
      noteColor: "#E6D1FF",
    },
    {
      id: "testNoteId",
      text: "Test Note",
      date: "16/03/2023",
      stickerIndex: 1,
      noteColor: "#99D4FF",
    },
    {
      id: "testNoteId",
      text: "Test Note",
      date: "16/03/2023",
      stickerIndex: 0,
      noteColor: "#E6D1FF",
    },
    {
      id: "testNoteId",
      text: "Test Note",
      date: "16/03/2023",
      stickerIndex: 1,
      noteColor: "#99D4FF",
    },
    {
      id: "testNoteId",
      text: "Test Note",
      date: "16/03/2023",
      stickerIndex: 0,
      noteColor: "#E6D1FF",
    },
    {
      id: "testNoteId",
      text: "Test Note",
      date: "16/03/2023",
      stickerIndex: 1,
      noteColor: "#99D4FF",
    },
    {
      id: "testNoteId",
      text: "Test Note",
      date: "16/03/2023",
      stickerIndex: 0,
      noteColor: "#E6D1FF",
    },
    {
      id: "testNoteId",
      text: "Test Note",
      date: "16/03/2023",
      stickerIndex: 1,
      noteColor: "#99D4FF",
    },
    {
      id: "testNoteId",
      text: "Test Note",
      date: "16/03/2023",
      stickerIndex: 0,
      noteColor: "#E6D1FF",
    },
    {
      id: "testNoteId",
      text: "Test Note",
      date: "16/03/2023",
      stickerIndex: 1,
      noteColor: "#99D4FF",
    },
    {
      id: "testNoteId",
      text: "Test Note",
      date: "16/03/2023",
      stickerIndex: 0,
      noteColor: "#E6D1FF",
    },
    {
      id: "testNoteId",
      text: "Test Note",
      date: "16/03/2023",
      stickerIndex: 1,
      noteColor: "#99D4FF",
    },
    {
      id: "testNoteId",
      text: "Test Note",
      date: "16/03/2023",
      stickerIndex: 0,
      noteColor: "#E6D1FF",
    },
    {
      id: "testNoteId",
      text: "Test Note",
      date: "16/03/2023",
      stickerIndex: 1,
      noteColor: "#99D4FF",
    },
    {
      id: "testNoteId",
      text: "Test Note",
      date: "16/03/2023",
      stickerIndex: 0,
      noteColor: "#E6D1FF",
    },
    {
      id: "testNoteId",
      text: "Test Note",
      date: "16/03/2023",
      stickerIndex: 1,
      noteColor: "#99D4FF",
    },
  ]);

  // TODO: Implement adding a new note
  const addNote = (text) => {
    // const date = new Date();
    // const newNote = {
    // 	id: nanoid(),
    // 	text: text,
    // 	date: date.toLocaleDateString(),
    // };
    // const newNotes = [...notes, newNote];
    // setNotes(newNotes);
  };

  // TODO: Implement deleting a note? Nah probably not necessary
  const deleteNote = (id) => {
    // const newNotes = notes.filter((note) => note.id !== id);
    // setNotes(newNotes);
  };

  return (
    <div className="App">
      <Navbar web3Handler={web3Handler} account={account} />
      <div className="logo-img-div">
        <img className="logo-img" src="./img/Fridge up.svg"></img>
      </div>
      <div className="Notes-List-Container">
        <NotesList
          notes={notes}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        ></NotesList>
      </div>
    </div>
  );
};

export default App;
