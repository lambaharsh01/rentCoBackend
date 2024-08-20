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
      .aggregate([
        { $match: queryObject },
        {
          $project: {
            tenantName: 1,
            propertyName: 1,
            recivedAmount: 1,
            transactionDate: {
              $dateToString: {
                format: "%d %b",
                date: "$transactionDate",
              },
            },
          },
        },
      ])
      .sort({ transactionDate: "asc" });

    return res.status(200).json({
      success: true,
      message: "Transactions fetched successfully",
      data: { filteredTransactions },
    });
  } catch (error) {
    next(error);
  }
};

export const getTransactionInfo = async (req, res, next) => {
  try {
    let { transactionId } = req.query;

    let transaction = await req.db.transactions.findById(transactionId);

    if (!transaction) throw new Error("Visit not found");
    return res.status(200).json({
      success: true,
      message: "Transaction fetched successfully",
      data: { transaction },
    });
  } catch (error) {
    next(error);
  }
};
