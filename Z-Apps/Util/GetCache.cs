using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;

namespace Z_Apps.Util {
    public class GetCache {
        private static Dictionary<string, Dictionary<string, Dictionary<string, object>>> cache =
            new Dictionary<string, Dictionary<string, Dictionary<string, object>>>();

        public static Result UseCache<Result>(string param, Func<Result> action) {
            // StackFrameクラスをインスタンス化する
            int nFrame = 1; // フレーム数(1なら直接呼び出したメソッド)
            StackFrame objStackFrame = new StackFrame(nFrame);

            // 呼び出し元のクラス名を取得する
            string strClassName = objStackFrame.GetMethod().ReflectedType.FullName;
            // 呼び出し元のメソッド名を取得する
            string strMethodName = objStackFrame.GetMethod().Name;

            if (
                cache.ContainsKey(strClassName)
                && cache[strClassName].ContainsKey(strMethodName)
                && cache[strClassName][strMethodName].ContainsKey(param)
                ) {
                //キャッシュ登録済み
                Task.Run(async () => {
                    await Task.Delay(5000);
                    cache[strClassName][strMethodName][param] = action();
                });

                return (Result)cache[strClassName][strMethodName][param];
            }


            //キャッシュ未登録
            var result = action();

            Task.Run(async () => {
                await Task.Delay(3000);

                var dicParam = new Dictionary<string, object>{
                    {param, result}
                };


                if (!cache.ContainsKey(strClassName)) {
                    cache.Add(strClassName, new Dictionary<string, Dictionary<string, object>>{
                        { strMethodName, dicParam }
                    });
                } else {
                    if (!cache[strClassName].ContainsKey(strMethodName)) {
                        cache[strClassName].Add(strMethodName, dicParam);
                    } else {
                        cache[strClassName][strMethodName].Add(param, result);
                    }
                }
            });

            return result;
        }


        public static async Task<Result> UseCacheAsync<Result>(string param, Func<Task<Result>> action) {
            // StackFrameクラスをインスタンス化する
            int nFrame = 1; // フレーム数(1なら直接呼び出したメソッド)
            StackFrame objStackFrame = new StackFrame(nFrame);

            // 呼び出し元のクラス名を取得する
            string strClassName = objStackFrame.GetMethod().ReflectedType.FullName;
            // 呼び出し元のメソッド名を取得する
            string strMethodName = objStackFrame.GetMethod().Name;

            if (
                cache.ContainsKey(strClassName)
                && cache[strClassName].ContainsKey(strMethodName)
                && cache[strClassName][strMethodName].ContainsKey(param)
                ) {
                //キャッシュ登録済み
                var task = Task.Run(async () => {
                    await Task.Delay(5000);
                    cache[strClassName][strMethodName][param] = await action();
                });

                return (Result)cache[strClassName][strMethodName][param];
            }


            //キャッシュ未登録
            var result = await action();

            var t = Task.Run(async () => {
                await Task.Delay(3000);

                var dicParam = new Dictionary<string, object>{
                    {param, result}
                };


                if (!cache.ContainsKey(strClassName)) {
                    cache.Add(strClassName, new Dictionary<string, Dictionary<string, object>>{
                        { strMethodName, dicParam }
                    });
                } else {
                    if (!cache[strClassName].ContainsKey(strMethodName)) {
                        cache[strClassName].Add(strMethodName, dicParam);
                    } else {
                        cache[strClassName][strMethodName].Add(param, result);
                    }
                }
            });

            return result;
        }
    }
}