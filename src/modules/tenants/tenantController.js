export const validTenant = async (req, res, next) => {
  try {
    const tenantInfo = Object.fromEntries(
      Object.entries(req.body).filter(([key, value]) => value)
    );

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
      "_id tenantName tenantEmail tenantPhoneNumber"
    );

    if (preExistingTenant) {
      console.log(preExistingTenant);
      let message = `${preExistingTenant.tenantName} has similar details.`;
      if (preExistingTenant.tenantPhoneNumber === tenantInfo.tenantPhoneNumber)
        message = `${preExistingTenant.tenantName} in this group has similar phone number`;

      if (
        preExistingTenant.tenantBackupPhoneNumber ===
        tenantInfo.tenantPhoneNumber
      )
        message = `${preExistingTenant.tenantName} in this group has same backup phone number as this one's main number`;

      if (preExistingTenant.tenantEmail === tenantInfo.tenantEmail)
        message = `${preExistingTenant.tenantName} in this group has same email ID`;

      throw new Error(message);
    }

    await req.db.tenants.create(tenantInfo);

    return res.status(200).json({
      success: true,
      message: "tenant created successfully",
    });
  } catch (error) {
    next(error);
  }
};
