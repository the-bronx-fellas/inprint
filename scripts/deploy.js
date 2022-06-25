
const hre = require("hardhat");

async function main() {

  const Inprint = await hre.ethers.getContractFactory("Inprint");
  const blog = await Inprint.deploy("Tofu", "look at that lean cut of BEAN");

  await blog.deployed();

  console.log("Inprint blog deployed to:", blog.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
