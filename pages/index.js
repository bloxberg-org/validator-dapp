import { useState } from "react";
import { AllValidators } from "@/components/AllValidators";
import { SearchBar } from "@/components/SearchBar";
import { prisma } from "../server/db/client";

export default function Home({ validators }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="height-100 bg-background items-center flex-col flex grow">
      <div className="w-content max-w-[100%]">
        <section className="px-8">
          <SearchBar setSearchTerm={setSearchTerm} />
          {AllValidators({ validators, searchTerm })}
        </section>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // will always run on the server
  // newest first
  const validators = await prisma.validators.findMany({
    where: {
      active: true,
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
