import { createFileRoute } from "@tanstack/react-router";
import supabase from "../../../lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/(profile)/profile")({
  component: Profile,
});

function Profile() {
  const { data, isError } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUser,
  });

  const { picture, full_name, email } = data?.user || {};

  return (
    <div className="flex flex-1 justify-center w-full">
      {isError ? (
        <p>Something went wrong</p>
      ) : (
        <div className="max-w-screen-sm w-full mt-10">
          {data && (
            <div className="border rounded-md bg-white p-14 w-full justify-center flex flex-col items-center gap-4">
              <img
                src={picture}
                alt="profile picture"
                className="object-cover rounded-full w-36"
              />
              <p className="text-xl">{full_name}</p>
              <p>{email}</p>
              <p className="capitalize">{data.role.role}</p>

              <button className="inline-flex px-6 py-2 bg-orange-500 rounded-md text-white hover:bg-white hover:ring-1 hover:ring-orange-500 hover:text-orange-500">
                Edit
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

async function getUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  const { data: role, error: profileError } = await supabase
    .from("role")
    .select()
    .eq("user_id", data.user.id)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  return {
    user: data.user.user_metadata,
    role: role,
  };
}
