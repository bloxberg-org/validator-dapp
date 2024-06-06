import { prisma } from "../../server/db/client";
import {
  metaDataContract,
  PoaContract,
  httpsAgent,
} from "../../utils/contractData";
import axios from "axios";

const Sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const getMetadata = (address) => {
  return metaDataContract.methods
    .validatorsMetadata(address)
    .call()
    .then((result) => {
      // Return name
      return result;
    });
};

const isDateWithin3m = (date) => {
  let timeStamp = Math.round(new Date().getTime() / 1000);
  let timeStamp3DaysAgo = timeStamp - 3 * 28 * 24 * 60 * 60;
  return date >= new Date(timeStamp3DaysAgo * 1000).getTime();
};

const getLastBlock = (address) => {
  return axios
    .get(
      "https://blockexplorer.bloxberg.org/api?module=account&action=getminedblocks&address=" +
        address +
        "&page=1&offset=1",
      { httpsAgent }
    )
    .then((res) => {
      return res.data;
    });
};

export default async function handler(req, res) {
  const validators = await PoaContract.methods.getValidators().call();
  for (let i = 0; i < validators.length; i++) {
    let address = validators[i];
    let validatorData = await getLastBlock(address);
    let validatorMetadata = await getMetadata(address);
    let instituteName = validatorMetadata.researchInstitute;
    let researchField = validatorMetadata.researchField;
    let instituteAddress = validatorMetadata.instituteAddress;
    let contactEmail = validatorMetadata.contactEmail;
    let firstName = validatorMetadata.firstName;
    let lastName = validatorMetadata.lastName;
    let lastOnline;
    let isUp3m = false;
    if (validatorData.status == 1) {
      lastOnline = new Date(validatorData.result[0].timeStamp);
      isUp3m = isDateWithin3m(lastOnline);
    }

    const validatorsData = await prisma.validators.findUnique({
      where: {
        id: address,
      },
      include: {
        users: true,
      },
    });

    if (validatorsData) {
      if (validatorsData.users.length !== 0) {
        const found = validatorsData.users.find(
          (el) => el.email === contactEmail
        );

        if (!found && contactEmail.length !== 0) {
          validatorsData.users.push({
            firstName: firstName,
            lastName: lastName,
            email: contactEmail,
          });
          await prisma.validators.update({
            where: { id: address },
            data: {
              researchInstitute: instituteName,
              researchField: researchField,
              instituteAddress: instituteAddress,
              lastOnline: lastOnline,
              users: validatorsData.users,
              active: isUp3m,
            },
          });
        }
      } else {
        if (contactEmail.length !== 0) {
          const validatorsDataupdate = await prisma.validators.update({
            where: { id: address },
            data: {
              id: address,
              researchInstitute: instituteName,
              researchField: researchField,
              instituteAddress: instituteAddress,
              users: {
                create: [
                  {
                    firstName: firstName,
                    lastName: lastName,
                    email: contactEmail,
                  },
                ],
              },
              lastOnline: lastOnline,
              active: isUp3m,
            },
          });
        } else {
          const validatorsDataupdate = await prisma.validators.update({
            where: { id: address },
            data: {
              id: address,
              researchInstitute: instituteName,
              researchField: researchField,
              instituteAddress: instituteAddress,
              lastOnline: lastOnline,
              active: isUp3m,
            },
          });
        }
      }
    }

    await Sleep(200);
  }
  res.status(201).json({ data: "Data Updated successfully" });
}
