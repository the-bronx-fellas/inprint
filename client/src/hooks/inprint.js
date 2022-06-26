
import { ethers } from 'ethers';
import { INPRINT_ABI, INPRINT_BYTECODE } from 'chain-info.js';



export class Blog {

  constructor(rpcURL) {
    this.rpcURL = rpcURL;
    this.abi = INPRINT_ABI;
    this.address = null;
    this.provider = new ethers.providers.JsonRpcProvider(this.rpcURL);
    this.contract = null;
    this.signer = null;
    this.address = null;
  }

  connectToBlogAddress = (address) => {
    this.contract = new ethers.Contract(address, this.abi, this.provider);
  };

  connectSigner = () => {
    this.contract = this.contract.connect(this.signer);
  };

  /* --------------------------------------------------- */
  /* reader methods                                      */

  getBlogInfo = () => {
    return new Promise((resolve, reject) => {
      this.contract.blog_info()
        .then(objFromChain => {
          const blogInfo = {
            blogName:         objFromChain['0'],
            blogDescription:  objFromChain['1'],
            creator:          objFromChain['2'],
            createdOn:        objFromChain['3'].toNumber(),
            blogFlags:        objFromChain['4'],
            blogMetadata:     objFromChain['5'],
            currentUserIndex: objFromChain['6'].toNumber(),
            currentPostID:    objFromChain['7'].toNumber()
          };

          resolve(blogInfo);
        })
        .catch(error => reject(new Error(error)));
    });
  };

  getUserInfo = async (myContract) => {
    return new Promise((resolve, reject) => {
      this.contract.get_all_users()
        .then((objFromChain) => {
          const allUsers = {};
          objFromChain.forEach(it => {
            if (it[1] !== 'uncaused-cause') {
              let [tmpaddress, username, time_joined, user_metadata] = it;
              try { user_metadata = JSON.parse(user_metadata); } catch { user_metadata = {}; }
              allUsers[tmpaddress] = {
                username: username,
                time_joined: time_joined.toNumber(),
                user_metadata: user_metadata
              };
            }
          });
          resolve(allUsers);
        })
        .catch((error) => reject(new Error(error)));
    });
  };


  getAllPosts = () => {
    return new Promise((resolve, reject) => {
      this.contract.get_all_posts().
        then(objFromChain => {
          resolve(objFromChain)
        }).
        catch(error => reject(new Error(error)));

    });
  };
  /* --------------------------------------------------- */

  inaugurateBlog = (username) => {
    return new Promise((resolve, reject) => {
      this.contract.inaugurate_blog(username)
        .then(() => resolve(true))
        .catch(error => reject(new Error(error)));
    });
  };


  /* --------------------------------------------------- */
  /* modifier methods                                    */

  changeBlogName = async (newName) => {
    return new Promise((resolve, reject) => {
      this.contract.change_blog_name(newName)
        .then(ret => {
          if (ret)
            resolve(ret)
          else
            reject(new Error('error'))
        })
        .catch(error => reject(new Error(error)));
    });
  }

  changeBlogDescription = (newDescription) => {
    return new Promise((resolve, reject) => {
      this.contract.check_blog_description(newDescription)
        .then(ret => {
          if (ret)
            resolve(ret)
          else
            reject(new Error('error'))
        })
        .catch(error => reject(new Error(error)));
    });
  }
  /* --------------------------------------------------- */


  /* --------------------------------------------------- */
  /* authentication things                               */

  getAddress = () => {
    return this.address;
  };

  authWithMetamask = () => {
    return new Promise(async (resolve, reject) => {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.provider.send('eth_requestAccounts', [])
        .then(() => {
          this.signer = this.provider.getSigner();
          return this.signer.getAddress();
        })
        .then(address => {
          // this.contract = this.contract.connect(this.signer);
          this.address = address;
          resolve(this.address);
        })
        .catch(error => reject(new Error(error)));
    });
  };
  /* --------------------------------------------------- */


  /* --------------------------------------------------- */
  /* 11111111111111                                      */

  deployNewBlog = async ({ creator, blogName, blogDescription,
                     blogFlags, blogMetadata }) => {
    return new Promise(async (resolve, reject) => {

      try {
        let factory = new ethers.ContractFactory(INPRINT_ABI,
                                                INPRINT_BYTECODE,
                                                this.signer);
        let depped = await factory.deploy(creator, blogName, blogDescription,
                                          blogFlags, blogMetadata);
        await depped.deployTransaction.wait();

        resolve(depped.address);
      } catch (error) {
        reject(error);
      }

      });
  };
  /* --------------------------------------------------- */

  /* --------------------------------------------------- */
  /* 22222222222222                                      */

  publishPost = (content, parent, postType, postFlags, postMetadata) => {
    return new Promise((resolve, reject) => {
      const tmp = ethers.utils.arrayify(ethers.utils.keccak256(ethers.utils.toUtf8Bytes(content)));
      this.signer.signMessage(tmp).
        then(sig => {
          return this.contract.publish_post(content, sig, parent, postType,
            postFlags, postMetadata);
            
        }).
        catch(error => reject(new Error(error))).
        then(ret => {
          resolve(ret);
        });
    });
  };


  /* --------------------------------------------------- */

}

