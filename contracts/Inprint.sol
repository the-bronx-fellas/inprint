// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "hardhat/console.sol";


  /**********************************************************************
   *                                                                    *
   *    Inprint.sol                                                     *
   *                                                                    *
   *      author:    Tony Fischetti    <tony.fischetti@gmail.com>       *
   *      version:   9                                                  *
   *                                                                    *
   **********************************************************************/


/**
 * Description:
 *
 *
 */

/**
 * Specifications / flags / config
 *
 *   blog_flags (starting from left-most bit)
 *     0: single user (0) or multi-user (1)                   - 0x8000
 *     1: private (0) or public (1)                           - 0x4000
 *     2: undeletable (0) or deletable (1) posts              - 0x2000
 *     3: unmodifiable (0) or modifiable (1) posts            - 0x1000
 *
 *     4: disallow (0) or allow (1) replies                   - 0x0800
 *     ......
 *
 *   post_flags (starting from left-most bit)
 *     0: user-created (0) or system-created (1)              - 0x8000
 *     1: undeleted (0) or (1) deleted post                   - 0x4000
 *     2: unedited (0) or (1) edited post_type                - 0x2000
 *     3: encrypted (1)                                       - 0x1000
 *
 *   post_type
 *     0x0000 = raw HTML
 *     0x0001 = plain text
 *     0x0002 = image
 *
 */


contract Inprint {

    /* ------------------------------------------------------ */
    /* -- STATE VARIABLES                                     */

    string              blog_name;
    string              blog_description;
    address immutable   creator;
    uint256 immutable   created_on;
    bytes2  immutable   blog_flags;
    string              blog_metadata = "";

    uint256 current_post_id = 0;
    uint256 current_user_index = 0;
    User [] all_users_of_blog;
    Post [] all_posts;

    mapping(address => uint) user_exist_map;
    mapping(string => bool)  username_exist_map;
    mapping(address => bool) admin_map;
    mapping(address => bool) allowlist_map;

    bool conf_multiuser_p;
    bool conf_public_p;
    bool conf_deletable_posts_p;
    bool conf_modifiable_posts_p;
    bool conf_allow_replies_p;
    /* ------------------------------------------------------ */


    /* ------------------------------------------------------ */
    /* -- STRUCTURES                                          */

    struct Post {
        uint256 post_id;
        uint256 unix_timestamp;
        address author;
        string  content;
        bytes   signature;
        uint256 parent;
        uint256 reference_count;
        bytes2  post_type;
        bytes2  post_flags;
        string  post_metadata;
    }

    struct User {
        address user_address;
        string  username;
        uint256 time_joined;
        string  user_metadata;
    }
    /* ------------------------------------------------------ */


    /* ------------------------------------------------------ */
    /* -- EVENTS                                              */

    event UserJoined(
        User theuser
    );

    event NewPost(
        Post thepost
    );

    // event PostChange
    event PostChange(
        string whatkindofchange,
        Post thepost
    );

    event BlogMetadataChange(
        string whatkindofchange
    );

    event UserMetadataChange(
        string whatkindofchange,
        User theuser
    );
    /* ------------------------------------------------------ */


    /* ------------------------------------------------------ */
    /* -- CONSTRUCTOR (and state variable getters)            */

    constructor (address _creator,
                 string memory _blog_name,
                 string memory _blog_description,
                 bytes2        _blog_flags,
                 string memory _blog_metdata) {
        console.log("constructor called!");
        creator = _creator;
        blog_name = _blog_name;
        blog_description = _blog_description;
        blog_flags = _blog_flags;
        blog_metadata = _blog_metdata;
        created_on = block.timestamp;

        // creator is automatically an admin
        admin_map[_creator] = true;
        // creator is automatically allow-listed
        allowlist_map[_creator] = true;
    }

    // should get called right after contract creation
    function inaugurate_blog(string memory username) public returns (bool){
        address who = msg.sender;

        require(who == creator,
                "error: need to be the creator to inaugurate blog");

        // interpreting blog flags (to avoid repeated function calls)
        conf_multiuser_p                 = ((blog_flags & 0x8000) > 0);
        conf_public_p                    = ((blog_flags & 0x4000) > 0);
        conf_deletable_posts_p           = ((blog_flags & 0x2000) > 0);
        conf_modifiable_posts_p          = ((blog_flags & 0x1000) > 0);
        conf_allow_replies_p             = ((blog_flags & 0x0800) > 0);

        // creating system user... the uncaused cause
        User memory uncaused_cause = User(address(this), "uncaused-cause",
                                          created_on, "");
        user_exist_map[address(this)] = current_user_index;
        all_users_of_blog.push(uncaused_cause);
        current_user_index += 1;
        username_exist_map["uncaused-cause"] = true;

        // creates the "prime" post
        Post memory tmp = Post(0, 0, address(this),
                                         "this is a placeholder",
                                         abi.encodePacked(username),
                                         0, 0, 0x0001, 0x8000, "");
        all_posts.push(tmp);
        current_post_id += 1;

        // setting username of blog creator
        uint256 timenow = block.timestamp;
        User memory tmp2 = User(who, username, timenow, "");
        user_exist_map[who] = current_user_index;
        username_exist_map[username] = true;
        all_users_of_blog.push(tmp2);
        current_user_index += 1;
        return true;
    }

    function blog_info() public view returns (string memory, string memory,
                                              address, uint256, bytes2,
                                              string memory, uint256,
                                              uint256) {
        return (blog_name, blog_description, creator, created_on, blog_flags,
                blog_metadata, current_user_index, current_post_id);
    }
    /* ------------------------------------------------------ */




    /* ------------------------------------------------------ */
    /* -- CHECKING FUNCTIONS (VIEW)                           */

    function user_already_in_blog_p(address who)
               public view returns(bool){
        return user_exist_map[who] > 0;
    }

    function username_already_in_blog_p(string memory a_name)
               public view returns(bool){
        return username_exist_map[a_name];
    }

    function is_admin_p(address who) public view returns (bool){
        return admin_map[who];
    }

    function is_allowed_in_p(address who) public view returns (bool){
        return allowlist_map[who];
    }
    /* ------------------------------------------------------ */



    /* ------------------------------------------------------ */
    /* -- ACCESSOR (VIEW or PURE) FUNCTIONS (AND DEBUGGING)   */

    function get_all_posts() public view returns (Post [] memory){
        return all_posts;
    }

    function get_all_users() public view returns (User [] memory){
        return all_users_of_blog;
    }
    /* ------------------------------------------------------ */


    /* ------------------------------------------------------ */
    /* -- CHANGE STATE/REPLACE STATE FUNCTIONS                */

    function change_blog_name(string memory _blog_name) public returns (bool) {
        blog_name = _blog_name;
        return true;
    }

    function change_blog_description(string memory _blog_description)
                                         public returns (bool) {
        blog_description = _blog_description;
        return true;
    }
    /* ------------------------------------------------------ */


    /* ------------------------------------------------------ */
    /* -- MORE COMPLEX STATE-CHANGINGS FUNCTION               */

    function join_blog(string memory username) public returns (bool){
        address who = msg.sender;

        require(conf_multiuser_p || who==creator,
                "blog is single-user. cannot join");
        require(conf_public_p || allowlist_map[who],
                "error: address not allowlisted and group is private");
        require(!user_already_in_blog_p(who),
                "error: user already in blog");
        require(!username_already_in_blog_p(username),
                "error: username already taken");

        uint256 timenow = block.timestamp;
        user_exist_map[who] = current_user_index;
        User memory tmp = User(who, username, timenow, "");
        all_users_of_blog.push(tmp);
        current_user_index += 1;
        username_exist_map[username] = true;
        emit UserJoined(tmp);
        return true;
    }

    function publish_post(string memory content, bytes memory signature,
                          uint256 parent, bytes2 post_type,
                          bytes2  post_flags,
                          string  memory post_metadata)
                               public returns (bool){
        address who = msg.sender;
        uint256 timetouse = block.timestamp;

        require(user_already_in_blog_p(who), "error: user not in blog");
        require(!((post_flags & 0x8000) > 0),
                "error: cannot post a 'system' post");
        require(parent == 0 || conf_allow_replies_p,
                "error: this blog doesn't accept replies");
        require(verify_post_author(content, who, signature),
                "error: signature mismatch");

        Post memory tmp = Post(current_post_id, timetouse, who, content,
                               signature, parent, 0, post_type, post_flags,
                               post_metadata);

        all_posts[parent].reference_count += 1;
        all_posts.push(tmp);
        emit NewPost(tmp);
        current_post_id += 1;
        return true;
    }

    function change_username(string memory new_username) public returns (bool){
        address who = msg.sender;

        require(user_already_in_blog_p(who),
                "error: user not in blog");
        require(!username_already_in_blog_p(new_username),
                "error: username already taken");

        string memory old_username = all_users_of_blog[user_exist_map[who]].username;
        username_exist_map[old_username] = false;
        username_exist_map[new_username] = true;
        all_users_of_blog[user_exist_map[who]].username = new_username;
        emit UserMetadataChange("username-change",
                                all_users_of_blog[user_exist_map[who]]);
        return true;
    }

    function add_admin(address someone) public returns (bool){
        require(is_admin_p(msg.sender),
                "error: need to be an admin to add another admin");
        require(conf_multiuser_p,
                "blog is single-user. cannot add admin");
        admin_map[someone] = true;
        return true;
    }

    function remove_admin(address someone) public returns (bool){
        require(msg.sender == creator,
                "error: need to be blog creator to remove an admin");
        require(creator == someone,
                "error: cannot remove blog creator from admin list");
        admin_map[someone] = false;
        return true;
    }

    function allowlist_address(address someone) public returns (bool){
        require(is_admin_p(msg.sender),
                "error: need to be an admin to allowlist address");
        allowlist_map[someone] = true;
        return true;
    }

    function deny_address(address someone) public returns (bool){
        require(is_admin_p(msg.sender),
                "error: need to be an admin to remove address from allowlist");
        allowlist_map[someone] = false;
        return true;
    }
    /* ------------------------------------------------------ */


    /* ------------------------------------------------------ */
    /* -- UTILITIES                                           */

    function get_hash(string memory text) pure public returns (bytes32){
        return keccak256(abi.encodePacked(text));
    }

    function ec_recover_signer(bytes32 msg_hash, bytes memory sig)
                                             public pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = split_signature(sig);
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixed = keccak256(abi.encodePacked(prefix, msg_hash));
        return ecrecover(prefixed, v, r, s);
    }

    function split_signature(bytes memory sig) public pure returns (bytes32 r,
                                                                    bytes32 s,
                                                                    uint8 v) {
        require(sig.length==65, "invalid signature length");
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
        if (v < 27){
            v += 27;
        }
        require(v==27 || v==28, "invalid signature");
        return (r, s, v);
    }

    function verify_post_author(string memory content,
                                address alleged_author,
                                bytes memory sig)
                                          public pure returns (bool){
        bytes32 the_hash = keccak256(abi.encodePacked(content));
        address real_author = ec_recover_signer(the_hash, sig);
        return (real_author==alleged_author);
    }
    /* ------------------------------------------------------ */

}
