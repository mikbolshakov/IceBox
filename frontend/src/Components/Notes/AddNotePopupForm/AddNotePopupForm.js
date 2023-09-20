import React from 'react';
import AddNote from '../AddNote';
import StickerPicker from '../StickerPicker/StickerPicker'
import './AddNotePopupForm.css'
import { useState } from 'react';
import ColorPicker from '../ColorPicker/ColorPicker';
import { NFTStorage, Blob } from 'nft.storage'
import { message } from 'antd';
import IceBoxContract from '../../../Contract/IceBoxMessage.json';
import { ethers } from 'ethers';
import { secp256k1 } from '@polybase/util';
import axios from 'axios';
import { ethPersonalSign } from '@polybase/eth';
import { Polybase } from "@polybase/client";

const db = new Polybase({
  defaultNamespace: "pk/0x593e1594134c988cec1d20de3050e6a001c843e88e54f1e94041fb21623946771da020a4f016e7074e6b6cb0ecb933cc285565bdd791aa67b462b72a359360c1/iceboxsocial",
});

export const AddNotePopupForm = ({closeModal}) => {

  var mySig = "";
  var myHeader = "";

  const [addNoteText, setAddNoteText] = useState("");
  const [selectedSticker, setSelectedSticker] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [loading,setLoading] = useState(false);

  const handleAddNote = async(event) => {
    try {
      event.preventDefault();
      if(loading) return;
      if(addNoteText === ''){
        message.error("Notes cannot be empty");
        return;
      }
      setLoading(true);
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // addToPolybase();
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      console.log("Account is: " + accounts[0]);
      console.log(IceBoxContract.abi);
      // old contract gnosis id: 0xa4d2e7Bf238916CD0677D5C8D328b713114d8b94
      // new contract id: 0x2E969B863AD66a00524189A02858D65FD7550A24
      const Contract = new ethers.Contract("0x9eD7d2968caAF2d5f4A7AD312db7f72171511C2b",IceBoxContract.abi,signer);
      const nftstorage = new NFTStorage({ token: process.env.REACT_APP_NFT_STORAGE_KEY })
      const data = new Blob([{
        text:addNoteText,
        color:selectedColor,
        sticker:selectedSticker
      }])
      const cid = await nftstorage.storeBlob(data);
      console.log(cid);
      const response = await Contract.safeMint(accounts[0],cid);
      const temp = await Contract.getCounter();
      console.log(temp);
      // console.log(response);
      message.success("Notes Added Successfully!")
      setLoading(false);
      closeModal();
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
  }

  function createSig (timestamp, body) {
    try {

    // let privateKey = process.env.POLYBASE_PRIVATE_KEY;
      // let privateKey = process.env.REACT_APP_NFT_STORAGE_KEY;
    var privateKey = 0x199e2434814e840f9e73f2dc4683f59e360d39115baa6d2827be70ffdba9e8a9n;

    const str_to_sign = `${timestamp}.${JSON.stringify(body)}`;
    // console.log(`Stringified String is: ${str_to_sign}`)
    // let privateKey = secp256k1.generatePrivateKey();
    // return secp256k1.sign(privateKey, str_to_sign);
    return ethPersonalSign(privateKey, str_to_sign);
    } catch (error) {
      console.log(`Error creating sig: ${error}`);
    }
  }


  const addToPolybase = async (event) => {
    try {

      


      // var url = "pk%2F0x593e1594134c988cec1d20de3050e6a001c843e88e54f1e94041fb21623946771da020a4f016e7074e6b6cb0ecb933cc285565bdd791aa67b462b72a359360c1%2Ficeboxsocial/collections/User"
      // var url = "https://testnet.polybase.xyz/v0/collections/pk%2F0x593e1594134c988cec1d20de3050e6a001c843e88e54f1e94041fb21623946771da020a4f016e7074e6b6cb0ecb933cc285565bdd791aa67b462b72a359360c1%2Ficeboxsocial/User"
      var url = "https://testnet.polybase.xyz/v0/collections/pk%2F0x593e1594134c988cec1d20de3050e6a001c843e88e54f1e94041fb21623946771da020a4f016e7074e6b6cb0ecb933cc285565bdd791aa67b462b72a359360c1%2Ficeboxsocial%2FUser/records"

      var version = 0;
      var timestamp = Date.now();
      var hash = 'eth-personal-sign';
      // let privateKey = secp256k1.generatePrivateKey();
      var body = {
        'args' : [
          timestamp.toString(),
          addNoteText.toString(),
          selectedColor.toString(),
          selectedSticker.toString()
        ]
      }
      var sig = createSig(timestamp, body);

      console.log(`Sig was: ${sig}`)

      var headers = {
        'Accept' : 'application/json',
        'X-Polybase-Signature' : `v=0,t=${timestamp},h=eth-personal-sign,sig=${sig}`,
      };
      // example header 
      // X-Polybase-Signature: v=0,t=1671884992,h=eth-personal-sign,sig=0x288db6271d92253ae19983a8e5110f1bc1bef1911210127ccbf657d85428ba9917aa9457f0f8e7f300a36b106525d3a3471e63ae265af4898742040a377e1da11c
      await axios.post(url, body, {
        headers: headers,
      });
    
      
    } catch (error) {
      setLoading(false);
      console.log(`Error creating record on PolyBase: ${error}`);
    }

    async function createRecord () {
      const collectionReference = db.collection("User");
      const recordData = await collectionReference.create([
        Date.now().toString(),
          addNoteText.toString(),
          selectedColor.toString(),
          selectedSticker.toString()
      ]);
    }

    // db.signer(async (data) => {
    //   // A permission dialog will be presented to the user
    //   const accounts = await eth.requestAccounts();
    
    //   // If there is more than one account, you may wish to ask the user which
    //   // account they would like to use
    //   const account = accounts[0];
    
    //   const sig = await eth.sign(data, account);
    
    //   return { h: "eth-personal-sign", sig };
    // })
  
  }

  return (
    <div className='add-note-popup-form'>
      <div className='new-sticker-heading'>New Sticker</div>
      <div className='new-sticker-subheading'>Leave your message on the sticky note!</div>
        <AddNote
          addNoteText={addNoteText}
          setAddNoteText={setAddNoteText}
          selectedSticker={selectedSticker}
          selectedColor={selectedColor}
          >
        </AddNote>
      <StickerPicker selectedSticker={selectedSticker} setSelectedSticker={setSelectedSticker}> </StickerPicker>
      <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor}></ColorPicker>
      <button className='submit-note-button' onClick={handleAddNote}>{loading?"Loading...":"Post it"}</button>
    </div>
  );
};
export default AddNotePopupForm;