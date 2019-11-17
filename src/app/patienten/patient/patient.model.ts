export interface Patient {
  id: number;
  name: string;
  vorname: string;
  geburtsdatum: Date;
  geschlecht: 'm' | 'w' | 'u';
  opDatum?: Date;
  operation?: string;
  verfahren?: Array<string>;
  station?: string;
  abteilung?: string;
  isolation: boolean;
  state?: 'aktiv' | 'abgeschlossen' | null;
}
