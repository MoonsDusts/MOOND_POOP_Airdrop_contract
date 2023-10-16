import { ethers } from "hardhat";

import holder from "../args/holder";

async function main() {
  const airdrop = await ethers.deployContract("Airdrop", ['0x6693Cd1f198611Fe5592F2A94eB43fB26eDcEE8e']);

  await airdrop.waitForDeployment();

  console.log(
    `Airdrop: `, airdrop.target
  );

  const holdersSupply = holder.reduce((prev, cur) => prev + ethers.parseEther(cur.balance), 0n);

  const AIRDROP_AMOUNT = ethers.parseEther('10000');

  await (await airdrop.setHolderAirdrop(holder.map(item => ({ to: item.address, amount: ethers.parseEther(item.balance), airdropAmount: AIRDROP_AMOUNT * ethers.parseEther(item.balance) / holdersSupply })))).wait()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
