// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    address[] public approvers;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum) {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);

        approvers.push(msg.sender);
    }

    function createRequest(string memory description, uint value, address recipient)
        public restricted {
            Request memory newRequest = Request({
                description: description,
                value: value,
                recipient: recipient,
                complete: false
            });

            requests.push(newRequest);
    }
}
