import React from "react";
import AddNoteContainer from "../Notes/AddNoteContainer/AddNoteContainer";
import './Navbar.css';

const Navbar = ({web3Handler,account})=>{

    const trim = (address) =>{
        return address.substr(0,3) + "..." + address.substr(address.length - 3,3);
    }

    return (
        <div>
            <>
                {   account ?
                    <div className="connect-wallet">{trim(account)}</div>:
                    <button onClick={web3Handler} className="connect-wallet">
                        Connect Wallet
                    </button>
                }
            </>
            <abbr title="Create Notes">
                <button className="create-task">
                    {/* TODO: Implement on Submit */}
                    <AddNoteContainer handleAddNote={(text) => alert("Form Submitted")}></AddNoteContainer>
                </button>
            </abbr>
        </div>
    );
}

export default Navbar;