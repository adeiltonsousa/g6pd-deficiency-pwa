import medicinesNotAllowed from '../data/medicinesNotAllowed';
import medicinesAllowed from '../data/medicinesAllowed';

const TIME = 2000;

export const getMedicinesNotAllowed = async () => {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(medicinesNotAllowed);
    }, TIME)
  );
};

export const getMedicinesAllowed = async () => {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(medicinesAllowed);
    }, TIME)
  );
};
