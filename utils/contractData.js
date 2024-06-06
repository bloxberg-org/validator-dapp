import https from "https";
const Web3 = require("web3");
export const httpsAgent = new https.Agent({ keepAlive: true });
const { ethereum } = typeof window !== "undefined" ? window : {};
import helpers from "./helpers";
import { constants } from "./constants";

const PoaNetworkabi = require("../abis/PoaNetworkConsensus.abi.json");
const metaDataAbi = require("../abis/ValidatorMetadata.abi.json");
const metaDataTestAbi = require("../abis/ValidatorMetadataTest.abi.json");
const contractAddress = "0x9850711951A84Ef8a2A31a7868d0dCa34B0661cA";
const metaDataContractAddress = "0xF2Cde379d6818Db4a8992ed132345e18e99689e9";
// const metaDataTestContractAddress =
//   "0x06b2B2238672fc5fbA3980835f93680b101101e7";

const provider = new Web3.providers.HttpProvider("https://core.bloxberg.org");

const web3 = new Web3(provider);

// const gasPrice = web3.utils.toWei("20", "gwei");

// contract

export const PoaContract = new web3.eth.Contract(
  PoaNetworkabi,
  contractAddress
);
export const metaDataContract = new web3.eth.Contract(
  metaDataAbi,
  metaDataContractAddress
);

// export const metaDataTestContract = new web3.eth.Contract(
//   metaDataTestAbi,
//   metaDataTestContractAddress
// );

// check ethereum and get account

export const checkEthereumExists = async () => {
  if (!ethereum) {
    helpers.generateAlert("error", "Error!", "Please Install MetaMask.");
    return false;
  } else {
    const netId = await ethereum.request({
      method: "net_version",
    });
    if (!(netId in constants.NETWORKS)) {
      helpers.generateAlert(
        "error",
        "Error!",
        "Please Connect To Bloxberg network."
      );
    }
    return true;
  }
};

export const getConnectedAccounts = async () => {
  try {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
  } catch (err) {
    let msg = `
        Something went wrong!<br/><br/>
        ${err.message}
      `;
    helpers.generateAlert("error", "Error!", msg);
  }
};

export const checkMiningKey = async (currentKey) => {
  const validators = await PoaContract.methods.getValidators().call();
  let miningKeyBool = validators.includes(currentKey);
  if (miningKeyBool) {
    return true;
  } else {
    return false;
  }
};

export const checkAccessKey = async (currentKey) => {
  console.log("currentKeycurrentKey", currentKey);
  let miningKeyBool = constants.internalAccess.includes(
    web3.utils.toChecksumAddress(currentKey)
  );
  const netId = await ethereum.request({
    method: "net_version",
  });
  if (miningKeyBool && netId in constants.NETWORKS) {
    return true;
  } else {
    return false;
  }
};

export const getMetadata = (address) => {
  return metaDataContract.methods
    .validatorsMetadata(address)
    .call()
    .then((result) => {
      // Return name
      return result;
    });
};
