import { SETTING } from './../setting';
import { Logger } from './../utils/logger';

export namespace JavaHook {
    function biliGameSDKHook(): void {
        const reflectField = Java.use('java.lang.reflect.Field');
        // 取消sdk_ver请求头
        reflectField.isAnnotationPresent.implementation = function (klass: Java.Wrapper): boolean {
            if (klass.getName() == 'com.gsc.base.annotations.RequestParam' && this.getName() == 'sdk_ver') return false;
            return this.isAnnotationPresent(klass);
        }

        const requestModel = Java.use('com.http.lib.request.Request');
        // 跳过响应签名检验
        requestModel.a.overload('okhttp3.Response', 'w7').implementation = function (_response: Java.Wrapper, _w7: Java.Wrapper): boolean {
            return true;
        };
    }

    function tryCallingHook(funcs: Function[], rawNames: string[], from: string) {
        for (let index = 0; index < funcs.length; index++) {
            try {
                funcs[index]();
                Logger.logWell(`${rawNames[index]}() is done.`, from);
            } catch (error: any) {
                Logger.logError(`An error occurred while calling ${rawNames[index]}(): ` + error.toString(), from);
            }
        }
    }

    function ACESDKHook(): void {
        const MTPProxyApplication = Java.use('com.hg.sdk.MTPProxyApplication');
        MTPProxyApplication.onProxyCreate.implementation = () => { };
        const MTPDetection = Java.use('com.hg.sdk.MTPDetection');
        MTPDetection.onUserLogin.implementation = (_accountType: number, _worldId: number, _openId: string, _roleId: string) => { };
    }

    function biliTrackHook(): void {
        Java.use('com.base.trackingdata.Track').init.implementation = (_z: boolean, _application: Java.Wrapper, _str: string, _str2: string, _str3: string, _str4: string, _str5: string, _str6: string, _str7: string, _str8: string, _str9: string, _z2: boolean) => { }
    }

    function biliPaymentHook(): void {
        // 解决支付时缺少sdk_ver产生的错误
        Java.use('com.gsc.cashier_h5.mvp.b').a.overload('java.lang.String', 'com.gsc.base.model.OrderReqModel', 'com.gsc.base.model.UserInfoModel').implementation = function (_str: string, _orderReqModel: Java.Wrapper, _UserInfoModel: Java.Wrapper): Java.Wrapper {
            let map = this.a.overload('java.lang.String', 'com.gsc.base.model.OrderReqModel', 'com.gsc.base.model.UserInfoModel').apply(this, arguments);
            map.put('sdk_ver', '5.6.2');
            return map;
        };

        // 过本地充值限制（仍然会在下一步受限，暂无解）
        const MinorAntiPayActivity = Java.use('com.gsc.minor_anti_pay.MinorAntiPayActivity');
        MinorAntiPayActivity.b.overload('com.gsc.minor_anti_pay.model.AntiPayResModel').implementation = function (_antiPayResModel: Java.Wrapper) {
            this.b.overload('com.gsc.minor_anti_pay.model.AntiPayResModel').call(this);
        }
    }

    function changeNetworkConfig(): void{
        //通过暴力修改java层`network_config`请求的url，简单粗暴
            Java.use("java.net.URL").$init.overload('java.lang.String').implementation = function (urlStr) {
                //console.log(`[Java Layer] Hook url:${urlStr}`)
                if (urlStr.match("https://ak-conf.hypergryph.com/config/prod/official/network_config")) {
                    urlStr = `http://${SETTING['ServerUrl']}/prod/official/network_config`;
                }
                return this.$init(urlStr);
            };
    }

    export function main(): void {
        Logger.logNormal('[JavaHook] Starting java layer hook...');
        tryCallingHook(
            SETTING['IsBiliChannel'] ? [ACESDKHook, biliGameSDKHook, biliTrackHook, biliPaymentHook] : [ACESDKHook],
            SETTING['IsBiliChannel'] ? ['ACESDKHook', 'biliGameSDKHook', 'biliTrackHook', 'biliPaymentHook'] : ['ACESDKHook'],
            '[JavaHook]');
        tryCallingHook(
            SETTING['EnableChangeUrl'] ? [changeNetworkConfig] : [],
            SETTING['EnableChangeUrl'] ? ['changeNetworkConfig'] : [],
            '[ChangeUrl]');
    }
}