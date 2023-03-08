import haversine from "haversine-distance";

const cities = [
  ['Paris', 48.856614, 2.352222],
  ['Marseille', 43.296482, 5.369780],
  ['Lyon', 45.764043, 4.835659],
  ['Toulouse', 43.604652, 1.444209],
  ['Nice', 43.710173, 7.261953],
  ['Nantes', 47.218371, -1.553621],
  ['Strasbourg', 48.573405, 7.752111],
  ['Montpellier', 43.610769, 3.876716],
  ['Bordeaux', 44.837789, -0.579180],
  ['Lille', 50.629250, 3.057256],
  ['Rennes', 48.117266, -1.677793],
  ['Reims', 49.258329, 4.031696],
  ['Le Havre', 49.494370, 0.107929],
  ['Saint-Étienne', 45.439695, 4.387178],
  ['Toulon', 43.124228, 5.928000],
  ['Angers', 47.478419, -0.563166],
  ['Grenoble', 45.188529, 5.724524],
  ['Dijon', 47.322047, 5.041480],
  ['Nîmes', 43.836699, 4.360054],
  ['Aix-en-Provence', 43.529742, 5.447427],
];

export function getCities(keyword: string): Promise<string[]> {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const cityNames: string[] = cities.map((el) => el[0] as string);

      if (keyword.toLowerCase() === "fail") {
        rej("Bad request");
      } else {
        res(cityNames.filter((el) => el.toLowerCase().includes(keyword.toLowerCase())));
      }
    }, Math.random() * 1000);
  });
};

export function calculateDistance(cityNames: string[]): Promise<any> {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (cityNames.includes("Dijon")) {
        rej("Bad request");
      } else {
        const selectedCities = cityNames.map((el) => cities.find((city) => city[0] === el))

        if (selectedCities.includes(undefined)) {
          rej("Bad request");
        } else {
          res(
            (selectedCities as (string | number)[][]).reduce(
              (acc, cur, idx) => {
                if (idx === selectedCities.length - 1) return acc;

                return [
                  ...acc,
                  haversine(
                    { lat: Number(cur[1]), lng: Number(cur[2]) },
                    { lat: Number(selectedCities[idx + 1]![1]), lng: Number(selectedCities[idx + 1]![2]) }
                  )
                ]
              },
              []
            )
          );
        }
      }
    }, Math.random() * 1000);
  });
};
