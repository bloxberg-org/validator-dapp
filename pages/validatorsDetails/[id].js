import { MainTitle } from "@/components/MainTitle";
import { UserDetails } from "@/components/UserDetails";
import { useRouter } from "next/router";
import { prisma } from "../../server/db/client";

export default function ValidatorDetails({ validatorsDetails }) {
  //{ validatorsDetails }) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <section className="px-8 pt-4">
        <MainTitle title={id} text_size="text-3xl" />
        <div className="block flex-col mb-7 bg-white rounded-lg shadow-xl">
          <div className="flex justify-between rounded-t-md p-4 mb-5 bg-background-header">
            <div className="block">
              <div className="text-white font-bold break-all">
                {validatorsDetails.researchInstitute}
              </div>
              <div className="text-grey text-xs">
                {validatorsDetails.instituteAddress}
              </div>
              <div className="text-grey text-xs">
                {new Date(validatorsDetails.lastOnline).toString()}
              </div>
            </div>
          </div>
          {/* <UserDetails user={validatorsDetails.users[0]} /> */}
          {validatorsDetails.users.map((user) => (
            <UserDetails user={user} />
          ))}
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const validatorsDetails = await prisma.validators.findUnique({
    where: {
      id: params.id,
    },
    include: {
      users: true,
    },
  });
  return {
    props: {
      validatorsDetails: JSON.parse(JSON.stringify(validatorsDetails)),
    },
  };
}
