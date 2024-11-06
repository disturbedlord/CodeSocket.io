import { io } from "socket.io-client";
import { BACKENDURL } from "../components/Common/Constants";
// "undefined" means the URL will be computed from the `window.location` object
const URL = BACKENDURL;

export const socket = io(URL);
