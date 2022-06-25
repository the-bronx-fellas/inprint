const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Inprint", function () {
  it("test that changing things works", async function () {
    const Inprint = await ethers.getContractFactory("Inprint");
    const blog = await Inprint.deploy("Prime Mover", "the uncaused cause");
    await blog.deployed();

    let info = await blog.blog_info();

    expect(info[0]).to.equal("Prime Mover");
    expect(info[1]).to.equal("the uncaused cause");

    let modTx = await blog.change_blog_name("abc");
    await modTx.wait();
    modTx = await blog.change_blog_description("def");
    await modTx.wait();

    info = await blog.blog_info();
    console.log(info[0]);
    expect(info[0]).to.equal("abc");
    expect(info[1]).to.equal("def");
  });
});
