using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Z_Apps.Util;
using System.Data;

namespace Z_Apps.Models
{
    public class DBCon
    {
        private SqlConnection sqlConnection;

        public DBCon()
        {
            sqlConnection = new SqlConnection(PrivateConsts.CONNECTION_STRING);
        }

        public List<Dictionary<string, Object>> ExecuteSelect(string sql, Dictionary<string, object[]> dicParams)
        {
            using (var connection = sqlConnection)
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
                    //command.CommandText = sql;
                    SqlDataReader sdr = command.ExecuteReader();

                    var records = new List<Dictionary<string, Object>>();

                    while (sdr.Read() == true)
                    {
                        var record = new Dictionary<string, Object>();
                        for (int i = 0; i < sdr.FieldCount; i++)
                        {
                            record.Add(sdr.GetName(i), sdr.GetValue(i));
                        }
                        records.Add(record);
                    }
                    return records;
                }
                catch (Exception exception)
                {
                    Console.WriteLine(exception.Message);
                    throw;
                }
                finally
                {
                    // データベースの接続終了
                    connection.Close();
                }
            }
        }

        public SqlCommand getSqlCommand(string sql)
        {
            return new SqlCommand(sql, sqlConnection);
        }
        
    }
}
