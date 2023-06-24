import 'frida-il2cpp-bridge';
import {SETTING} from './setting';
import {Logger} from './utils/logger';
import { JavaHook } from './hooks/javaHook';
import { Il2CppHook } from './hooks/il2cppHook';

const title = 'G1szNm0gICAgX19fICAgIF9fICAgICAgICAgICAgICBfICAgICAgIF9fICAgIF9fICAgICAgG1ttChtbMzZtICAgLyAgIHwgIC8gL19fX19fX19fX19fICAoXylfX18gXy8gL18gIC8gL19fX19fXxtbbQobWzE7MzZtICAvIC98IHwgLyAvL18vIF9fXy8gX18gXC8gLyBfXyBgLyBfXyBcLyBfXy8gX19fLxtbbQobWzE7MzZtIC8gX19fIHwvICw8IC8gLyAgLyAvIC8gLyAvIC9fLyAvIC8gLyAvIC9fKF9fICApIBtbbQobWzE7MzRtL18vICB8Xy9fL3xfL18vICAvXy8gL18vXy9cX18sIC9fLyAvXy9cX18vX19fXy8gIBtbbQobWzM0bSAgICAgICAgICAgICAgICAgICAgICAgICAvX19fXy8gICAgICAgICAgICAgICAgICAbW20KG1sxOzMwbS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0bW20KG1sxOzMybUFya25pZ2h0cyBBc3Npc3QgU2NyaXB0IFYyLjAuMhtbbSAbWzQ7MzJtKEZvciBBcmtuaWdodHMgdjEuOS44MSB8IFRlc3RlZCBvbiBGcmlkYSB2MTYuMC4xMSkbW20KG1sxOzMzbUF1dGhvcmVkIGJ5IENoYW9tZW5nQ0ZYG1tt';

Logger.log('[1;36m==========Programme started!==========[m');
Logger.l(Buffer.from(title, 'base64').toString());
Java.perform(JavaHook.main);
setTimeout(() => Il2Cpp.perform(Il2CppHook.main), SETTING['Il2CppHookDelay']);