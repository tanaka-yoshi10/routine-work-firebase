import { DocumentReference } from "firebase/firestore";

export interface IRoutine {
  id: string;
  ref: DocumentReference | null;
  menus: string[];
};

export class Routine implements IRoutine {
  id: string = '';
  ref: DocumentReference | null = null;
  menus = [];

  constructor({
    id = '',
    ref = null,
    menus = [],
  }: Partial<IRoutine>) {
    Object.assign(this, {
      id,
      ref,
      menus,
    });
  }
}
