import { Validator } from "@/components/Validator";
import { MainTitle } from "@/components/MainTitle";

export const AllValidators = ({ validators, searchTerm }) => {
  function filter_validators() {
    return validators
      .filter((validator, index) => {
        return Object.values(validator)
          .join(" ")
          .replace(/ +(?= )/g, "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      })
      .map((validator) => (
        <Validator
          firstName={
            validator.users.length > 0 ? validator.users[0].firstName : null
          }
          lastName={
            validator.users.length > 0 ? validator.users[0].lastName : null
          }
          instituteAddress={validator.instituteAddress}
          researchField={validator.researchField}
          researchInstitute={validator.researchInstitute}
          walletAddress={validator.id}
          key={validator.id}
        />
      ));
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="text-4xl text-light-blue">
          <MainTitle
            title="SHOW METADATA"
            text={"Total number of validators: " + validators.length}
          />
        </div>
        {filter_validators()}
      </div>
    </>
  );
};
