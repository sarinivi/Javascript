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

const getDistance = (start, end) => {  
    return distances.find(distance => (distance.start === start && distance.end === end) || 
    (distance.start === end && distance.end === start)).distance || 0 ;
}

const findTotalDistance = (route) => {
  return route.stops.reduce((total, currentStop, index, stops) => 
    index === stops.length - 1 
      ? total 
      : total + getDistance(currentStop, stops[index + 1])
  , 0);
}


const updatedDistance = () => routes.map(route => ({ ...route, totalDistance: findTotalDistance(route) }));


const main = () => {
  console.log(updatedDistance());
};
main();