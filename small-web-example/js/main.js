'use strict';

// import * as utils from './utils.js';
import * as ethers from './ethers-5.2.esm.min.js';

import { Blog } from './inprint.js';


let blog;





const startDapp = async () => {

  console.log("dapp started");

  blog = new Blog("http://127.0.0.1:8545");

  console.log(blog);

  await blog.authWithMetamask();

  let nAddress = await blog.deployNewBlog({ creator: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
                             blogName: "The Chuckle Hut", blogDescription: "a place 4 laffs",
                             blogFlags: "0x0000", blogMetadata: "" });

  console.log(nAddress);

  blog.connectToBlogAddress(nAddress);
  blog.connectSigner();

  console.log(await blog.getBlogInfo());

  // await blog.changeBlogName("Chuckle Hut 2!!!!!");
  //
  // console.log(await blog.getBlogInfo());

  console.log(await blog.changeBlogName("Chuckle Hut 2!!!!!"));

  console.log(await blog.getBlogInfo());



  const spitButton = document.getElementById("spit-blog-info");

  const spitIt = async () => {
    console.log(await blog.getBlogInfo());
  };
  spitButton.addEventListener("click", spitIt);


};






window.addEventListener('DOMContentLoaded', startDapp);
