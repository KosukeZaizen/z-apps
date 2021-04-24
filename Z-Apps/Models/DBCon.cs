using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Z_Apps.Util;
using System.Data;

namespace Z_Apps.Models
{
    public class DBCon
    {
        private string connectionString;
        public enum DBType
        {
            z_apps,
            wiki_db
        }
        public DBCon(DBType type = DBType.z_apps)
        {
            if (type == DBType.wiki_db)
            {
                connectionString = PrivateConsts.CONNECTION_STRING_WIKI;
            }
            else
            {
                connectionString = PrivateConsts.CONNECTION_STRING;
            }
        }
        public List<Dictionary<string, Object>> ExecuteSelect(string sql, Dictionary<string, object[]> dicParams = null)
        {
            using (var connection = new SqlConnection(connectionString))
            using (var command = new SqlCommand(sql, connection))
            {
                try
                {
                    // パラーメータの置換
                    if (dicParams != null)
                    {
                        foreach (KeyValuePair<string, object[]> kvp in dicParams)
                        {
                            var param = command.CreateParameter();
                            param.ParameterName = kvp.Key;
                            param.SqlDbType = (SqlDbType)kvp.Value[0];
                            param.Direction = ParameterDirection.Input;
                            param.Value = kvp.Value[1];

                            command.Parameters.Add(param);
                        }
                    }

                    // データベースの接続開始
                    connection.Open();

                    // SQLの実行
                    SqlDataReader sdr = command.ExecuteReader();

                    var records = new List<Dictionary<string, Object>>();

                    while (sdr.Read() == true)
                    {
                        var record = new Dictionary<string, Object>();
                        for (int i = 0; i < sdr.FieldCount; i++)
                        {
                            var value = sdr.GetValue(i);
                            record.Add(sdr.GetName(i), DBNull.Value.Equals(value) ? null : value);
                        }
                        records.Add(record);
                    }
                    return records;
                }
                catch (Exception exception)
                {
                    ErrorLog.InsertErrorLog(exception.Message);
                    throw;
                }
                finally
                {
                    // データベースの接続終了
                    connection.Close();
                }
            }
        }

        public bool ExecuteUpdate(string sql, Dictionary<string, object[]> dicParams)
        {
            using (var connection = new SqlConnection(connectionString))
            using (var command = new SqlCommand("SET ANSI_WARNINGS OFF; " + sql, connection))
            {
                try
                {
                    // パラーメータの置換
                    if (dicParams != null)
                    {
                        foreach (KeyValuePair<string, object[]> kvp in dicParams)
                        {
                            var param = command.CreateParameter();
                            param.ParameterName = kvp.Key;
                            param.SqlDbType = (SqlDbType)kvp.Value[0];
                            param.Direction = ParameterDirection.Input;
                            param.Value = kvp.Value[1];

                            command.Parameters.Add(param);
                        }
                    }

                    // データベースの接続開始
                    connection.Open();

                    // SQLの実行
                    int result = command.ExecuteNonQuery();
                    return result >= 0;
                }
                catch (Exception exception)
                {
                    ErrorLog.InsertErrorLog(exception.Message);
                    throw;
                }
                finally
                {
                    // データベースの接続終了
                    connection.Close();
                }
            }
        }

        private Func<string, Dictionary<string, object[]>, int> GetUpdateFunc(
            SqlCommand command)
        {
            return (string sql, Dictionary<string, object[]> dicParams) =>
            {
                command.CommandText = sql;
                command.Parameters.Clear();

                // パラーメータの置換
                if (dicParams != null)
                {
                    foreach (KeyValuePair<string, object[]> kvp in dicParams)
                    {
                        var param = command.CreateParameter();
                        param.ParameterName = kvp.Key;
                        param.SqlDbType = (SqlDbType)kvp.Value[0];
                        param.Direction = ParameterDirection.Input;
                        param.Value = kvp.Value[1];

                        command.Parameters.Add(param);
                    }
                }

                // SQLの実行
                int result = command.ExecuteNonQuery();
                return result;
            };
        }

        // funcを引数として受け取り、そのfunc内の処理の前後に
        // TransactionのBeginやCommitを行う
        public bool UseTransaction(
            Func<Func<string, Dictionary<string, object[]>, int>, bool> func
        )
        {
            using (var connection = new SqlConnection(connectionString))
            {
                using (var command = connection.CreateCommand())
                {
                    // データベースの接続開始
                    connection.Open();
                    SqlTransaction transaction = connection.BeginTransaction();
                    command.Transaction = transaction;
                    try
                    {
                        var execUpdate = GetUpdateFunc(command);
                        // 引数で受け取った関数に、update実行用の関数を渡す
                        bool result = func(execUpdate);
                        if (result)
                        {
                            transaction.Commit();
                            return true;
                        }
                        transaction.Rollback();
                        return false;
                    }
                    catch (Exception ex)
                    {
                        ErrorLog.InsertErrorLog(ex.Message);
                        transaction.Rollback();
                        return false;
                    }
                    finally
                    {
                        connection.Close();
                    }
                }
            }
        }
    }
}