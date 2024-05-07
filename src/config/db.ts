import sql from 'msnodesqlv8';
import Connection = MsNodeSqlV8.Connection;
import ConnectionPromises = MsNodeSqlV8.ConnectionPromises;



export async function t() {
    // Define the connection string with your SQL Server details
    const connectString = 'Driver={ODBC Driver 17 for SQL Server}; Server=HO-SAFC-LP071; UID=sa; PWD=Qwer123; Database=testing; Encrypt=no';

    console.log("Connecting to the database...");

    // Open a connection to the SQL Server
    const con: Connection = await sql.promises.open(connectString);
    
    console.log("Connected to the database.");

    // Access the promises interface for the connection
    const promises: ConnectionPromises = con.promises;
    
    // Execute a query to retrieve the server name
    const res = await promises.query('select @@servername as server');
    
    console.log("Query executed successfully. Result:");

    // Print the result to the console
    console.log(JSON.stringify(res, null, 4));
    
    // Close the connection
    await con.promises.close();

    console.log("Connection closed.");
}
