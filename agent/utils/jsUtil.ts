export namespace JSUtil {
    function hexStringTobytes(hex: string) {
        let bytes: number[] = []
        for (var c = 0; c < hex.length; c += 2) {
            bytes.push(parseInt(hex.substring(c, 2), 16));
        }
        return bytes;
    }

    function hexStringToPtr(hex: string) {
        var bytes = hexStringTobytes(hex);
        let ptr = Il2Cpp.alloc(bytes.length);
        ptr.writeByteArray(bytes);
        return ptr;
    }
}