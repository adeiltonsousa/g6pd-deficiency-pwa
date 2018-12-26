import uuid from 'uuid';

export default [
  {
    id: uuid.v4(),
    activeSubstance: 'Acetanilida',
    category: 'Analgésico',
    commercialName: [],
    manufacturer: []
  },
  {
    id: uuid.v4(),
    activeSubstance: 'Acetilfenilhidrazina',
    category: 'Antimicrobiano',
    commercialName: [],
    manufacturer: []
  },
  {
    id: uuid.v4(),
    activeSubstance: 'Ácido Nalidíxico',
    category: 'Antibacteriano (quinolona)',
    commercialName: ['Ácido Nalidixico®', 'Naluril', 'Wintomylon'],
    manufacturer: ['Cibran', 'Cazi', 'Sanofi Winthrop']
  }
];
