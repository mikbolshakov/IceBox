// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Numbers {
    uint256 public num;

    function incrementNum() external {
        unchecked {
            num++;
        }
    }
}

/*
gas	                30182 gas
transaction cost	26245 gas 
execution cost	    5181 gas 
 */
