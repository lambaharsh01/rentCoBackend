// modelsMiddleware.js
import users from "../database/model/users.js";
import groups from "../database/model/groups.js";
import tenants from "../database/model/tenants.js";
import transactions from "../database/model/transactions.js";
import monthlyConsolidations from "../database/model/monthlyConsolidations.js";
import mongoose from "mongoose";

export default function requestParameters(req, res, next) {
  req.db = {
    users,
    groups,
    tenants,
    transactions,
    monthlyConsolidations,
  };

  req.dataTypes = {
    objectId: mongoose.Types.ObjectId,
  };

  next();
}
