import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { MainTitle } from "@/components/MainTitle";
import helpers from "../utils/helpers";
import { constants } from "../utils/constants";
import {
  checkEthereumExists,
  checkMiningKey,
  getConnectedAccounts,
  checkAccessKey,
} from "../utils/contractData";
import Loading from "@/components/Loading";

const { ethereum } = typeof window !== "undefined" ? window : {};

const setmetadata = () => {
  const [account, setAccount] = useState("");
  const [isValidVotingKey, setiIsValidVotingKey] = useState(false);
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [researchInstitute, setResearchInstitute] = useState("");
  const [researchField, setResearchField] = useState("");
  const [instituteAddress, setInstituteAddress] = useState("");

  const metaDataTestAbi = require("../abis/ValidatorMetadataTest.abi.json");

  const metaDataTestContractAddress =
    "0x06b2B2238672fc5fbA3980835f93680b101101e7";

  const handleSubmit = async () => {
    event.preventDefault();
    setiIsValidVotingKey(checkAccessKey(account));
    setLoading(true);
    if (isValidVotingKey) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        metaDataTestContractAddress,
        metaDataTestAbi,
        signer
      );
      try {
        let test = await contract.createMetadata(
          firstName,
          lastName,
          contactEmail,
          researchInstitute,
          researchField,
          instituteAddress
        );
        if (test) {
          helpers.generateAlert(
            "success",
            "Congratulations!",
            "Your metadata was sent!"
          );
          setLoading(false);
          const response = await fetch("/api/update-validators-details");
          const data = await response.json();
          console.log("datadatadatadatadata", data);
        }
      } catch (error) {
        console.log("error", error);
        let errDescription;
        if (error.message.includes(constants.userDeniedTransactionPattern))
          errDescription = `Error: ${constants.userDeniedTransactionPattern}`;
        else errDescription = error.message;
        console.log(error);
        let msg = `
          Something went wrong!<br/><br/>
          ${errDescription}
        `;
        helpers.generateAlert("error", "Error!", msg);
        setLoading(false);
      }
    } else {
      helpers.generateAlert("warning", "Warning!", messages.invalidaVotingKey);
      return;
    }
  };

  useEffect(() => {
    if (checkEthereumExists()) {
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      getConnectedAccounts()
        .then((value) => {
          setAccount(value);
          checkAccessKey(value).then((finalvalue) => {
            setiIsValidVotingKey(finalvalue);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return loading ? (
    <Loading />
  ) : isValidVotingKey ? (
    <div className="px-10">
      <form onSubmit={handleSubmit}>
        <div className="text-light-blue text-3xl py-6">
          <MainTitle title="SET METADATA" />
        </div>
        <div className="flex">
          <div className="grow pr-4">
            <div className="text-lg flex flex-col pb-4">
              <div className="text-light-blue text-s">First Name</div>
              <input
                className="px-2 rounded drop-shadow-lg focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-light-blue"
                id="first-name"
                onChange={({ target }) => setFirstName(target?.value)}
                required
              />
            </div>
            <div className="text-lg flex flex-col pb-4">
              <div className="text-light-blue text-s">Contact Email</div>
              <input
                className="px-2 rounded drop-shadow-lg focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-light-blue"
                id="contact-email"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                onChange={({ target }) => setContactEmail(target?.value)}
              />
            </div>
            <div className="text-lg flex flex-col">
              <div className="text-light-blue text-s">Research Field</div>
              <input
                className="px-2 rounded drop-shadow-lg focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-light-blue"
                id="research-field"
                onChange={({ target }) => setResearchField(target?.value)}
                required
              />
            </div>
          </div>
          <div className="grow pl-4">
            <div className="text-lg flex flex-col pb-4">
              <div className="text-light-blue text-s">Last Name</div>
              <input
                className="px-2 rounded drop-shadow-lg focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-light-blue"
                id="last-name"
                onChange={({ target }) => setLastName(target?.value)}
                required
              />
            </div>
            <div className="text-lg flex flex-col pb-4">
              <div className="text-light-blue text-s">Institute Name</div>
              <input
                className="px-2 rounded drop-shadow-lg focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-light-blue"
                id="institute-name"
                onChange={({ target }) => setResearchInstitute(target?.value)}
                required
              />
            </div>
            <div className="text-lg flex flex-col ">
              <div className="text-light-blue text-s">Institute Address</div>
              <input
                className="px-2 rounded drop-shadow-lg focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-light-blue"
                id="institute-address"
                onChange={({ target }) => setInstituteAddress(target?.value)}
                required
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="my-6 p-1 bg-background-header rounded drop-shadow-lg text-white focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-link-active "
        >
          <p className="px-3"> Set Metadata </p>
        </button>
      </form>
    </div>
  ) : (
    <div className="text-light-blue text-3xl py-6">
      <MainTitle title="Invalid Key" />
    </div>
  );
};

export default setmetadata;
