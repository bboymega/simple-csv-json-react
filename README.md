# simple Csv Json Operator
Access and manipulate CSV data or databases via JSON-based API.

# Supported Endpooints
| Endpoint | Methods | Request | JSON Response |
|----------|----------|----------|----------|
| /  | GET  | N/A | Help message |
| /get  | GET  | N/A | CSV records |
| /push  | POST  | New record | Execution Result [Success \| Failed] |
| /delete  | POST  | Index of record to be deleted | Execution Result [Success \| Failed] |
| /deletelastrow  | GET \| POST  | N/A | Execution Result [Success \| Failed] |
