//SPDX-License-Identifier:MIT

pragma solidity >=0.5.0 <0.9.0;

contract SimpleContract{
    uint public x;
    constructor()
    {
        x=5;
    }

    function mymethod() external view returns(uint)
    {
        return x;
    }
}