import "../shared/env.js";
import { startServer } from "../shared/server.js";
import * as adminAuth from "./adminAuth.js";
import * as admins from "./admins.js";
import * as catalog from "./catalog.js";
import * as dashboard from "./dashboard.js";
import * as fleetApi from "./fleetApi.js";
import * as imageUploads from "./imageUploads.js";
import * as records from "./records.js";

startServer({
  name: "admin-backend",
  port: Number(process.env.ADMIN_BACKEND_PORT || 4001),
  host: process.env.BACKEND_HOST || "127.0.0.1",
  routes: [
    ["/api/admin/auth", adminAuth],
    ["/api/admin/admins", admins],
    ["/api/admin/catalog", catalog],
    ["/api/admin/dashboard", dashboard],
    ["/api/admin/fleets", { GET: fleetApi.GET, POST: fleetApi.POST }],
    ["/api/admin/fleets/:id", { GET: fleetApi.GET, PATCH: fleetApi.PATCH }],
    ["/api/admin/records/:kind", records],
    ["/api/admin/uploads", imageUploads],
  ],
});
