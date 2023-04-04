const { expect } = require("chai");
const { network, ethers } = require("hardhat");
const { BigNumber, utils }  = require("ethers");
const { writeFile } = require('fs');

describe("Liquidation 10000", function () {
  it("flash loan with 10000 USDT", async function () {
    await network.provider.request({
        method: "hardhat_reset",
        params: [{
          forking: {
            jsonRpcUrl: process.env.ALCHE_API,
            blockNumber: 12489619,
          }
        }]
      });
    
    const gasPrice = 0;
    //debt_USDT 10000
    const debt_USDT = ethers.utils.parseUnits("10000", 6);

    const accounts = await ethers.getSigners();
    const liquidator = accounts[0].address;

    const beforeLiquidationBalance = BigNumber.from(await hre.network.provider.request({
        method: "eth_getBalance",
        params: [liquidator],
    }));

    const LiquidationOperator = await ethers.getContractFactory("LiquidationOperator");
    const liquidationOperator = await LiquidationOperator.deploy(overrides = {gasPrice: gasPrice});
    await liquidationOperator.deployed();

    await expect(
      liquidationOperator.operate(
        debt_USDT,
        (overrides = {gasPrice: gasPrice})
      )
    ).to.be.reverted;
    console.log("No profit, Transaction revert.")
    
  });
});
