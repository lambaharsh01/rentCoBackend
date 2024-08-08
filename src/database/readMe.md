FILTERATION AND MAPING IN MONGO DB


export const getAllGroups = async (req, res, next) => {
  try {
    let { userEmail } = req.user;

    let groups = await req.db.groups.aggregate([
      { $match: { userEmail, active: true } },
      {
        $lookup: {
          from: "tenants", // which connlection to connect from groups collection
          localField: "_id", //Specifies the field from the groups collection to match.
          foreignField: "groupId", //Specifies the field from the tenants collection to match against localField
          as: "tenants",
        },
      },
      {
        $project: {
          // kinda group by but better
          _id: 1,
          groupName: 1,
          createdAt: {
            $dateToString: {
              format: "%d-%m-%Y",
              date: "$createdAt",
            },
          },
          tenants: {
            //apply function on tenants
            $filter: {
              input: "$tenants", //filters tenants array
              as: "tenant", //alias for filterations
              cond: { $eq: ["$$tenant.active", true] }, //confition applied
            },
          },
          tenantCount: { $size: "$tenants" },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "group created successfully",
      data: { groups },
    });
  } catch (error) {
    next(error);
  }
};

export const getGroupInfo = async (req, res, next) => {
  try {
    let { groupId } = req.query;

    let groupInfo = await req.db.groups.aggregate([
      { $match: { _id: new req.dataTypes.objectId(groupId), active: true } },
      {
        $lookup: {
          from: "tenants",
          localField: "_id",
          foreignField: "groupId",
          as: "tenants",
        },
      },
      {
        $project: {
          _id: 1,
          groupName: 1,
          groupDiscription: 1,
          createdAt: {
            $dateToString: {
              format: "%d-%m-%Y",
              date: "$createdAt",
            },
          },
          // filteration could be done in a map phele input me filtration krr doo vo map tk jayga he refine hoo k
          tenants: {
            $map: {
              input: {
                $filter: {
                  input: "$tenants",
                  as: "tenant",
                  cond: { $eq: ["$$tenant.active", true] },
                },
              },
              //  "$tenants", //maps through tenants array
              as: "tenant", // alias for mapping
              in: {
                //gets the attributes metiones in in rejects the rest
                tenantName: "$$tenant.tenantName",
                tenantPhoneNumber: "$$tenant.tenantPhoneNumber",
                rentAmount: "$$tenant.rentAmount",
                tenantPicture: "$$tenant.tenantPicture",
              },
            },
          },
          tenantCount: { $size: "$tenants" },
        },
      },
    ]);

    if (!groupInfo.length) throw new Error("No Group Found");

    return res.status(200).json({
      success: true,
      message: "group created successfully",
      data: { groupInfo: groupInfo[0] },
    });
  } catch (error) {
    next(error);
  }
};