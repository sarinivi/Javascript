const distances = [
  {
    start: "chennai",
    end: "villupuram",
    distance: 166,
  },
  {
    start: "villupuram",
    end: "trichy",
    distance: 165,
  },
  {
    start: "trichy",
    end: "madurai",
    distance: 138,
  },
  {
    start: "madurai",
    end: "thirunelvelli",
    distance: 171,
  },
  {
    start: "thirunelvelli",
    end: "kanyakumari",
    distance: 85,
  },
  {
    start: "trichy",
    end: "karur",
    distance: 83,
  },
];
const routes = [
 
  {
    start: "chennai",
    end: "trichy",
    stops: ["chennai", "villupuram", "trichy"],
  },
      {
    start: "villupuram",
    end: "chennai",
    stops: ["villupuram", "chennai"],
  },
  {
    start: "chennai",
    end: "karur",
    stops: ["chennai", "villupuram", "trichy", "karur"],
  },
  {
    start: "trichy",
    end: "thirunelvelli",
    stops: ["trichy", "madurai", "thirunelvelli"],
  },
];

const findTotalDistance = (route) => {
  return route.stops.reduce((acc, stop, i) => {
    if (i < route.stops.length - 1) {
      const updatedDistance = distances.find((distance) =>
          (distance.start === stop && distance.end === route.stops[i + 1]) ||
          (distance.start === route.stops[i + 1] && distance.end === stop)
      );
      if (updatedDistance) {
        acc += updatedDistance.distance;
      }
    }
    return acc;
  }, 0);
};

const totalDistance = () => {
  return routes.map((route) => {
     const getDistance = findTotalDistance(route);
        return{
            ...route,
            totalDistance : getDistance
        }
    })
}

const main = () => {
  console.log(totalDistance());
}
main();