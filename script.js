#!/usr/bin/env node

let fs = require("fs");

let cmd = process.argv.slice(2);
(function () {
    var str = "";
    let options = [];
    let files = [];
    for (let x in cmd) {
        if (cmd[x].startsWith("-") && cmd[x].length == 2) {
            options.push(cmd[x]);
        } else {
            files.push(cmd[x]);
            if (!fs.existsSync(cmd[x])) {
                console.log(cmd[x] + " does not exists");
                return;
            }
        }
    }

    if (files.length <= 0) {
        console.log("No File Entered!");
        return;
    }

    for (let x in files) {
        str += fs.readFileSync(files[x]).toString();
    }

    str = str.split("\n")
    if (options.includes("-s")) {
        str = removeLargeSpaces(str);
    }
    if (options.includes("-n") && options.includes("-b")) {
        // both options are given by user
        if (options.indexOf("-b") > options.indexOf("-n")) {
            // execute -n
            str = addNum(str);
        } else {
            // execute -b
            str = addNonEmptyNum(str);
        }
    } else {
        //either onr or more or none option is given by user
        if (options.includes("-b")) {
            // execute -b
            str = addNonEmptyNum(str);
        } else if (options.includes("-n")) {
            // execute -n
            str = addNum(str);
        }
    }
    str = str.join("\n");
    console.log(str);
})();
function removeLargeSpaces(arr) {
    let ans = [];
    for (let i = 0; i < arr.length; i++) {
        let prev = arr[i];
        let curr = arr[i + 1];
        if ((prev == "" && curr == "") || (prev == "\r" && curr == "\r")) {

        } else {
            ans.push(arr[i]);
        }
    }
    return ans;
}

function addNum(arr){
    let nArr = []
    for(x in arr){
        var t = Number(x) + 1;
        nArr[x] = t+ " " + arr[x];
    }
    return nArr;
}

//-b
function addNonEmptyNum(arr){
    let lineNumber = 1;
    let nArr = []
    for(let x in arr){
        if(arr[x] == "\r" || arr[x] == ""){
            nArr[x] = arr[x];
        }else{
            nArr[x] = lineNumber + " " + arr[x];
            lineNumber++;
        }
    }
    return nArr;
}