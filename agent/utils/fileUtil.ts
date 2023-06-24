export namespace FileUtil {
    export function readFile(path: string): Il2Cpp.String {
        return Il2Cpp.Image.corlib.class('System.IO.File').method<Il2Cpp.String>('ReadAllText').overload('System.String').invoke(Il2Cpp.String.from(path));
    }

    export function writeFile(path: string, text: string) {
        return Il2Cpp.Image.corlib.class('System.IO.File').method<Il2Cpp.String>('WriteAllText').overload('System.String', 'System.String').invoke(Il2Cpp.String.from(path), Il2Cpp.String.from(text));
    }

    export function isFileExists(path: string): boolean {
        return Il2Cpp.Image.corlib.class('System.IO.File').method<boolean>('Exists').invoke(Il2Cpp.String.from(path));
    }
}