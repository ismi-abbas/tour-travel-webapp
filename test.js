import supabase from "./src/lib/supabase";

const { data } = await supabase.from("places").select();
const states = {};

data.forEach((place) => {
  if (place.city) {
    if (!states[place.state]) {
      states[place.state] = {
        name: place.state,
        value: place.state.toLowerCase(),
        district: [],
      };
    }
    if (
      !states[place.state].district.some(
        (d) => d.value === place.city.toLowerCase().replace(/\s+/g, "_"),
      )
    ) {
      states[place.state].district.push({
        name: place.city,
        value: place.city.toLowerCase().replace(/\s+/g, "_"),
      });
    }
  }
});

const formattedStates = Object.values(states);

console.log(JSON.stringify(formattedStates));
