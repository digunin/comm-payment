import { SerializedState } from "../store/app-storage";
import { MeterReadings, Months, PaymentsState } from "../store/payment/types";
import { Price } from "../store/price/priceReducer";

export const zeroReadings: MeterReadings = {
  cold: {
    totalValue: 0,
    monthValue: 0,
  },
  hot: {
    totalValue: 0,
    monthValue: 0,
  },
  electricity: {
    totalValue: 0,
    monthValue: 0,
  },
  waterWaste: {
    totalValue: 0,
    monthValue: 0,
  },
};

export const price: Price = {
  cold: 2404,
  hot: 16793,
  electricity: 505,
  waterWaste: 5220,
};

export const testTotalReport: PaymentsState = {
  startReadings: {
    cold: { monthValue: 0, totalValue: 101 },
    hot: { monthValue: 0, totalValue: 102 },
    electricity: { monthValue: 0, totalValue: 103 },
    waterWaste: { monthValue: 0, totalValue: 104 },
  },
  selected: { selectedYear: null, selectedMonth: null },
  2014: {
    [Months.apr]: {
      selected: -1,
      showAllPayments: false,
      previousPayments: [],
      lastPayment: {
        date: 0,
        meterReadings: {
          cold: { monthValue: 140400, totalValue: 140400 },
          hot: { monthValue: 140401, totalValue: 140401 },
          electricity: { monthValue: 140402, totalValue: 140402 },
          waterWaste: { monthValue: 0, totalValue: 0 },
        },
        payAmount: {
          cold: 0,
          hot: 0,
          electricity: 0,
          waterWaste: 0,
          total: 0,
        },
        price,
      },
    },
    [Months.jul]: {
      selected: -1,
      showAllPayments: false,
      previousPayments: [],
      lastPayment: {
        date: 0,
        meterReadings: {
          cold: { monthValue: 140700, totalValue: 140700 },
          hot: { monthValue: 140701, totalValue: 140701 },
          electricity: { monthValue: 140702, totalValue: 140702 },
          waterWaste: { monthValue: 0, totalValue: 0 },
        },
        payAmount: {
          cold: 0,
          hot: 0,
          electricity: 0,
          waterWaste: 0,
          total: 0,
        },
        price,
      },
    },
    [Months.nov]: {
      selected: -1,
      showAllPayments: false,
      previousPayments: [],
      lastPayment: {
        date: 0,
        meterReadings: {
          cold: { monthValue: 141100, totalValue: 141100 },
          hot: { monthValue: 141101, totalValue: 141101 },
          electricity: { monthValue: 141102, totalValue: 141102 },
          waterWaste: { monthValue: 0, totalValue: 0 },
        },
        payAmount: {
          cold: 0,
          hot: 0,
          electricity: 0,
          waterWaste: 0,
          total: 0,
        },
        price,
      },
    },
    [Months.dec]: {
      selected: -1,
      showAllPayments: false,
      previousPayments: [],
      lastPayment: {
        date: 0,
        meterReadings: {
          cold: { monthValue: 141200, totalValue: 141200 },
          hot: { monthValue: 141201, totalValue: 141201 },
          electricity: { monthValue: 141202, totalValue: 141202 },
          waterWaste: { monthValue: 0, totalValue: 0 },
        },
        payAmount: {
          cold: 0,
          hot: 0,
          electricity: 0,
          waterWaste: 0,
          total: 0,
        },
        price,
      },
    },
  },
  2016: {
    [Months.jan]: {
      selected: -1,
      showAllPayments: false,
      previousPayments: [],
      lastPayment: {
        date: 0,
        meterReadings: {
          cold: { monthValue: 160100, totalValue: 160100 },
          hot: { monthValue: 160101, totalValue: 160101 },
          electricity: { monthValue: 160102, totalValue: 160102 },
          waterWaste: { monthValue: 0, totalValue: 0 },
        },
        payAmount: {
          cold: 0,
          hot: 0,
          electricity: 0,
          waterWaste: 0,
          total: 0,
        },
        price,
      },
    },
    [Months.may]: {
      selected: -1,
      showAllPayments: false,
      previousPayments: [],
      lastPayment: {
        date: 0,
        meterReadings: {
          cold: { monthValue: 160500, totalValue: 160500 },
          hot: { monthValue: 160501, totalValue: 160501 },
          electricity: { monthValue: 160502, totalValue: 160502 },
          waterWaste: { monthValue: 0, totalValue: 0 },
        },
        payAmount: {
          cold: 0,
          hot: 0,
          electricity: 0,
          waterWaste: 0,
          total: 0,
        },
        price,
      },
    },
    [Months.aug]: {
      selected: -1,
      showAllPayments: false,
      previousPayments: [],
      lastPayment: {
        date: 0,
        meterReadings: {
          cold: { monthValue: 160800, totalValue: 160800 },
          hot: { monthValue: 160801, totalValue: 160801 },
          electricity: { monthValue: 160802, totalValue: 160802 },
          waterWaste: { monthValue: 0, totalValue: 0 },
        },
        payAmount: {
          cold: 0,
          hot: 0,
          electricity: 0,
          waterWaste: 0,
          total: 0,
        },
        price,
      },
    },
    [Months.sep]: {
      selected: -1,
      showAllPayments: false,
      previousPayments: [],
      lastPayment: {
        date: 0,
        meterReadings: {
          cold: { monthValue: 160900, totalValue: 160900 },
          hot: { monthValue: 160901, totalValue: 160901 },
          electricity: { monthValue: 160902, totalValue: 0 },
          waterWaste: { monthValue: 0, totalValue: 0 },
        },
        payAmount: {
          cold: 0,
          hot: 0,
          electricity: 0,
          waterWaste: 0,
          total: 0,
        },
        price,
      },
    },
  },
  2021: {
    [Months.may]: {
      selected: -1,
      showAllPayments: false,
      previousPayments: [],
      lastPayment: {
        date: 0,
        meterReadings: {
          cold: { monthValue: 210500, totalValue: 210500 },
          hot: { monthValue: 210501, totalValue: 210501 },
          electricity: { monthValue: 210502, totalValue: 210502 },
          waterWaste: { monthValue: 0, totalValue: 0 },
        },
        payAmount: {
          cold: 0,
          hot: 0,
          electricity: 0,
          waterWaste: 0,
          total: 0,
        },
        price,
      },
    },
    [Months.jun]: {
      selected: -1,
      showAllPayments: false,
      previousPayments: [],
      lastPayment: {
        date: 0,
        meterReadings: {
          cold: { monthValue: 210600, totalValue: 210600 },
          hot: { monthValue: 210601, totalValue: 210601 },
          electricity: { monthValue: 210602, totalValue: 210602 },
          waterWaste: { monthValue: 0, totalValue: 0 },
        },
        payAmount: {
          cold: 0,
          hot: 0,
          electricity: 0,
          waterWaste: 0,
          total: 0,
        },
        price,
      },
    },
    [Months.aug]: {
      selected: -1,
      showAllPayments: false,
      previousPayments: [],
      lastPayment: {
        date: 0,
        meterReadings: {
          cold: { monthValue: 210800, totalValue: 210800 },
          hot: { monthValue: 210801, totalValue: 210801 },
          electricity: { monthValue: 210802, totalValue: 210802 },
          waterWaste: { monthValue: 0, totalValue: 0 },
        },
        payAmount: {
          cold: 0,
          hot: 0,
          electricity: 0,
          waterWaste: 0,
          total: 0,
        },
        price,
      },
    },
    [Months.oct]: {
      selected: -1,
      showAllPayments: false,
      previousPayments: [],
      lastPayment: {
        date: 0,
        meterReadings: {
          cold: { monthValue: 211000, totalValue: 211000 },
          hot: { monthValue: 211001, totalValue: 211001 },
          electricity: { monthValue: 211002, totalValue: 211002 },
          waterWaste: { monthValue: 0, totalValue: 422001 },
        },
        payAmount: {
          cold: 0,
          hot: 0,
          electricity: 0,
          waterWaste: 0,
          total: 0,
        },
        price,
      },
    },
  },
};

export const testState: SerializedState = {
  paymentState: testTotalReport,
  priceState: {
    actualPrice: price,
    oldPrices: [],
  },
};

export const pathNames = {
  home: "/",
  create: "/add-new-record",
  edit: "/edit-record",
  addInitial: "/add-initial-readings",
};
