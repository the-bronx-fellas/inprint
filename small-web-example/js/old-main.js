'use strict';

// import * as utils from './utils.js';
import * as ethers from './ethers-5.2.esm.min.js';

import { Blog } from './inprint.js';


let blog;





const startDapp = async () => {

  console.log("dapp started");

  Blog.deployNewBlog({ creator: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
                       blogName: "The Chuckle Hut",
                       blogDescription: "a place 4 laffs",
                       blogFlags: "0x0000",
                       blogMetadata: "" })
    .then(nuevoAddress => {
      blog = new Blog(nuevoAddress, "http://127.0.0.1:8545")
    })
    .then(() => {

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

    });
};




window.addEventListener('DOMContentLoaded', startDapp);
