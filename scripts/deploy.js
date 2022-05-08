const { ethers } = require("hardhat");

async function main() {
  const Manufacturer = await ethers.getContractFactory("Manufacturer");
  const manufacturer = await Manufacturer.deploy();
  await manufacturer.deployed();
  console.log("Contract deployed to:", manufacturer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
