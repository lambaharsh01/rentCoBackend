import { addTransactionSchema } from "../../utils/validtionSchemas.js";

export const addTransaction = async (req, res, next) => {
  try {
    if (!addTransactionSchema(req.body)) throw new Error("Validation Failed!");

    let transactionObject = { ...req.body, userEmail: req.user.userEmail };

    await req.db.transactions.create(transactionObject);

    return res.status(200).json({
      success: true,
      message: `Transaction created for ${
        transactionObject.tenantName
      } on ${transactionObject.transactionDate.split("-").reverse().join("-")}`,
    });
  } catch (error) {
    next(error);
  }
};

export const getTransactions = async (req, res, next) => {
  try {
    let { fromDate, toDate, tenantId } = req.query;

    let queryObject = { userEmail: req.user.userEmail };

    if (fromDate || toDate) {
      let transactionDate = {};
      if (fromDate) transactionDate.$gte = new Date(fromDate);
      if (toDate) transactionDate.$lte = new Date(toDate);

      queryObject = { ...queryObject, transactionDate };
    }

    if (tenantId) {
      queryObject = {
        ...queryObject,
        tenantId: new req.dataTypes.objectId(tenantId),
      };
    }

    let filteredTransactions = await req.db.transactions
      .find(queryObject, {
        tenantName: 1,
        propertyName: 1,
        tenantPhoneNumber: 1,
        paymentMethod: 1,
        recivedAmount: 1,
        paymentType: 1,
        transactionDate: {
          $dateToString: {
            format: "%d-%m-%Y",
            date: "$transactionDate",
          },
        },
      })
      .sort({ transactionDate: "asc" });

    console.log(filteredTransactions);

    return res.status(200).json({
      success: true,
      message: "Transactions fetched successfully",
      data: { filteredTransactions },
    });
  } catch (error) {
    next(error);
  }
};
