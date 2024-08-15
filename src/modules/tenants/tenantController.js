export const addTenant = async (req, res, next) => {
  try {
    let tenantInfo = req.body;

    tenantInfo.createdBy = req.user.userEmail;

    let preExistingTenantQuery = {
      groupId: new req.dataTypes.objectId(tenantInfo.groupId),
      tenancyType: tenantInfo.tenancyType,
      $or: [
        { tenantPhoneNumber: tenantInfo.tenantPhoneNumber },
        { tenantBackupPhoneNumber: tenantInfo.tenantPhoneNumber },
      ],
    };

    if (tenantInfo.tenantEmail) {
      preExistingTenantQuery.$or.push({ tenantEmail: tenantInfo.tenantEmail });
    }

    let preExistingTenant = await req.db.tenants.findOne(
      preExistingTenantQuery,
      "_id tenantName tenantEmail tenantPhoneNumber tenantBackupPhoneNumber"
    );

    if (preExistingTenant) {
      let message = `${preExistingTenant.tenantName} has similar details.`;
      if (preExistingTenant.tenantPhoneNumber === tenantInfo.tenantPhoneNumber)
        message = `${preExistingTenant.tenantName} in this group has similar phone number`;

      if (
        preExistingTenant.tenantBackupPhoneNumber ===
        tenantInfo.tenantPhoneNumber
      )
        message = `${preExistingTenant.tenantName} in this group has same backup phone number as current tenent's main number`;

      if (preExistingTenant.tenantEmail === tenantInfo.tenantEmail)
        message = `${preExistingTenant.tenantName} in this group has same email ID`;

      throw new Error(message);
    }

    // authentication completed creating user now

    const skipKeysThatCouldBeFalsy = [
      "electricityBillApplicable",
      "electricityAmount",
    ];

    tenantInfo = Object.fromEntries(
      Object.entries(req.body).filter(([key, value]) => {
        if (skipKeysThatCouldBeFalsy.includes(key)) {
          return true;
        }
        return Boolean(value);
      })
    );

    if (!tenantInfo.tenantPicture)
      tenantInfo.tenantPicture = "/dummyUserImage.png";

    await req.db.tenants.create(tenantInfo);

    return res.status(200).json({
      success: true,
      message: "tenant created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTenant = async (req, res, next) => {
  try {
    let { tenantId } = req.params;

    await req.db.tenants.findByIdAndUpdate(tenantId, {
      active: false,
      groupId: null,
    });

    return res.status(200).json({
      success: true,
      message: "Tenant is inactivated",
    });
  } catch (error) {
    next(error);
  }
};

export const getTenantInfo = async (req, res, next) => {
  try {
    let { tenantId } = req.query;

    let tenantInfo = await req.db.tenants.findById(tenantId);

    if (!tenantInfo) throw new Error("No Tenant Found");

    return res.status(200).json({
      success: true,
      message: "Tenant's Data fetched",
      data: { tenantInfo },
    });
  } catch (error) {
    next(error);
  }
};

export const editTenant = async (req, res, next) => {
  try {
    let tenantInfo = req.body;
    let { tenantId } = req.query;

    const skipKeysThatCouldBeFalsy = [
      "electricityBillApplicable",
      "electricityAmount",
    ];

    tenantInfo = Object.fromEntries(
      Object.entries(req.body).filter(([key, value]) => {
        if (skipKeysThatCouldBeFalsy.includes(key)) {
          return true;
        }
        return Boolean(value);
      })
    );

    await req.db.tenants.findByIdAndUpdate(tenantId, tenantInfo);

    return res.status(200).json({
      success: true,
      message: "tenant edited successfully",
    });
  } catch (error) {
    next(error);
  }
};
