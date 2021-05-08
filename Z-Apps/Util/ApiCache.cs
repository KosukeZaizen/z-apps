using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Z_Apps.Models;
using Z_Apps.Models.SystemBase;

namespace Z_Apps.Util
{
    public class ApiCache
    {

        public class CacheData
        {
            public DateTime CachedDate { get; set; }
            public object Data { get; set; }
        }

        private static Dictionary<string, Dictionary<string, Dictionary<string, CacheData>>> Cache =
            new Dictionary<string, Dictionary<string, Dictionary<string, CacheData>>>();

        private const int CacheLifeTimeDays = 60;


        public static Result UseCache<Result>(string param, Func<Result> action) where Result : class
        {

            // StackFrameクラスをインスタンス化する
            StackFrame objStackFrame = new StackFrame(1);// フレーム数1なら直接呼び出したメソッド

            // 呼び出し元のクラス名を取得する
            string strClassName = objStackFrame.GetMethod().ReflectedType.FullName;
            // 呼び出し元のメソッド名を取得する
            string strMethodName = objStackFrame.GetMethod().Name;

            if (
                Cache.ContainsKey(strClassName)
                && Cache[strClassName].ContainsKey(strMethodName)
                && Cache[strClassName][strMethodName].ContainsKey(param)
                )
            {
                //キャッシュ登録済み
                Task.Run(async () =>
                {
                    await Task.Delay(5000);
                    Cache[strClassName][strMethodName][param] = new CacheData()
                    {
                        CachedDate = DateTime.Now,
                        Data = action()
                    };
                });

                return (Result)Cache[strClassName][strMethodName][param]?.Data;
            }


            //キャッシュ未登録
            Result result = action();

            if (result == null || "".Equals(result))
            {
                return result;
            }

            Task.Run(async () =>
            {
                await Task.Delay(3000);

                var dicParam = new Dictionary<string, CacheData>{
                    {
                        param,
                        new CacheData(){
                            CachedDate = DateTime.Now,
                            Data = result
                        }
                    }
                };


                if (!Cache.ContainsKey(strClassName))
                {
                    // クラス名未登録
                    Cache.Add(strClassName, new Dictionary<string, Dictionary<string, CacheData>>{
                        { strMethodName, dicParam }
                    });
                }
                else
                {
                    if (!Cache[strClassName].ContainsKey(strMethodName))
                    {
                        // メソッド名未登録
                        Cache[strClassName].Add(strMethodName, dicParam);
                    }
                    else
                    {
                        // メソッド名登録済み（パラメータが未登録）
                        if (Cache[strClassName][strMethodName].Count < 10000)
                        {
                            // 1つのメソッドに対して登録可能なパラメータは10000種類までとする
                            Cache[strClassName][strMethodName].Add(param, new CacheData()
                            {
                                CachedDate = DateTime.Now,
                                Data = result
                            });
                        }
                    }
                }
            });

            return result;
        }



        public static async Task<Result> UseCacheAsync<Result>(
            string strClassName,
            string strMethodName,
            string param,
            Func<Task<Result>> action
            ) where Result : class
        {

            if (
                Cache.ContainsKey(strClassName)
                && Cache[strClassName].ContainsKey(strMethodName)
                && Cache[strClassName][strMethodName].ContainsKey(param)
                )
            {
                //キャッシュ登録済み
                var task = Task.Run(async () =>
                {
                    await Task.Delay(5000);
                    Cache[strClassName][strMethodName][param] = new CacheData()
                    {
                        CachedDate = DateTime.Now,
                        Data = await action()
                    };
                });

                return (Result)Cache[strClassName][strMethodName][param]?.Data;
            }


            //キャッシュ未登録
            Result result = await action();

            if (result == null || "".Equals(result))
            {
                return result;
            }

            var t = Task.Run(async () =>
            {
                await Task.Delay(3000);

                var dicParam = new Dictionary<string, CacheData>{
                    {
                        param,
                        new CacheData(){
                            CachedDate = DateTime.Now,
                            Data = result
                        }
                    }
                };


                if (!Cache.ContainsKey(strClassName))
                {
                    // クラス名未登録
                    Cache.Add(strClassName, new Dictionary<string, Dictionary<string, CacheData>>{
                        { strMethodName, dicParam }
                    });
                }
                else
                {
                    if (!Cache[strClassName].ContainsKey(strMethodName))
                    {
                        // メソッド名未登録
                        Cache[strClassName].Add(strMethodName, dicParam);
                    }
                    else
                    {
                        // メソッド名登録済み（パラメータが未登録）
                        if (Cache[strClassName][strMethodName].Count < 10000)
                        {
                            // 1つのメソッドに対して登録可能なパラメータは10000種類までとする
                            Cache[strClassName][strMethodName].Add(param, new CacheData()
                            {
                                CachedDate = DateTime.Now,
                                Data = result
                            });
                        }
                    }
                }
            });

            return result;
        }



        public static void DeleteOldCache()
        {

            var removedCache = new List<string>() { };
            var minLimitDate = DateTime.Now.AddDays(-1 * CacheLifeTimeDays);

            foreach (var (className, c1) in Cache)
            {
                foreach (var (methodName, c2) in c1)
                {
                    foreach (var (param, cachedData) in c2)
                    {
                        if (cachedData.CachedDate < minLimitDate)
                        {
                            // 古いCacheデータの場合
                            removedCache.Add($"{className}.{methodName}({param})");
                            c2.Remove(param);
                        }
                    }
                }
            }
            var logService = new ClientLogService(new DBCon());
            logService.RegisterLog(new ClientOpeLog()
            {
                url = "ApiCache",
                operationName = "ApiCache DeleteOldCache",
                userId = "ApiCache",
                parameters = "Removed: " + string.Join(", ", removedCache)
            });
        }


        public static Dictionary<string, Dictionary<string, Dictionary<string, CacheData>>> GetCache()
        {
            return Cache;
        }
    }
}