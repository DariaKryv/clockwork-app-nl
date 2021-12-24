import { Suspense } from "react";
import CloudDrizzle from "./Cloud-Drizzle.svg";
import CloudFog from "./Cloud-Fog.svg";
import CloudSun from "./Cloud-Sun.svg";
import CloudHail from "./Cloud-Hail.svg";
import CloudSnow from "./Cloud-Snow-Alt.svg";
import Cloud from "./Cloud.svg";
import Sun from "./Sun.svg";
import Wind from "./Wind.svg";

export default {
  1000: Sun,
  1001: CloudSun,
  1100: CloudSun,
  1101: CloudSun,
  1102: Cloud,
  2000: CloudFog,
  2100: CloudFog,
  3000: Wind,
  3001: Wind,
  3002: Wind,
  4000: CloudDrizzle,
  4001: CloudDrizzle,
  4200: CloudDrizzle,
  4201: CloudHail,
  5000: CloudSnow,
  5001: CloudSnow,
  5100: CloudSnow,
  5101: CloudSnow,
  6000: CloudSnow,
  6001: CloudSnow,
  6200: CloudSnow,
  6201: CloudSnow,
  7000: CloudSnow,
  7101: CloudSnow,
  7102: CloudSnow,
  8000: CloudHail,
};
