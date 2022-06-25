// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "hardhat/console.sol";

contract Inprint {

    string blog_name;
    string blog_description;
    uint256 created_on;


    constructor (string memory _blog_name,
                 string memory _blog_description) {
        blog_name = _blog_name;
        blog_description = _blog_description;
        console.log("constructor called!");
        created_on = block.timestamp;
    }

    function blog_info() public view returns (string memory,
                                                 string memory,
                                                 uint256) {
        return (blog_name, blog_description, created_on);
    }

    function change_blog_name(string memory _blog_name) public returns (bool) {
        blog_name = _blog_name;
        return true;
    }

    function change_blog_description(string memory _blog_description)
                                         public returns (bool) {
        blog_description = _blog_description;
        return true;
    }
}
