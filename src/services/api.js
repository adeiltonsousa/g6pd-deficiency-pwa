// Data
import medicinesNotAllowedData from '../data/medicinesNotAllowedData';
import medicinesAllowedData from '../data/medicinesAllowedData';

const TIME = 2000;

export const getMedicinesNotAllowed = async () => {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(medicinesNotAllowedData);
    }, TIME)
  );
};

export const getMedicinesAllowed = async () => {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(medicinesAllowedData);
    }, TIME)
  );
};
