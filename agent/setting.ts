export const SETTING = {
    'Version': '2.0.2',
    'ServerUrl':'219.217.199.161:9444',
    'EnableChangeUrl': true, //强制修改服务器url
    'IsBiliChannel': false, //是否是b服
    'Proxy': false, //启用besthttp代理
    'ProxyAddress': 'http://192.168.2.5:11240',
    'ShowEnemyHp': true, //显示敌人血量
    'PP': false, //添加额外后处理
    'ShowBattleTimeInfo': true, //战斗中显示时间
    'SpeedLevel3': false, //战斗中三倍速
    'SpeedLevel16': false, //战斗中十六倍速
    'EnableTAS': true, //启用TAS和敌人信息面板
    'LogToAdb': true,
    'LogTag': 'ArknightsHook',
    'Il2CppHookDelay': 5000,
    'FindFontDelay': 10000,
    'GlobalFont': 'Novecentowide-Normal',
    'KeyBinding': { //按键绑定
        'TAS': {
            'Normal': 'C',
            'SingleFrame': 'Alpha1',
            'DoubleFrame': 'Alpha2',
            'PlayingOnDown': 'F',
            'PlayingOnUp': 'R',
            'CONTROL': 'X',
        },
        'EnemyHud': {
            'ShowInfo': 'Z'
        },
        'BattleSpeedLevel': {
            'THREE': 'Alpha3',
            'FOUR': 'Alpha4'
        }
    }
};

