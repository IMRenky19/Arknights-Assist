import {Logger} from './logger';
import {Il2CppUtil} from './il2cppUtil';

export namespace UnityUtil {
    function objToString(obj: Il2Cpp.Object) {
        return obj.isNull() ? 'null' : obj.method<Il2Cpp.String>('ToString').invoke().content;
    }

    function saveAllObjectsInSence() {
        let UnityEngineCoreModule = Il2Cpp.Domain.assembly('UnityEngine.CoreModule').image;
        function forScene(scene: Il2Cpp.ValueType) {
            let roots = scene.box().method<Il2Cpp.Array<Il2Cpp.Object>>('GetRootGameObjects').overload().invoke();
            let res = scene.box().method<Il2Cpp.String>('get_name').invoke().content + '\n';
            function DoName(obj: Il2Cpp.Object, input: string, count: number = 0): string {
                for (let index = 0; index < count * 6; index++) {
                    input += ' ';
                }
                //let active = obj.method<Il2Cpp.Object>('get_gameObject').invoke().method<boolean>('get_active');
                input += '└──' + obj.method<Il2Cpp.String>('get_name').invoke().content + ' (';
                let components = obj.method<Il2Cpp.Array<Il2Cpp.Object>>('GetComponents').invoke(UnityEngineCoreModule.class('UnityEngine.Component').type.object);
                for (let j = 0; j < components.length; j++) {
                    input += (j == 0 ? '' : ', ') + Il2CppUtil.getTypeString(components.get(j));
                }
                input += ")\n";
                let childCount = obj.method('get_childCount').invoke();
                for (let index = 0; index < childCount; index++) {
                    input = DoName(obj.method<Il2Cpp.Object>('GetChild').invoke(index), input, count + 1);
                }
                return input;
            }
            for (let index = 0; index < roots.length; index++) {
                res = DoName(roots.get(index).method<Il2Cpp.Object>('get_transform').invoke(), res);
            }
            let path = Il2Cpp.applicationDataPath + '/' + Logger.formatDate(new Date().getTime(), 'hh-mm-ss') + '.txt';
            let file = new File(path, 'w');
            file.write(res);
            file.flush();
            file.close();
        }
        forScene(UnityEngineCoreModule.class('UnityEngine.SceneManagement.SceneManager').method<Il2Cpp.ValueType>('GetActiveScene').invoke());
        //let dont = UnityEngineCoreModule.class('UnityEngine.GameObject').method<Il2Cpp.Object>('Find').invoke(Il2Cpp.String.from('Tracking')).method<Il2Cpp.ValueType>('get_scene').invoke();
        //forScene(dont);
        //return;
        /*Interceptor.replace(getFunctionByAddress(Il2Cpp.module, me.relativeVirtualAddress), new NativeCallback(function (obj: NativePointer, scale: number) {
            let ac = new Il2Cpp.Object(obj);
            log(objToString(ac))
            ac.method('set_scaleFactor').invoke(scale);
            log(Thread.backtrace(this.context, Backtracer.FUZZY).map(DebugSymbol.fromAddress).join('\n'))
        }, 'void', ['pointer', 'float']))*/
        //log(b.method<number>('get_scaleFactor').invoke().toString())//.box().method<Il2Cpp.String>('ToString').invoke().content)//.field('m_ScreenMatchMode').value// as Il2Cpp.ValueType).box().field('value__').value.toString();
    }

    function getFields(obj: Il2Cpp.Object) {
        let fields = obj.class.fields;
        Logger.log(`find ${fields.length} fields.`)
        fields.forEach(field => {
            let name = field.name;
            try {

                let value = obj.field(name).value;
                Logger.log(`[1;34m${name}[m - [1;36m${value}[m`);
            }
            catch
            {
                Logger.log(`[33mError in ${name}[m`);
            }
        });
    }

    export function vector2ToTuple(v2: Il2Cpp.ValueType) {
        return [v2.field('x').value as number, v2.field('y').value as number]
    }

    export function vector3ToTuple(v3: Il2Cpp.ValueType) {
        return [v3.field('x').value as number, v3.field('y').value as number, v3.field('z').value as number]
    }

    function logRectTransform(obj: Il2Cpp.Object) {
        let com = obj.method<Il2Cpp.Object>('GetComponent').invoke(Il2Cpp.Domain.assembly('UnityEngine.CoreModule').image.class('UnityEngine.RectTransform').type.object);
        let sizeDelta = com.method<Il2Cpp.ValueType>('get_sizeDelta').invoke();
        let anchorMax = com.method<Il2Cpp.ValueType>('get_anchorMax').invoke();
        let anchorMin = com.method<Il2Cpp.ValueType>('get_anchorMin').invoke();
        let anchoredPosition = com.method<Il2Cpp.ValueType>('get_anchoredPosition').invoke();
        let localScale = com.method<Il2Cpp.ValueType>('get_localScale').invoke();
        Logger.log(`[1;34mRectTransform in[m [1;36m${obj.toString()}[m[1;34m:[m
[1;34msizeDelta[m - [1;36m(${vector2ToTuple(sizeDelta)})[m
[1;34manchorMax[m - [1;36m(${vector2ToTuple(anchorMax)})[m
[1;34manchorMin[m - [1;36m(${vector2ToTuple(anchorMin)})[m
[1;34manchoredPosition[m - [1;36m(${vector2ToTuple(anchoredPosition)})[m
[1;34mlocalScale[m - [1;36m(${vector3ToTuple(localScale)})[m`)
    }

    function getTransformPath(obj: Il2Cpp.Object) {
        let transform = obj.method<Il2Cpp.Object>('get_transform').invoke();
        let path: string = '';
        do {
            path = '/' + transform.method<Il2Cpp.String>('get_name').invoke().content + path;
            transform = transform.method<Il2Cpp.Object>('get_parent').invoke();
        } while (!transform.isNull())
        return path;
    }
}