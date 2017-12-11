'use strict';

const file = 'list.json';
const fs = require('fs');
const uuidv4 = require('uuid/v4');

//create
exports.createJSON = function createJSON(newNote){
    
    const fileRe = fs.readFileSync('./list.json', 'utf8');
    let fileObject = JSON.parse(fileRe);
    //create new Object
    let obj = {
        check: false,
        id: uuidv4(),
        subject: newNote
    };
    fileObject.Todo.push(obj);
    fs.writeFileSync(file, JSON.stringify(fileObject, null, 4));
    return 'Successful';
};

//read
exports.readJSON = function readJSON(){
    const fileRe = fs.readFileSync('./list.json', 'utf8');
    let fileObject = JSON.parse(fileRe);
    
    let output = null;
    for(let i = 0;i<fileObject.Todo.length;i++){
        if(output == null){
            if(fileObject.Todo[i].check == true){
                output = '&#10003 Subject: ' + JSON.stringify(fileObject['Todo'][i]['subject'] + ' | Id: ' + fileObject['Todo'][i]['id']);
            }else{
                output = '&#10007 Subject: ' + JSON.stringify(fileObject['Todo'][i]['subject'] + ' | Id: ' + fileObject['Todo'][i]['id']);
            }
        }else{
            if(fileObject.Todo[i].check == true){
                output = output + '<br>&#10003 Subject: ' + JSON.stringify(fileObject['Todo'][i]['subject'] + ' | Id: ' + fileObject['Todo'][i]['id']);
            }else{
                output = output + '<br>&#10007 Subject: ' + JSON.stringify(fileObject['Todo'][i]['subject'] + ' | Id: ' + fileObject['Todo'][i]['id']);
            }
        }
    }
    output = output.replace(/'/g,'');
    if(output == null){
        return 'no notes found'
    }
    return output;
};

//update
exports.updateJSON = function updateJSON(id, newsubject){
    const fileRe = fs.readFileSync('./list.json', 'utf8');
    let fileObject = JSON.parse(fileRe);

    const index = findWithAttr(fileObject.Todo, 'id', id);
    if(index == -1){
        return 'File not found';
    }else{
        fileObject.Todo[index].subject = newsubject;
        fs.writeFileSync(file, JSON.stringify(fileObject, null, 4));
        return 'Successful';
    }
};

//delete
exports.deleteJSON = function deleteJSON(oldid){
    const fileRe = fs.readFileSync('./list.json', 'utf8');
    let fileObject = JSON.parse(fileRe);
    const index = findWithAttr(fileObject.Todo, 'id', oldid);
    if(index == -1){
        return 'File not found';
    }else{
        fileObject.Todo.splice(index, 1);
        fs.writeFileSync(file, JSON.stringify(fileObject, null, 4));
        return 'Successful';
    }
};

//search
exports.searchJSON = function searchJSON(search) {
    const fileRe = fs.readFileSync('./list.json', 'utf8');
    let fileObject = JSON.parse(fileRe);
    
    let index = findWithAttr(fileObject.Todo, 'id', search);
    if(index == -1){
        return 'File not found';
    }else{
        let output;
        if(fileObject.Todo[index].check == true){
                output = '&#10003 Subject: ' + JSON.stringify(fileObject['Todo'][index]['subject'] + ' | Id: ' + fileObject['Todo'][index]['id']);
            }else{
                output = '&#10007 Subject: ' + JSON.stringify(fileObject['Todo'][index]['subject'] + ' | Id: ' + fileObject['Todo'][index]['id']);
            }
        return output;
    }
}

//check
exports.checkJSON = function check(toCheck){
    const fileRe = fs.readFileSync('./list.json', 'utf8');
    let fileObject = JSON.parse(fileRe);
    
    let index = findWithAttr(fileObject.Todo, 'id', toCheck);
    if(index == -1){
        return 'File not found';
    }else{
        if(fileObject.Todo[index].check == false){
            fileObject.Todo[index].check = true;
        }else{
            fileObject.Todo[index].check = false;
        }
        fs.writeFileSync(file, JSON.stringify(fileObject, null, 4));
        return 'Successful';
    }
    
}

//isChecked
exports.isCheckedJSON = function isChecked(){
    const fileRe = fs.readFileSync('./list.json', 'utf8');
    let fileObject = JSON.parse(fileRe);
    
    let output = null;
    for(let i = 0;i<fileObject.Todo.length;i++){
        if(output == null){
            if(fileObject.Todo[i].check == true){
                output = '&#10003 Subject: ' + JSON.stringify(fileObject['Todo'][i]['subject'] + ' | Id: ' + fileObject['Todo'][i]['id']);
            }
        }else{
            if(fileObject.Todo[i].check == true){
                output = output + '<br>&#10003 Subject: ' + JSON.stringify(fileObject['Todo'][i]['subject'] + ' | Id: ' + fileObject['Todo'][i]['id']);
            }
        }
    }
    if(output == null){
        return 'nothing is checked'
    }
    return output;    
}

//finfIndex
function findWithAttr(array, attr, value) {

    for(let i = 0; i < array.length; i ++) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
};
