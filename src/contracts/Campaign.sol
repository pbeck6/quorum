// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract Campaign {
    address public manager;
    uint public minimumContribution;

    constructor(uint minimum) {
        manager = msg.sender;
        minimumContribution = minimum;
    }
}
