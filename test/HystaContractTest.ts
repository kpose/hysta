import { expect } from "chai";
import {loadFixture} from '@nomicfoundation/hardhat-network-helpers';
import { ethers } from "hardhat";

describe('Testing Hysta Contract', () => {
  // run fixtures one time
  async function deployHystaFixtures() {
    const [owner] = await ethers.getSigners();
    const ContractToken = await ethers.getContractFactory('HystaContract');
    const hystaContract = await ContractToken.deploy();

    return {owner, hystaContract, ContractToken};
  }

  it('Contract has been successfully deployed', async () => {
    const {hystaContract} = await loadFixture(deployHystaFixtures);
  } )
})
