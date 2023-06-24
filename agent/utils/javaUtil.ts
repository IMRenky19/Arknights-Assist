export namespace JavaUtil {
    /** 获得安装包签名*/
    export function getAppSignature(): string {
        let context: Java.Wrapper = Java.use('com.unity3d.player.UnityPlayer').currentActivity.value;
        let packageInfo: Java.Wrapper = context.getPackageManager().getPackageInfo(context.getPackageName(), Java.use('android.content.pm.PackageManager').GET_SIGNATURES.value);
        let sign: Java.Wrapper = packageInfo.signatures.value[0];
        let md5: Int8Array = Java.use('java.security.MessageDigest').getInstance('MD5').digest(sign.toByteArray());
        return Array.prototype.map
            .call(md5, (x: { toString: (arg0: number) => string; }) => ('00' + x.toString(16)).slice(-2))
            .join('');
    }
}