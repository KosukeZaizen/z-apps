using System.Collections.Generic;
using System.Data;
using Z_Apps.Models;

public class DB_Util
{
    private readonly DBCon con;
    public DB_Util(DBCon con)
    {
        this.con = con;
    }

    public List<string> GetAllTableNames()
    {
        //SQL文作成
        string sql = "SELECT *";
        sql += " FROM   sysobjects";
        sql += " WHERE  xtype = 'U'";
        sql += " ORDER BY name;";

        //List<Dictionary<string, Object>>型で取得
        var tables = con.ExecuteSelect(sql, null);

        var tableNames = new List<string>();
        foreach (var table in tables)
        {
            tableNames.Add((string)table["name"]);
        }
        return tableNames;
    }

    public List<Dictionary<string, object>> GetAllDataFromOneTable(string tableName)
    {
        //SQL文作成
        string sql = "SELECT *";
        sql += " FROM " + tableName;

        //List<Dictionary<string, Object>>型で取得
        var records = con.ExecuteSelect(sql, null);

        return records;
    }
}