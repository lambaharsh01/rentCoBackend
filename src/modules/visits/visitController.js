import { addVisitSchema } from "../../utils/validtionSchemas.js";

export const addVisit = async (req, res, next) => {
  try {
    if (!addVisitSchema(req.body)) throw new Error("Validation Failed!");

    let visitObject = { ...req.body, userEmail: req.user.userEmail };

    let confirmation = visitObject.confirmation;

    let existingVisitEntery = await req.db.visits.findOne(
      {
        tenantId: new req.dataTypes.objectId(visitObject.tenantId),
        visitDate: new Date(visitObject.visitDate),
      },
      { _id: 1 }
    );

    if (!confirmation && existingVisitEntery) {
      return res.status(200).json({
        success: false,
        message: `Entery already exists for ${
          visitObject.tenantName
        } on ${visitObject.visitDate
          .split("-")
          .reverse()
          .join("-")} would you like to replace it?`,
      });
    }

    if (visitObject.confirmation) {
      let deleted = await req.db.visits.deleteOne({
        tenantId: new req.dataTypes.objectId(visitObject.tenantId),
        visitDate: new Date(visitObject.visitDate),
      });

      console.log(deleted);

      delete visitObject.confirmation;
    }

    await req.db.visits.create(visitObject);

    return res.status(200).json({
      success: true,
      message: `Visit entery created for ${
        visitObject.tenantName
      } on ${visitObject.visitDate.split("-").reverse().join("-")}`,
    });
  } catch (error) {
    next(error);
  }
};

export const getPendingVisits = async (req, res, next) => {
  try {
    console.log(req.query);

    return res.status(200).json({
      success: true,
      message: "group created successfully",
    });
  } catch (error) {
    next(error);
  }
};
