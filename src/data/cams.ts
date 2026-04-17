export type MountainCam = {
  id: string;
  name: string;
  location: string;
  elevationM?: number;
  embedUrl: string;
  kind: "brownrice";
};

export const mountainCams: MountainCam[] = [
  {
    id: "roundhouse",
    name: "Roundhouse",
    location: "Whistler Mountain",
    elevationM: 1850,
    embedUrl: "https://player.brownrice.com/embed/whistlerroundhouse",
    kind: "brownrice",
  },
  {
    id: "creekside",
    name: "Creekside",
    location: "Whistler Base",
    elevationM: 670,
    embedUrl: "https://player.brownrice.com/embed/whistlercreekside",
    kind: "brownrice",
  },
  {
    id: "village",
    name: "Whistler Village",
    location: "Whistler Village",
    embedUrl: "https://player.brownrice.com/embed/whistlervillage",
    kind: "brownrice",
  },
  {
    id: "glacier",
    name: "Horstman Glacier",
    location: "Blackcomb",
    elevationM: 2284,
    embedUrl: "https://player.brownrice.com/embed/whistlerglacier",
    kind: "brownrice",
  },
  {
    id: "peak",
    name: "Whistler Peak",
    location: "Whistler Mountain",
    elevationM: 2182,
    embedUrl: "https://player.brownrice.com/embed/whistlerpeak",
    kind: "brownrice",
  },
  {
    id: "blackcomb",
    name: "Blackcomb",
    location: "Blackcomb Base",
    embedUrl: "https://player.brownrice.com/embed/whistlerblackcomb",
    kind: "brownrice",
  },
  {
    id: "7thheaven",
    name: "7th Heaven",
    location: "Blackcomb",
    elevationM: 2180,
    embedUrl: "https://player.brownrice.com/embed/whistler7thheaven",
    kind: "brownrice",
  },
];
