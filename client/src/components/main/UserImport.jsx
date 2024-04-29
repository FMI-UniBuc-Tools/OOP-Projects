
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

/*

!!! TODO - Handle query in the BE - See client/mysqlQueryTest.js

import dotenv from 'dotenv';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({
    path: resolve(__dirname + '/../.env'),
});


const connectionString = process.env.DATABASE_LOGIN
// console.log(connectionString)
const parsedConnectionString = new URL(connectionString);

const host = parsedConnectionString.hostname;
const port = parsedConnectionString.port;
const user = parsedConnectionString.username;
const password = parsedConnectionString.password;
const database = parsedConnectionString.pathname.slice(1);

const connection = mysql.createConnection({
  host: host,
  port: port,
  user: user,
  password: password,
  database: database
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("err");
    return;
  }
  console.log('connected to the db');
});

const table = database + ".`app.user`"

const insertQuery = `INSERT INTO ${table}  
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`;


*/

// -----------------------------------------------------------------------------------------


/* Test the component - modify main.jsx: 

import Test from './components/main/UserImport';
ReactDOM.createRoot(document.getElementById('root')).render(<Test />);

*/
function UserImport(){

    function AddButton(id){

        const [clicked, setClicked] = useState(false);
      
        const handleClick = () => {

          // TODO - handle POST request

          setClicked(true);
        };
      
        return (
          <div>
            <Button 
              type="button" 
              onClick={handleClick} 
              disabled={clicked} 
            >
              Add
            </Button>
          </div>
        );
      };
      

    const [data, setData] = useState([]);
    const [success, setSuccess] = useState(false);
  
    function handleFileUpload (e){

      // Remove the previous file's content
      setData([])

      const file = e.target.files[0];
  
      // Check for invalid file format
      if (!file || !file.name.endsWith('.xlsx')) {

        alert("Invalid format!")
        setSuccess(false)
        return;
      }
  
      const reader = new FileReader();
  
      reader.onload = (event) => {

        const binaryString = event.target.result
        const workbook = XLSX.read(binaryString, { type: 'binary' })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 })

        setSuccess(true)
        
        setData(jsonData);
      };
  
       reader.readAsArrayBuffer(file);
    };
  
    return (
      <>
      <div className="col text-center">
      <input className = "border border-3" type="file" accept=".xlsx" onChange={handleFileUpload} />
        <br/>
        <br/>
        {data.length > 0 && (
          <Table>
            <thead>
              <tr>
                {
                data[0].map((cell, index) => (
                  <th key={index}>{cell}</th>
                ))
                }
              </tr>
            </thead>
            
            <tbody>
              {data.slice(1).map((row, rowIndex) => (

                <tr key={rowIndex}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td>{row[3]}</td>
                <td>{row[4]}</td>
                <td>{row[5]}</td>
                <td>{row[6]}</td>
                <td>{row[7]}</td>
                <td>{row[8]}</td>
                <td>
                    {/*Handle request in the BE */}
                    <AddButton>Add</AddButton>
                </td>
                </tr>
              ))}

            </tbody>
          </Table>
        )}

        <br/>

        {/*Handle request in the BE */}
        {success && 
            <Button className="btn btn-success d-inline-block" variant="primary" type="submit">
                Add All
            </Button>}
      </div>
      </>
    );
  };
  

export default UserImport;
