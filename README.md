# Simple Csv Json Operator in Node.js
Access and manipulate CSV data or databases via JSON-based API in Node.js.

# Supported Endpooints
| Endpoint | Methods | Request | JSON Response |
|----------|----------|----------|----------|
| /  | GET  | N/A | Help message |
| /get  | GET  | N/A | CSV records |
| /push  | POST  | New record | Execution Result [Success \| Failed] |
| /delete  | POST  | Index of record to be deleted | Execution Result [Success \| Failed] |
| /deletelastrow  | GET \| POST  | N/A | Execution Result [Success \| Failed] |

# Purposes of Endpoints
## /get: Return CSV records as JSON. ##

Output Example:
```
{
  "results": [
    {
      "ID": "1",
      "Name": "Alice Johnson",
      "Email": "alice.johnson@example.com",
      "Age": "28"
    },
    {
      "ID": "2",
      "Name": "Bob Smith",
      "Email": "bob.smith@example.com",
      "Age": "34"
    }
  ]
}
```


## /push: Add new record to CSV ##

Input Example:

```
{
  "ID": "3",
  "Name": "Charlie Brown",
  "Email": "charlie.brown@example.com",
  "Age": "22"
}
```

## /delete: Delete specific record from CSV ##

Input Example:

```
{
  "index": 4
}
```
In this case, the 4th record will be deleted from the CSV.

## /deletelastrow: Delete the last record from CSV ##

Supported method: `GET | POST`
