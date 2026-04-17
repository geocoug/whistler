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
    embedUrl: "https://player.brownrice.com?sn=whistlerroundhouse&em=1",
    kind: "brownrice",
  },
  {
    id: "snowstack",
    name: "Snow Stack",
    location: "Whistler Mountain",
    embedUrl: "https://player.brownrice.com?sn=whistlersnowstack&em=2",
    kind: "brownrice",
  },
  {
    id: "creekside",
    name: "Creekside",
    location: "Whistler Base",
    elevationM: 670,
    embedUrl: "https://player.brownrice.com?sn=whistlercreekside&em=3",
    kind: "brownrice",
  },
  {
    id: "fitzsimmons",
    name: "Village Fitzsimmons",
    location: "Whistler Village",
    embedUrl: "https://player.brownrice.com?sn=whistlervillagefitz&em=4",
    kind: "brownrice",
  },
  {
    id: "village",
    name: "Whistler Village",
    location: "Whistler Village",
    embedUrl: "https://player.brownrice.com?sn=whistlervillage&em=5",
    kind: "brownrice",
  },
  {
    id: "glacier",
    name: "Horstman Glacier",
    location: "Blackcomb",
    elevationM: 2284,
    embedUrl: "https://player.brownrice.com?sn=whistlerglacier&em=6",
    kind: "brownrice",
  },
  {
    id: "peak",
    name: "Whistler Peak",
    location: "Whistler Mountain",
    elevationM: 2182,
    embedUrl: "https://player.brownrice.com?sn=whistlerpeak&em=7",
    kind: "brownrice",
  },
  {
    id: "blackcomb",
    name: "Blackcomb",
    location: "Blackcomb Base",
    embedUrl: "https://player.brownrice.com?sn=whistlerblackcomb&em=8",
    kind: "brownrice",
  },
  {
    id: "7thheaven",
    name: "7th Heaven",
    location: "Blackcomb",
    elevationM: 2180,
    embedUrl: "https://player.brownrice.com?sn=whistler7thheaven&em=9",
    kind: "brownrice",
  },
];
