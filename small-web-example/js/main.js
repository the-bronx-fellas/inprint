'use strict';

// import * as utils from './utils.js';
// import * as ethers from './ethers-5.2.esm.min.js';
import { Blog } from './inprint.js';

import { INPRINT_ABI } from './chain-info.js';



const startDapp = () => {

  const blog = new Blog("0x5FbDB2315678afecb367f032d93F642f64180aa3",
                        "http://127.0.0.1:8545",
                        INPRINT_ABI);

  blog.getBlogInfo()
    .then(ret => {
      document.getElementById("blog-name").innerHTML = ret.blogName;
      document.getElementById("blog-description").innerHTML = ret.blogDescription;
    });
                
    
                    

};

window.addEventListener('DOMContentLoaded', startDapp);
