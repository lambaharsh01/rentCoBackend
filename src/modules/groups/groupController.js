export const createGroup = async (req, res, next) => {
  try {
    let { groupName, groupDiscription } = req.body;

    groupName = groupName.trim();
    let { userEmail } = req.user;

    let existingGroup = await req.db.groups.findOne(
      { userEmail, groupName },
      "_id"
    );

    if (existingGroup)
      throw new Error("Another group exists with the same name");

    await req.db.groups.create({ groupName, groupDiscription, userEmail });

    return res.status(200).json({
      success: true,
      message: "group created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllGroups = async (req, res, next) => {
  try {
    let { userEmail } = req.user;

    let groups = await req.db.groups.aggregate([
      { $match: { userEmail } },
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
      { $match: { _id: new req.dataTypes.objectId(groupId) } },
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
          _id: 1,
          groupName: 1,
          groupDiscription: 1,
          createdAt: {
            $dateToString: {
              format: "%d-%m-%Y",
              date: "$createdAt",
            },
          },
          tenants: 1,
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
