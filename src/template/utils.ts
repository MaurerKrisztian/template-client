export class Utils {
    static removeSlashes(value: string) {
        return value.replace(/\/+$/, '');
    }
}
