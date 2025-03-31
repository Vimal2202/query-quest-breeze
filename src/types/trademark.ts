
export interface Trademark {
  id: string;
  name: string;
  owner: string;
  registrationNumber: string;
  registrationDate: string;
  status: 'live' | 'dead';
  statusDate: string;
  description: string;
  class: string;
  logo?: string;
}
