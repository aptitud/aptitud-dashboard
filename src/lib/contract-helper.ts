type ContractDates = {
  startDate: Date;
  endDate: Date;
};

export const isContractInPeriod = (contract: ContractDates, periodStart: Date, periodEnd: Date) => {
  return (
    (contract.startDate <= periodStart && contract.endDate >= periodStart) ||
    (contract.startDate >= periodStart && contract.startDate <= periodEnd)
  );
};
