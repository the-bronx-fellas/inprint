
import * as ethers from './ethers-5.2.esm.min.js';

// import {
//   PROVIDER_PARAMS, CHAIN_ID_MAPPING
// } from './chain-info.js';



// export const isMetaMaskInstalled = () => {
//   return Boolean(window.ethereum && window.ethereum.isMetaMask);
// };
//
// export const addOrSwitchNetwork = (chain) => {
//   return window.ethereum.request({
//     method: 'wallet_addEthereumChain',
//     params: [PROVIDER_PARAMS[chain]]
//   });
// };


export class Blog {

  constructor(address, rpcURL, abi) {
    this.rpcURL = rpcURL;
    this.abi = abi;
    this.address = address;
    this.provider = new ethers.providers.JsonRpcProvider(this.rpcURL);
    this.contract = new ethers.Contract(address, abi, this.provider);
    this.signer = null;
  }

  /* reader methods */
  getBlogInfo = () => {
    return new Promise((resolve, reject) => {
      this.contract.blog_info()
        .then(objFromChain => {
          const blogInfo = {
            blogName: objFromChain['0'],
            blogDescription: objFromChain['1'],
          };

          resolve(blogInfo);
        })
        .catch(error => reject(new Error(error)));
    });
  };

  /* modifier methods */
  changeBlogName = (newName) => {
    return new Promise((resolve, reject) => {
      this.contract.check_blog_name(newName)
        .then(ret => {
          if (ret)
            resolve(ret)
          else
            reject(new Error(error))
        })
        .catch(error => reject(new Error(error)));
    });
  }

  /* modifier methods */
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


  /* authentication things */
  getAddress = () => {
    return this.signer.address;
  };

  authWithMetamask = () => {
    this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    this.signer = provider.getSigner();
  };

}

