export class Base {
  setMap(values: { [index: string]: unknown }): this {
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        if (this.hasOwnProperty(key)) {
          Object.assign(this, { [key]: values[key] });
        }
      }
    }

    return this;
  }
}
