export const addVisit = async (req, res, next) => {
  try {
    console.log(req.body);

    //     {
    //   groupId: '66b4f82939da0ae17cae8b5b',
    //   tenantId: '66bda64fa7b7ca5756415182',
    //   tenantName: 'Harsh2',
    //   tenantPhoneNumber: '8287568558',
    //   propertyName: 'Room2',
    //   rentAmount: 2000,
    //   electricityAmountPerUnit: 0,
    //   previousReading: 'N/A',
    //   currentReading: 'N/A',
    //   totalUnits: 'N/A',
    //   electricityBill: 'N/A',
    //   previouslyPending: true,
    //   previouslyPendingAmount: 10000,
    //   damages: false,
    //   damagesExplained: '',
    //   remark: '',
    //   currentMonthTotalRent: 2000,
    //   totalRent: 12000
    // }

    return res.status(200).json({
      success: true,
      message: "vist saved successfully",
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
