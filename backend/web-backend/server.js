import "../shared/env.js";
import { startServer } from "../shared/server.js";
import * as auth from "./auth.js";
import * as bookings from "./bookings.js";
import * as destinations from "./destinations.js";
import * as fleets from "./fleets.js";
import * as fleetDetail from "./fleetDetail.js";
import * as inquiries from "./inquiries.js";
import * as services from "./services.js";
import * as uploads from "./uploads.js";

startServer({
  name: "web-backend",
  port: Number(process.env.WEB_BACKEND_PORT || 4000),
  host: process.env.BACKEND_HOST || "127.0.0.1",
  routes: [
    ["/api/auth", auth],
    ["/api/bookings", bookings],
    ["/api/destinations", destinations],
    ["/api/fleets", fleets],
    ["/api/fleets/:slug", fleetDetail],
    ["/api/inquiries", inquiries],
    ["/api/services", services],
    ["/api/uploads/:filename", uploads],
  ],
});
