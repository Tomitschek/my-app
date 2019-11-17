import {Patient} from './patient.model';

export class PatientService {
  private availablePatines: Patient[] = [
    {id: 1, name: 'Rosentreter',
      vorname: 'Hans-Peter',
      geburtsdatum: new Date('1972-12-12'),
      geschlecht: 'm',
      opDatum: new Date('2019-11-11'),
      operation: 'ASK-Schulter',
      verfahren: ['ISK'],
      station: 'OUC-S4',
      isolation: false
    },
    {id: 2, name: 'von Katzenellenbogen',
      vorname: 'Johanna',
      geburtsdatum: new Date('1973-12-12'),
      geschlecht: 'w',
      opDatum: new Date('2019-10-10'),
      operation: 'OSG Fraktur',
      verfahren: ['DIK', 'SNB'],
      station: 'OUC-S2',
      isolation: true
    }
  ];

  getAvailablePatients() {
    return this.availablePatines.slice();
  }

}
