export const UserDetails = ({ user }) => {
	if(user === undefined)
		return <></>;
	return (
      <div className="flex flex-col px-4 pb-4">
        <div className="block">
          <h3 className="flex mb-5 font-bold">Contact Update</h3>
          <div className="grow">
            <div className="bg-light-grey flex justify-between p-4">
              <p> Full Name: </p>
              <p className="text-right pl-2">
                {user.firstName} {user.lastName}{" "}
              </p>
            </div>
            <div className="flex justify-between p-4">
              <p> Email: </p>
              <p className="pl-2 text-right"> {user.email} </p>
            </div>
          </div>
        </div>
      </div>
	)

}
