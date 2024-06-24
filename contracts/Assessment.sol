// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Assessment {
    // declaring the initial value of the token supply and the subtraction counter
    uint public tokenSupply = 500;
    uint public transCounter = 2;

    event Transfer(address indexed to, uint256 amount);

    constructor (uint256 _i) payable {
        _i = tokenSupply;
        // _transCtr = transCounter;
    }

    function addTokens(uint _i) public {
        // the assert function here ensures that the input is not more than 1000
        assert(_i < 1000);    

        // this require error handling statement requires the input to be divisible by 5 but not equal to 0
        require(_i % 5 == 0, "Input must be divisible by 5!");
        tokenSupply += _i;
    }

    function transTokens(uint _i, address _add) public payable {
        // this ensures that the user has enough balance to make the transfer
        require(tokenSupply >= _i, "Insufficient Balance!");

        // the assert function here ensures that the input is not more than 1000
        assert(_i < 1000);

        // this require error handling statement requires the input to be divisible by 5 but not equal to 0
        require(_i % 5 == 0 && _i != 0, "Input must be divisible by 5!");
        tokenSupply -= _i;
        transCounter -= 1;

        if(transCounter < 0) {
            revert("Transfer Limit Reached!");
        }

        emit Transfer(_add, _i);

    }

    function showTokens () external view returns(uint) {
        return tokenSupply;
    }

    function numTrans () external view returns(uint) {
        return transCounter;
    }

}