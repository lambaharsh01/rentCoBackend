// modelsMiddleware.js
import users from "../database/model/users.js";
import groups from "../database/model/groups.js";
import members from "../database/model/members.js";
import transactions from "../database/model/transactions.js";
import monthlyConsolidations from "../database/model/monthlyConsolidations.js";

export default function requestParameters(req, res, next) {
  req.db = {
    users,
    groups,
    members,
    transactions,
    monthlyConsolidations,
  };

  next();
}
