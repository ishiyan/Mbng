export class Enums {
  static compare(e1: any, e2: any): boolean {
    const s1 = e1.toString().toLowerCase();
    const s2 = e2.toString().toLowerCase();
    return s1 === s2;
  }
}
