
export const INPRINT_ABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_creator",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_blog_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_blog_description",
          "type": "string"
        },
        {
          "internalType": "bytes2",
          "name": "_blog_flags",
          "type": "bytes2"
        },
        {
          "internalType": "string",
          "name": "_blog_metdata",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "whatkindofchange",
          "type": "string"
        }
      ],
      "name": "BlogMetadataChange",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "post_id",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "unix_timestamp",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "author",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "content",
              "type": "string"
            },
            {
              "internalType": "bytes",
              "name": "signature",
              "type": "bytes"
            },
            {
              "internalType": "uint256",
              "name": "parent",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "reference_count",
              "type": "uint256"
            },
            {
              "internalType": "bytes2",
              "name": "post_type",
              "type": "bytes2"
            },
            {
              "internalType": "bytes2",
              "name": "post_flags",
              "type": "bytes2"
            },
            {
              "internalType": "string",
              "name": "post_metadata",
              "type": "string"
            }
          ],
          "indexed": false,
          "internalType": "struct Inprint.Post",
          "name": "thepost",
          "type": "tuple"
        }
      ],
      "name": "NewPost",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "whatkindofchange",
          "type": "string"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "post_id",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "unix_timestamp",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "author",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "content",
              "type": "string"
            },
            {
              "internalType": "bytes",
              "name": "signature",
              "type": "bytes"
            },
            {
              "internalType": "uint256",
              "name": "parent",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "reference_count",
              "type": "uint256"
            },
            {
              "internalType": "bytes2",
              "name": "post_type",
              "type": "bytes2"
            },
            {
              "internalType": "bytes2",
              "name": "post_flags",
              "type": "bytes2"
            },
            {
              "internalType": "string",
              "name": "post_metadata",
              "type": "string"
            }
          ],
          "indexed": false,
          "internalType": "struct Inprint.Post",
          "name": "thepost",
          "type": "tuple"
        }
      ],
      "name": "PostChange",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "user_address",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "username",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "time_joined",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "user_metadata",
              "type": "string"
            }
          ],
          "indexed": false,
          "internalType": "struct Inprint.User",
          "name": "theuser",
          "type": "tuple"
        }
      ],
      "name": "UserJoined",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "whatkindofchange",
          "type": "string"
        },
        {
          "components": [
            {
              "internalType": "address",
              "name": "user_address",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "username",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "time_joined",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "user_metadata",
              "type": "string"
            }
          ],
          "indexed": false,
          "internalType": "struct Inprint.User",
          "name": "theuser",
          "type": "tuple"
        }
      ],
      "name": "UserMetadataChange",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "someone",
          "type": "address"
        }
      ],
      "name": "add_admin",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "someone",
          "type": "address"
        }
      ],
      "name": "allowlist_address",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "blog_info",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "bytes2",
          "name": "",
          "type": "bytes2"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_blog_description",
          "type": "string"
        }
      ],
      "name": "change_blog_description",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_blog_name",
          "type": "string"
        }
      ],
      "name": "change_blog_name",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "new_username",
          "type": "string"
        }
      ],
      "name": "change_username",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "someone",
          "type": "address"
        }
      ],
      "name": "deny_address",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "msg_hash",
          "type": "bytes32"
        },
        {
          "internalType": "bytes",
          "name": "sig",
          "type": "bytes"
        }
      ],
      "name": "ec_recover_signer",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "get_all_posts",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "post_id",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "unix_timestamp",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "author",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "content",
              "type": "string"
            },
            {
              "internalType": "bytes",
              "name": "signature",
              "type": "bytes"
            },
            {
              "internalType": "uint256",
              "name": "parent",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "reference_count",
              "type": "uint256"
            },
            {
              "internalType": "bytes2",
              "name": "post_type",
              "type": "bytes2"
            },
            {
              "internalType": "bytes2",
              "name": "post_flags",
              "type": "bytes2"
            },
            {
              "internalType": "string",
              "name": "post_metadata",
              "type": "string"
            }
          ],
          "internalType": "struct Inprint.Post[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "get_all_users",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "user_address",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "username",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "time_joined",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "user_metadata",
              "type": "string"
            }
          ],
          "internalType": "struct Inprint.User[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "text",
          "type": "string"
        }
      ],
      "name": "get_hash",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "username",
          "type": "string"
        }
      ],
      "name": "inaugurate_blog",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "who",
          "type": "address"
        }
      ],
      "name": "is_admin_p",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "who",
          "type": "address"
        }
      ],
      "name": "is_allowed_in_p",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "username",
          "type": "string"
        }
      ],
      "name": "join_blog",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "content",
          "type": "string"
        },
        {
          "internalType": "bytes",
          "name": "signature",
          "type": "bytes"
        },
        {
          "internalType": "uint256",
          "name": "parent",
          "type": "uint256"
        },
        {
          "internalType": "bytes2",
          "name": "post_type",
          "type": "bytes2"
        },
        {
          "internalType": "bytes2",
          "name": "post_flags",
          "type": "bytes2"
        },
        {
          "internalType": "string",
          "name": "post_metadata",
          "type": "string"
        }
      ],
      "name": "publish_post",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "someone",
          "type": "address"
        }
      ],
      "name": "remove_admin",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "sig",
          "type": "bytes"
        }
      ],
      "name": "split_signature",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        },
        {
          "internalType": "uint8",
          "name": "v",
          "type": "uint8"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "who",
          "type": "address"
        }
      ],
      "name": "user_already_in_blog_p",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "a_name",
          "type": "string"
        }
      ],
      "name": "username_already_in_blog_p",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "content",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "alleged_author",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "sig",
          "type": "bytes"
        }
      ],
      "name": "verify_post_author",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    }
  ];
