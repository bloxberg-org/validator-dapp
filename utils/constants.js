const constants = {};
constants.organization = "bloxberg-org";
constants.repoName = "bloxberg-network-consensus-contracts";
constants.addressesSourceFile = "contracts.json";
constants.ABIsSources = {
  // KeysManager: 'KeysManager.abi.json',
  PoaNetworkConsensus: "PoaNetworkConsensus.abi.json",
  ValidatorMetadata: "ValidatorMetadata.abi.json",
  // ProofOfPhysicalAddress: 'ProofOfPhysicalAddress.abi.json'
};
constants.userDeniedTransactionPattern = "User denied transaction";
constants.rootPath = "/bloxberg-dapps-validators";
constants.branches = {
  DAI: "dai",
  CORE: "core",
  SOKOL: "sokol",
  KOVAN: "kovan",
  BLOXBERG: "master",
};

constants.NETWORKS = {
  99: {
    NAME: "Core",
    RPC: "https://core.poa.network",
    BRANCH: constants.branches.CORE,
    TESTNET: false,
  },
  100: {
    NAME: "Dai",
    RPC: "https://dai.poa.network",
    BRANCH: constants.branches.DAI,
    TESTNET: false,
  },
  8995: {
    NAME: "bloxberg",
    RPC: "https://core.bloxberg.org",
    BRANCH: constants.branches.BLOXBERG,
    TESTNET: false,
  },
};

constants.internalAccess = [
  "0x425b361d280a9c68795d451c0d183862A5eba3A2",
  "0xCdA5Ea6D8C96FA13346759F734E8351742378441",
  "0xc6c585633A1f9F2fF862C6860A477D7B5AFC64BA"
];

module.exports = {
  constants,
};
