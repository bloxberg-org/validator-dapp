import Link from "next/link";

export const Validator = (props) => {
  return (
    <div className="block flex-col mb-7 bg-white rounded-lg shadow-xl">
		<Link href={"/validatorsDetails/" + props.walletAddress }>
			<div className="flex justify-between rounded-t-md p-4 mb-5 bg-background-header">
			  <div className="block">
				 <div className="text-white font-bold break-all">{props.walletAddress}</div>
				 <div className="text-grey text-xs">Wallet Address</div>
			  </div>
			</div>
		  </Link>
      <div className="flex flex-col md:flex-row px-4 pb-4">
        <div className="block md:w-1/2 md:pr-4">
          <h3 className="flex mb-5 font-bold">Bloxberg Member</h3>
          <div className="grow">
            <div className="bg-light-grey flex justify-between p-4">
              <p> Full Name: </p>
              <p className="text-right pl-2">
                {props.firstName} {props.lastName}{" "}
              </p>
            </div>
            <div className="flex justify-between p-4">
              <p> Research Field: </p>
              <p className="pl-2 text-right"> {props.researchField} </p>
            </div>
          </div>
        </div>
        <div className="block md:w-1/2 md:pl-4">
          <h3 className="flex mb-5 font-bold">Research Institute</h3>
          <div>
            <div className="bg-light-grey flex justify-between p-4">
              <p className="block"> Institute Name: </p>
              <p className="text-right pl-2"> {props.researchInstitute} </p>
            </div>
            <div className="flex justify-between p-4">
              <p> Address: </p>
              <p className="text-right pl-2"> {props.instituteAddress} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
