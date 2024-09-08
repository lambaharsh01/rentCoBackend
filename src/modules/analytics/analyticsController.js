export const getConsolidatedReport = async (req, res, next) => {
  try {
    let { fromDate, toDate, tenantId } = req.query;

    if (!tenantId) throw new Error("Invalid Parameters");

    let queryObject = {
      userEmail: req.user.userEmail,
      tenantId: new req.dataTypes.objectId(tenantId),
    };

    if (fromDate || toDate) {
      let visitDate = {};
      if (fromDate) visitDate.$gte = new Date(fromDate);
      if (toDate) visitDate.$lte = new Date(toDate);

      queryObject = { ...queryObject, visitDate };
    }

    const filteredVisits = await req.db.visits
      .aggregate([
        { $match: queryObject },
        {
          $project: {
            propertyName: 1,

            totalRent: 1,
            currentMonthTotalRent: 1,

            rentAmount: 1,
            previouslyPendingAmount: 1,
            electricityBill: 1,

            previousReading: 1,
            currentReading: 1,
            totalUnits: 1,
            electricityAmountPerUnit: 1,

            visitDate: 1,
            dateFormat: {
              $dateToString: {
                format: "%d-%m-%Y",
                date: "$visitDate",
              },
            },
          },
        },
      ])
      .sort({ visitDate: 1 });

    if (queryObject.visitDate) {
      let transactionDate = {};
      if (fromDate) transactionDate.$gte = new Date(fromDate);
      if (toDate) transactionDate.$lte = new Date(toDate);

      queryObject = { ...queryObject, transactionDate };

      delete queryObject.visitDate;
    }

    const filteredTransactions = await req.db.transactions
      .aggregate([
        { $match: queryObject },
        {
          $project: {
            recivedAmount: 1,
            transactionDate: 1,
            dateFormat: {
              $dateToString: {
                format: "%d-%m-%Y",
                date: "$transactionDate",
              },
            },
          },
        },
      ])
      .sort({ transactionDate: 1 });

    const consolidatedReport = combinedVisitTransactions(
      filteredVisits,
      filteredTransactions
    );

    return res.status(200).json({
      success: true,
      message: "Consolidated Report fetched successfully",
      data: { consolidatedReport },
    });
  } catch (error) {
    next(error);
  }

  function combinedVisitTransactions(array1, array2) {
    // array1 to be visit array , array2 to be transation array;

    for (let visit of array1) {
      visit.date = visit.visitDate;
      visit.value = visit.totalRent;
      visit.src = "visit";
    }

    for (let transaction of array2) {
      transaction.date = transaction.transactionDate;
      transaction.value = -transaction.recivedAmount;
      transaction.src = "transaction";
    }

    let leftIndex = 0;
    let rightIndex = 0;

    let sortedArray = [];

    while (leftIndex < array1.length && rightIndex < array2.length) {
      if (array1[leftIndex].date <= array2[rightIndex].date) {
        sortedArray.push(array1[leftIndex]);
        leftIndex++;
      } else {
        sortedArray.push(array2[rightIndex]);
        rightIndex++;
      }
    }

    return [
      ...sortedArray,
      ...array1.slice(leftIndex),
      ...array2.slice(rightIndex),
    ];
  }
};
