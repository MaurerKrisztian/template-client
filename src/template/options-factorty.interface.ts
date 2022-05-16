export interface OptionsFactory<T> {
    createOptions(): Promise<T> | T;
}
