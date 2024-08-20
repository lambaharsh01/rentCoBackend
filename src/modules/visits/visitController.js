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

export const getVisits = async (req, res, next) => {
  try {
    let { fromDate, toDate, tenantId } = req.query;

    let queryObject = { userEmail: req.user.userEmail };

    if (fromDate || toDate) {
      let visitDate = {};
      if (fromDate) visitDate.$gte = new Date(fromDate);
      if (toDate) visitDate.$lte = new Date(toDate);

      queryObject = { ...queryObject, visitDate };
    }

    if (tenantId) {
      queryObject = {
        ...queryObject,
        tenantId: new req.dataTypes.objectId(tenantId),
      };
    }

    let filteredVisits = await req.db.visits
      .aggregate([
        { $match: queryObject },
        {
          $project: {
            tenantPhoneNumber: 1,
            propertyName: 1,
            totalRent: 1,
            visitDate: {
              $dateToString: {
                format: "%d %b",
                date: "$visitDate",
              },
            },
          },
        },
      ])
      .sort({ visitDate: "asc" });

    return res.status(200).json({
      success: true,
      message: "Visits fetched successfully",
      data: { filteredVisits },
    });
  } catch (error) {
    next(error);
  }
};

export const getVisitInfo = async (req, res, next) => {
  try {
    let { visitId } = req.query;

    let visit = await req.db.visits.findById(visitId);

    if (!visit) throw new Error("Visit not found");

    return res.status(200).json({
      success: true,
      message: "Visit fetched successfully",
      data: { visit },
    });
  } catch (error) {
    next(error);
  }
};
