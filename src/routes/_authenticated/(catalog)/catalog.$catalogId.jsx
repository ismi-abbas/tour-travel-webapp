import { createFileRoute } from "@tanstack/react-router";
import supabase from "../../../lib/supabase";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

const getPlaceDetails = async (catalogId) => {
  const { data, error } = await supabase
    .from("places")
    .select("*")
    .eq("id", catalogId)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const placeDetailsQueryOptions = (catalogId) =>
  queryOptions({
    queryKey: ["place-details", catalogId],
    queryFn: async () => await getPlaceDetails(catalogId),
  });

export const Route = createFileRoute(
  "/_authenticated/(catalog)/catalog/$catalogId",
)({
  component: DetailsComponent,
});

function DetailsComponent() {
  const catalogId = Route.useParams().catalogId;
  const { data, isError } = useSuspenseQuery(
    placeDetailsQueryOptions(catalogId),
  );

  return (
    <div className="container">
      <div className="flex flex-col">
        {isError ? (
          <div className="flex flex-1 justify-center">
            <h2 className="text-xl">Server Error</h2>
          </div>
        ) : (
          data && (
            <div className="flex flex-1 justify-center flex-col px-20 mt-10">
              <div className="w-full h-[500px] rounded-lg">
                <img
                  src={data.image}
                  alt="image"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="flex mt-4 flex-col items-start justify-center gap-4">
                <h3 className="text-xl font-medium">{data.name}</h3>
                <p className="text-justify">
                  {data.description ?? "No Description"}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
