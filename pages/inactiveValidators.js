import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import { MainTitle } from "@/components/MainTitle";
import { AllValidators } from "@/components/AllValidators";
import { SearchBar } from "@/components/SearchBar";
import { prisma } from "../server/db/client";
import {
  checkAccessKey,
  getConnectedAccounts,
  checkEthereumExists,
} from "../utils/contractData";

const inactiveValidators = ({ validators }) => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [isValidKey, setiIsValidKey] = useState(false);

  useEffect(() => {
    if (checkEthereumExists()) {
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      // getConnectedAccounts()
      //   .then((value) => {
      //     checkAccessKey(value).then((finalvalue) => {
      //       setiIsValidKey(finalvalue);
      //     });
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  }, []);

  return (
    <section className="px-8">
      <SearchBar setSearchTerm={setSearchTerm} />
      {AllValidators({ validators, searchTerm })}
    </section>
  ) 
};

export async function getServerSideProps() {
  // will always run on the server
  // newest first
  const validators = await prisma.validators.findMany({
    where: {
      active: false,
    },
    include: {
      users: true,
    },
  });
  return {
    props: {
      validators: JSON.parse(JSON.stringify(validators)),
    },
  };
}

export default inactiveValidators;
