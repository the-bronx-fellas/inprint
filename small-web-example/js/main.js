'use strict';

// import * as utils from './utils.js';
import * as ethers from './ethers-5.2.esm.min.js';

import { Blog } from './inprint.js';


const blog = new Blog("0x5FbDB2315678afecb367f032d93F642f64180aa3",
                      "http://127.0.0.1:8545");

const startDapp = async () => {

  console.log("dapp started");

  blog.getBlogInfo()
    .then(ret => {
      document.getElementById("blog-name").innerHTML = ret.blogName;
      document.getElementById("blog-description").innerHTML = ret.blogDescription;
      console.log(ret);
    });
                
  const mmbutton = document.getElementById("connect-button");
  const cbnbutton = document.getElementById("change-blog-name");
  const ibbutton = document.getElementById("inaugurate-blog");

  const logInToMetaMask = () => {
    blog.authWithMetamask()
      .then(() => {
        mmbutton.innerText = blog.getAddress();
        mmbutton.disabled = true;
      })
      .then(() => {


        const makeChangeBlogName = () => {
          let newName = prompt("enter new name");
          blog.changeBlogName(newName)
            .then(console.log);
        };
        cbnbutton.addEventListener('click', makeChangeBlogName);


        const makeInaugurateBlog = () => {
          let username = prompt("enter username");
          blog.inaugurateBlog(username)
            .then(console.log);

        };
        ibbutton.addEventListener('click', makeInaugurateBlog);



      });
  };


  mmbutton.addEventListener('click', logInToMetaMask);
    
  
                    

};





window.addEventListener('DOMContentLoaded', startDapp);
