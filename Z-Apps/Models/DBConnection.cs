using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace Z_Apps.Models
{
    public class DBConnection
    {
        private SqlConnection sqlConnection;

        public DBConnection()
        {
            //sqlConnection = new SqlConnection(GetConnectionString());
            sqlConnection = new SqlConnection(
                "Server=tcp:z-apps-db-server.database.windows.net,1433;Initial Catalog=Z-Apps-DB;Persist Security Info=False;User ID=kosuke;Password=Ryusihou14;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
                );
        }

        private string GetConnectionString()
        {
            // 接続文字列の取得
            var builder = new SqlConnectionStringBuilder()
            {
                DataSource = "z-apps-db-server.database.windows.net",
                IntegratedSecurity = false,
                UserID = "kosuke",
                Password = "Ryusihou14"
            };
            return builder.ToString();
        }

        public List<Dictionary<string, Object>> ExecuteSelect(string sql)
        {
            using (var connection = sqlConnection)
            using (var command = connection.CreateCommand())
            {
                try
                {
                    // データベースの接続開始
                    connection.Open();

                    // SQLの実行
                    command.CommandText = sql;
                    SqlDataReader sdr = command.ExecuteReader();

                    var sentences = new List<Dictionary<string, Object>>();

                    while (sdr.Read() == true)
                    {
                        var sentence = new Dictionary<string,Object>();
                        for (int i = 0; i < sdr.FieldCount; i++) {
                            sentence.Add(sdr.GetName(i), sdr.GetValue(i));
                        }
                        sentences.Add(sentence);
                    }
                    return sentences;
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
    }
}
