const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var dssv = [];

// declare input 
const id = document.getElementById('txtMaSV');
const name = document.getElementById('txtTenSV');
const mail = document.getElementById('txtEmail');
const pass = document.getElementById('txtPass');
const math = document.getElementById('txtDiemToan');
const phy = document.getElementById('txtDiemLy');
const chem = document.getElementById('txtDiemHoa');
const search = document.getElementById('txtSearch');

// declare button
const add = $('.btn.btn-success.addSv');
const reset = $('.btn.btn-dark.rssv');
const update = $('.btn.btn-info.usv');
const searchBtn = $('.btn.btn-primary');

// declare output 
const output = $('#tbodySinhVien');


//add more student on the list
function addStudent(){
    var isSv = id.value;
    var nameSv = name.value;
    var mailSv = mail.value;
    var passSv = pass.value;
    var mathSv = math.value * 1;
    var phySv = phy.value * 1;
    var chemSv = chem.value * 1;
    if(findStudent(`${isSv}`) == undefined){
        var sv = new SV(isSv, nameSv, mailSv, passSv, mathSv, phySv, chemSv);
        dssv.push(sv);
        render(dssv);
        saveData();
    }
}

// save data in local storage
var dssvLocal = localStorage.getItem('data');
var dssvRaw = JSON.parse(dssvLocal);
if(dssvRaw){
    dssv = dssvRaw.map((item) => new SV(item.idsv, item.namesv, item.mailsv, item.passsv, item.mathsv, item.physv, item.chemsv));
    render(dssv);
}

function saveData(){
    var rawdata = JSON.stringify(dssv);
    localStorage.setItem('data', rawdata);    
}

// delete the student info
function dele(student){
    var indexStudent = findStudent(student);
    if(indexStudent != -1){
        dssv.splice(indexStudent, 1);
        render(dssv);
        saveData();
    }
}

// edit student 
function edit(student){
    var index = findStudent(student);
    var isSv = id.value;
    var nameSv = name.value;
    var mailSv = mail.value;
    var passSv = pass.value;
    var mathSv = math.value * 1;
    var phySv = phy.value * 1;
    var chemSv = chem.value * 1;
    if(findStudent(`${isSv}`) == undefined){
        dssv[index] = new SV(isSv, nameSv, mailSv, passSv, mathSv, phySv, chemSv);
    }
    render(dssv);
}

// update info
function updateInf(){
    var idSv = id.value;
    var nameSv = name.value;
    var mailSv = mail.value;
    var passSv = pass.value;
    var mathSv = math.value * 1;
    var phySv = phy.value * 1;
    var chemSv = chem.value * 1;
    var index = findStudent(`${idSv}`);
    if(index != undefined){
        dssv[index] = new SV(idSv, nameSv, mailSv, passSv, mathSv, phySv, chemSv);
        render(dssv);
        saveData();
    }
}

// find student by name
function findNameStudent(){
    var name = search.value;
    var dsLenght = dssv.length;
    var listName = []
    if(name != ''){
        for(i = 0; i < dsLenght; i++){
            if(name == dssv[i].namesv){
                listName.push(i);
            }
        }
    }
    return listName;
}

// find student with id 
function findStudent(id){
    var index;
    var dsLenght = dssv.length;
    for(i = 0; i < dsLenght; i++){
        if(id == dssv[i].idsv){
            index = i;
        }
    }
    return index;
}


//reset list
function resetList(){
    dssv = [];
    saveData();
    render(dssv);
}

//render the result on the screen
function render(value){
    var array = Array.from(value);
    var title = '';
    title += array.map((item) =>  `<tr>
    <td>${item.idsv}</td>
    <td>${item.namesv}</td>
    <td>${item.mailsv}</td>
    <td>${item.getAverage()}</td>
    <td>
    <button type="button" onclick = "dele('${item.idsv}')" class="btn btn-danger">xóa</button>
    <button type="button" onclick = "edit('${item.idsv}')" class="btn btn-success">sửa</button></td>
</tr>`);
    output.innerHTML = title;        
}

// onclick even
add.onclick = function(){addStudent()};
reset.onclick = function(){resetList()};
update.onclick = function(){updateInf()};
searchBtn.onclick = function(){
    var studentList = findNameStudent();
    if(studentList.length > 0){
        dssv = studentList.map(function(item){
            return dssv[item];
        })
        render(dssv);
        saveData();
    }
}