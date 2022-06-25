
const hre = require("hardhat");

const MAIN_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

async function main() {

  const Inprint = await hre.ethers.getContractFactory("Inprint");
  const blog = await Inprint.deploy(MAIN_ADDRESS,
                                    "Chuckle Hut",
                                    "a place for laffs",
                                    "0x0000", "");

  await blog.deployed();

  console.log("Inprint blog deployed to:", blog.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
