type DataModel<T> = Pick<T, Exclude<keyof T, 'dtime'>>;

export const FilterData = {
    One<T>(obj : T) : T {
        return "dtime" in obj ? null : obj;
    },
    Many<T>(array: T[]) : DataModel<T>[] {
        const data = array.filter(el => !el.hasOwnProperty("dtime"))
        return data;
    }
}