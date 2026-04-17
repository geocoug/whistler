export type WsdotCam = {
  id: string;
  cameraId: number; // WSDOT CameraID
  fallbackTitle: string;
  imageUrl: string; // Direct image URL (avoids CORS issues with API)
};

export type DriveBcCam = {
  id: string;
  name: string;
  // DriveBC camera image id; image at https://images.drivebc.ca/bchighwaycam/pub/cameras/<id>.jpg
  imageId: number;
};

export const wsdotBorderCams: WsdotCam[] = [
  { id: "peace", cameraId: 1057, fallbackTitle: "I-5 at Peace Arch", imageUrl: "https://images.wsdot.wa.gov/nw/005vc27650.jpg" },
  { id: "aldergrove", cameraId: 1209, fallbackTitle: "SR-539 at Canadian Border", imageUrl: "https://images.wsdot.wa.gov/nw/539vc01510.jpg" },
  { id: "sumas", cameraId: 9445, fallbackTitle: "SR-9 at Johnson Creek", imageUrl: "https://images.wsdot.wa.gov/nw/009vc09781.jpg" },
];

export const driveBcBorderCams: DriveBcCam[] = [
  { id: "peace-north", name: "Peace Arch, Looking North", imageId: 13 },
  { id: "sumas-south", name: "Sumas, Looking South", imageId: 170 },
  { id: "aldergrove-south", name: "Aldergrove, Looking South", imageId: 169 },
];

// Sea-to-Sky Highway 99 (Vancouver → Whistler) DriveBC cams, in travel order.
export const driveBcSeaToSkyCams: DriveBcCam[] = [
  { id: "horseshoe-bay", name: "Hwy 99 at Horseshoe Bay", imageId: 129 },
  { id: "lions-bay", name: "Hwy 99 at Lions Bay", imageId: 130 },
  { id: "porteau-cove", name: "Hwy 99 at Porteau Cove", imageId: 180 },
  { id: "squamish", name: "Hwy 99 at Squamish", imageId: 131 },
  { id: "tantalus", name: "Hwy 99 Tantalus Lookout", imageId: 527 },
  { id: "daisy-lake", name: "Hwy 99 at Daisy Lake", imageId: 133 },
  { id: "whistler-creekside", name: "Hwy 99 Whistler Creekside", imageId: 134 },
  { id: "whistler-village", name: "Hwy 99 Whistler Village", imageId: 135 },
];

// WSDOT border-crossings API config (key is intentionally client-side per project decision).
// NOTE: This key is public via the GitHub repo and should be treated as exposed.
export const WSDOT_KEY = "fda8d3db-cd7c-425c-b927-9bb64df47309";
export const WSDOT_CAM_URL = (id: number, key: string) =>
  `https://wsdot.wa.gov/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCameraAsJson?AccessCode=${key}&CameraID=${id}`;
export const WSDOT_BORDER_URL = (key: string) =>
  `https://wsdot.wa.gov/Traffic/api/BorderCrossings/BorderCrossingsREST.svc/GetBorderCrossingsAsJson?AccessCode=${key}`;
