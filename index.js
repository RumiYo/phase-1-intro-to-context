// Your code here
// const testArray = ['Hanako', 'Yamada', 'CEO', '50']
// const testArrays = [ ['Hanako', 'Yamada', 'CEO', '50'], ['Daisuke', 'Tanaka', 'Comedian', '100']]
// const testemployeeRecord = {
//     firstName: 'Hanako',
//     familyName: 'Yamada',
//     title: 'CEO',
//     payPerHour: '50',
//     timeInEvents:[
//         {
//         type:'TimeIn',
//         hour: '800',
//         date: '2023-01-01'
//         },
//         {
//             type:'TimeIn',
//             hour: '900',
//             date: '2023-01-02'
//             }

//     ], 
//     timeOutEvents: [
//         {
//             type:'TimeOut',
//             hour: '1800',
//             date: '2023-01-01'
//             },
//             {
//                 type:'TimeOut',
//                 hour: '2000',
//                 date: '2023-01-02'
//                 }
     
//     ],
// }
// const testemployeeRecords = [
//     {
//     firstName: 'Daisuke',
//     familyName: 'Tanaka',
//     title: 'CFO',
//     payPerHour: '20',
//     timeInEvents:[
//         {
//         type:'TimeIn',
//         hour: '800',
//         date: '2023-01-01'
//         },
//         {
//             type:'TimeIn',
//             hour: '1000',
//             date: '2023-01-02'
//             }

//     ], 
//     timeOutEvents: [
//         {
//             type:'TimeOut',
//             hour: '1900',
//             date: '2023-01-01'
//             },
//             {
//                 type:'TimeOut',
//                 hour: '2000',
//                 date: '2023-01-02'
//                 }
     
//     ],
// },
// {
//     firstName: 'Hanako',
//     familyName: 'Yamada',
//     title: 'CEO',
//     payPerHour: '50',
//     timeInEvents:[
//         {
//         type:'TimeIn',
//         hour: '800',
//         date: '2023-01-01'
//         },
//         {
//             type:'TimeIn',
//             hour: '900',
//             date: '2023-01-02'
//             }

//     ], 
//     timeOutEvents: [
//         {
//             type:'TimeOut',
//             hour: '1800',
//             date: '2023-01-01'
//             },
//             {
//                 type:'TimeOut',
//                 hour: '2000',
//                 date: '2023-01-02'
//                 }
     
//     ],
// }
// ]

const testTimeStamp = '2023-01-02'

function createEmployeeRecord (array){
    let employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [] , 
        timeOutEvents: []
    };
    return employeeRecord;
}

function createEmployeeRecords (arrays){
    let employeeRecords = [];
    for (const element of arrays){
        let employee = createEmployeeRecord(element);
        employeeRecords.push(employee);
    }
    return employeeRecords;
}

function createTimeInEvent(obj, timeStamp){
    let employeeRecord = obj;
    let time = {
        type:'TimeIn',
        hour: parseInt(timeStamp.slice(11,15)),
        date: timeStamp.slice(0,10)
    }
    employeeRecord.timeInEvents.push(time);
    return employeeRecord;
}

function createTimeOutEvent(obj, timeStamp){
    let employeeRecord = obj;
    let time = {
        type:'TimeOut',
        hour: parseInt(timeStamp.slice(11,15)),
        date: timeStamp.slice(0,10)
    }
    employeeRecord.timeOutEvents.push(time);
    return employeeRecord;
}

function hoursWorkedOnDate(obj, timeStamp){
    let timeInTime = '';
    let timeInArray =  obj.timeInEvents
    for (const id in timeInArray){
        if(timeInArray[id].date === timeStamp){
            timeInTime = timeInArray[id].hour;
        }
    }

    let timeOutTime = ''
    let timeOutArray =  obj.timeOutEvents
    for (const id in timeOutArray){
        if(timeOutArray[id].date === timeStamp){
            timeOutTime = timeOutArray[id].hour;
        }
    }

    let hoursWorked = (timeOutTime-timeInTime)/100;
    return hoursWorked;
}

function wagesEarnedOnDate(obj,timeStamp){
    const hoursWorked = hoursWorkedOnDate(obj,timeStamp);
    const hourlyPay = obj.payPerHour;
    const wagesEarned = hoursWorked*hourlyPay;
    return wagesEarned;
    console.log(wagesEarned)
}

function allWagesFor(obj){
    let timeInArray = obj.timeInEvents;
    let workedDates = [];
    for (const id in timeInArray){
        workedDates.push(timeInArray[id].date);
    }
    let wagesEachDay =[];
    for (const element of workedDates){
        const wageForTheDay = wagesEarnedOnDate(obj,element);
        wagesEachDay.push(wageForTheDay);
    }
    const totalWage = wagesEachDay.reduce((x,y) => x+y, 0);
    return totalWage;
}

function calculatePayroll(array){
    let allEmployeeWages = [];
    for (const element of array){
        const wageForEmployee = allWagesFor(element)
        allEmployeeWages.push(wageForEmployee)
    }
    const sumWages = allEmployeeWages.reduce((x,y) => x+y, 0);
    return sumWages;
}