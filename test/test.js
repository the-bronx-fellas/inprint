const { expect } = require("chai");
const { ethers } = require("hardhat");


const MAIN_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const SECOND_ADDRESS = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";


describe("Inprint", function () {

  it("test that simple deployment works", async function () {
    const Inprint = await ethers.getContractFactory("Inprint");
    const blog = await Inprint.deploy(MAIN_ADDRESS,
                                      "Chuckle Hut", "a place for laffs",
                                      "0x0000", "");
    await blog.deployed();

    let info = await blog.blog_info();

    expect(info[0]).to.equal("Chuckle Hut");
    expect(info[1]).to.equal("a place for laffs");
    expect(info[2]).to.equal(MAIN_ADDRESS);
    // time created
    expect(info[4]).to.equal("0x0000");
    expect(info[5]).to.equal("");
    expect(info[6]).to.equal(0);
    expect(info[7]).to.equal(0);

    await blog.inaugurate_blog("colonelpanic");

    info = await blog.blog_info();
    expect(info[6]).to.equal(2);
    expect(info[7]).to.equal(1);
  });



  it("test of checking functions", async function () {

    const [owner, addr1] = await ethers.getSigners();

    const Inprint = await ethers.getContractFactory("Inprint");
    const blog = await Inprint.deploy(MAIN_ADDRESS,
                                      "Chuckle Hut", "a place for laffs",
                                      "0x0000", "");
    await blog.deployed();
    await blog.inaugurate_blog("colonelpanic");

    let ret = await blog.user_already_in_blog_p(MAIN_ADDRESS);
    expect(ret).to.equal(true);
    ret = await blog.user_already_in_blog_p(SECOND_ADDRESS);
    expect(ret).to.equal(false);

    ret = await blog.username_already_in_blog_p("colonelpanic");
    expect(ret).to.equal(true);
    ret = await blog.username_already_in_blog_p("Colonelpanic");
    expect(ret).to.equal(false);

    ret = await blog.is_admin_p(MAIN_ADDRESS);
    expect(ret).to.equal(true);
    ret = await blog.is_admin_p(SECOND_ADDRESS);
    expect(ret).to.equal(false);

    ret = await blog.is_allowed_in_p(SECOND_ADDRESS);
    expect(ret).to.equal(false);

    // TODO: WHY ERROR!!!???
    // ret = await blog.connect(addr1.address).join_blog("icelip");
    // console.log(ret);

    // TODO: you know what


  });



  it("test that changing blog metadata works", async function () {
    const Inprint = await ethers.getContractFactory("Inprint");
    const blog = await Inprint.deploy(MAIN_ADDRESS,
                                      "Chuckle Hut", "a place for laffs",
                                      "0x0000", "");
    await blog.deployed();

    // TODO: change metadata

    let info = await blog.blog_info();

    expect(info[0]).to.equal("Chuckle Hut");
    expect(info[1]).to.equal("a place for laffs");
    expect(info[2]).to.equal(MAIN_ADDRESS);
    // time created
    expect(info[4]).to.equal("0x0000");
    expect(info[5]).to.equal("");
    expect(info[6]).to.equal(0);
    expect(info[7]).to.equal(0);

    await blog.inaugurate_blog("colonelpanic");

    info = await blog.blog_info();
    expect(info[6]).to.equal(2);
    expect(info[7]).to.equal(1);
  });


});


    //
    // let modTx = await blog.change_blog_name("abc");
    // await modTx.wait();
    // modTx = await blog.change_blog_description("def");
    // await modTx.wait();
    //
    // info = await blog.blog_info();
    // console.log(info[0]);
    // expect(info[0]).to.equal("abc");
    // expect(info[1]).to.equal("def");
