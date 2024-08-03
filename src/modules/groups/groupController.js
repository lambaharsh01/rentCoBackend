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
