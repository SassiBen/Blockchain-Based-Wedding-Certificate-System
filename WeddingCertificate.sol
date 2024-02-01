// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WeddingCertificate {
    string public partner1;
    string public partner2;
    string public Children;
    bool public isDivorced;

    struct Date {
        uint16 day;
        uint16 month;
        uint16 year;
    }

    Date public weddingDate;

    // Event declaration
    event Divorce(bool status);

    constructor(string memory _partner1, string memory _partner2, uint16 _day, uint16 _month, uint16 _year, string memory _Children) {
        partner1 = _partner1;
        partner2 = _partner2;
        weddingDate = Date(_day, _month, _year);
        Children = _Children;
        isDivorced = false;
    }

    function getWeddingDetails() public view returns (string memory, string memory, uint16, uint16, uint16, string memory, bool) {
        return (partner1, partner2, weddingDate.day, weddingDate.month, weddingDate.year, Children, isDivorced);
    }

    function fileForDivorce() public {
        
        isDivorced = true;
        emit Divorce(true);
    }
}
