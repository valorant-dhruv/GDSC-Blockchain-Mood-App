//SPDX-License-Identifier:UNLICENSED

pragma solidity >=0.5.0 <0.9.0;

contract Mood{
    string public currentmood="I am Happy";

    function getmood() external view returns(string memory)
    {
        return currentmood;
    }

    function changemood(string memory _mood) public returns(bool)
    {
        currentmood=_mood;
        return true;
    }
}