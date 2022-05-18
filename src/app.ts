import e from "express";
import express, { Request, Response } from "express";
import * as data from "./resources/users.json"
// rest of the code remains same
const app = express();
const PORT = 3000;

//this function adds the json elements in the html table
function convert(elem: string) {
    var colS = "<td>"
    var colE = "</td>" 
    var res = colS + elem + colE
    return (res)  
}

//this function creates an html table with all the json content
function generate_table() {
  var start = "<table>"
  var end = "</table>"
  var res: string = ""
  var rowS = "<tr>"
  var rowE = "</tr>"
  for (var i = 0; i < Object.keys(data).length - 1; i++) {
    res += rowS
    res += convert(data[i].first_name)
    res += convert(data[i].last_name)
    res += convert(data[i].age.toString())
    res += rowE  
  }
  var newres = start + res + end
  return newres
}

app.get("/", (req: Request, res: Response) => {
  res.send(generate_table());
});

//this function creates an html table with the filter age
function filterage(elem: string) {
  var start = "<table>"
  var end = "</table>"
  var rowS = "<tr>"
  var rowE = "</tr>"
  var res: string = ""
  for (var i = 0; i < Object.keys(data).length - 1; i++) {
    if (elem == data[i].age.toString()) {
      res += rowS
      res += generate_elem(data[i].first_name)
      res += generate_elem(data[i].last_name)
      res += generate_elem(data[i].age.toString())
      res += rowE  
    }
  }
  var newres = start + res + end
  return newres
}

//this function adds the json elements in the html table filter age
function generate_elem(elem: string) {
  var colS = "<td>"
  var colE = "</td>"
  var res = colS + elem + colE 
  return res
}

app.get("/age/:age", (req: Request, res: Response) => {
  const { age } = req.params;
  res.send(filterage(age));
});

//create list of json age element
function create_list() {
  var newlist:number[] = new Array()
  for (var i = 0; i < Object.keys(data).length - 1; i++) {
    newlist.push(data[i].age)
  }
  console.log(newlist)
  return newlist
}

//this fonction sort the list of age elem and add it to html table
function generate_sort_elem(newlist:number[]) {
  var sorted_list = newlist.sort()
  var start = "<table>"
  var end = "</table>"
  var rowS = "<tr>"
  var rowE = "</tr>"
  var colS = "<td>"
  var colE = "</td>"
  var res: string = ""
  const sum = sorted_list.reduce((a, b) => a + b, 0);
  const avg = (sum / sorted_list.length) || 0;
  var res  =  start + rowS + colS + sorted_list[0].toString() + colE + colS +sum.toString() +colE +colS+ avg.toString() +colE+ rowE + end
  return res
}

app.get("/statistics", (req: Request, res: Response) => {
  var newlist = create_list()
  res.send(generate_sort_elem(newlist));
});



app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});


