
import * as ethers from './ethers-5.2.esm.min.js';

import { INPRINT_ABI } from './TMPABI.js';



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

  /* reader methods */
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

  inaugurateBlog = (username) => {
    return new Promise((resolve, reject) => {
      this.contract.inaugurate_blog(username)
        .then(() => resolve(true));
    });
  };

  /* modifier methods */
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

}

// export const connectToMetaMask = async (stationState) => {
//   window._DEBUG('attempting connecting to metamask');
//   return new Promise(async (resolve, reject) => {
//     const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
//     let signer;
//     let myAddress;
//     try {
//       await provider.send('eth_requestAccounts', []);
//       const currentChainId = ethereum.networkVersion;
//       const detectedChain = CHAIN_ID_MAPPING[currentChainId];
//       console.log(`ccid: ${currentChainId}`);
//       console.log(`dc: ${detectedChain}`);
//       if (PROVIDER_PARAMS[stationState.contract.chain].chainName !== detectedChain) {
//         console.log('WRONG!!');
//         if (confirm("Switch to correct chain?\n\nAfterwards, when the page reloads, you'll have to connect again")) {
//           await addOrSwitchNetwork(stationState.contract.chain);
//         } else {
//           throw new Error('user declined to change networks... bailing out');
//         }
//       }
//       signer = provider.getSigner();
//       myAddress = await signer.getAddress();
//       resolve({
//         _provider: provider,
//         _signer: signer,
//         _myAddress: myAddress
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };
