
function createEmployeeRecord(employeeRecordArray) {
    let employee = {
        firstName: employeeRecordArray[0],
        familyName: employeeRecordArray[1],
        title: employeeRecordArray[2],
        payPerHour: employeeRecordArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}


function createEmployeeRecords(employeeRecordArrays) {
    return employeeRecordArrays.map(record => {
        return createEmployeeRecord(record)
    })
}


function createTimeInEvent(dateStamp) {
    let newAttributes = {
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    }
    this.timeInEvents.push(newAttributes)
    return this
}


function createTimeOutEvent(dateStamp) {
    let newAttributes = {
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    }
    this.timeOutEvents.push(newAttributes)
    return this
}


function hoursWorkedOnDate(dateStamp) {
    let timeIn = this.timeInEvents.find(record => record.date === dateStamp);
    let timeOut = this.timeOutEvents.find(record => record.date === dateStamp);
    let hoursWorked = (timeOut.hour - timeIn.hour) / 100
    return hoursWorked
}


function wagesEarnedOnDate(dateStamp) {
    let payOwed = hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour
    return payOwed
}


function allWagesFor() {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)
    return payable
}

function findEmployeeByFirstName(srcArray, firstNameString) {
    return srcArray.find(record => record.firstName === firstNameString)
}

function calculatePayroll(employeeRecordArray) {
    return employeeRecordArray.reduce(function (acc, current) {
        return acc + allWagesFor.call(current)
    }, 0)
}