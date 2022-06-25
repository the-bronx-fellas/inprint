
import { ethers } from 'ethers';
import { INPRINT_ABI } from 'chain-info.js';

export class Blog {

  constructor(address, rpcURL) {
    this.rpcURL = rpcURL;
    this.abi = INPRINT_ABI;
    this.address = address;
    this.provider = new ethers.providers.JsonRpcProvider(this.rpcURL);
    this.contract = new ethers.Contract(address, this.abi, this.provider);
    this.signer = null;
    this.address = null;
  }


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
  /* --------------------------------------------------- */

  inaugurateBlog = (username) => {
    return new Promise((resolve, reject) => {
      this.contract.inaugurate_blog(username)
        .then(() => resolve(true));
    });
  };


  /* --------------------------------------------------- */
  /* modifier methods                                    */

  changeBlogName = (newName) => {
    return new Promise((resolve, reject) => {
      this.contract.change_blog_name(newName)
        .then(ret => {
          if (ret)
            resolve(ret)
          else
            reject(new Error(error))
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
            reject(new Error(error))
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
          this.contract = this.contract.connect(this.signer);
          this.address = address;
          console.log(this.address);
          console.log(this.signer);
          resolve(true);
        });
    });
  };
  /* --------------------------------------------------- */

}


