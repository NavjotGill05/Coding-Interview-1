var employee = document.getElementById('employeeContainer');

//create variable request and assign XMLHttpRequest to it
var request = new XMLHttpRequest();
//now open connection using GET request to the given API(http://sandbox.bittsdevelopment.com/code1/fetchemployees.php)
request.open('GET', 'http://sandbox.bittsdevelopment.com/code1/fetchemployees.php', true);

//inside onload function we can access the JSON data
request.onload = function() {

    // use JSON.parse method to parse json into array of objects 
    var data = JSON.parse(this.response);

    //debug code to see the array of objects
    console.log(Object.values(data));
    //Object.values method returns array of objects and on that use foreach loop to iterate throush all the objects
    Object.values(data).forEach((value) => {

        //STEPS  to create new div for each employee
        //use createElement method to create div and assign class to it
        //append it to the parent element (employee)
        var employeeCard = document.createElement('div');
        employeeCard.setAttribute('class', 'employeeCard');
        employee.appendChild(employeeCard);

        //STEPS to print the CROWN ICON
        //if the value of emplyeefeatured is 1 then create i element using createElement method
        //and append it to the div of employee(employeeCard)
        if(value.employeeisfeatured === "1"){
            var crownIcon = document.createElement('i');
            crownIcon.setAttribute('class', 'fas fa-crown');
            employeeCard.appendChild(crownIcon);
        }

        //STEPS to print the IMAGE Of EMPLOYEE
        //create img elment using createElement method of DOM
        //store url of image in a variable
        //use replace method to replace the id with the "employeeId" that we get from the json object and store it in a new variable
        //then set the src of image and append the image element to the parent element(employeeCard)
        var employeeImage = document.createElement('img');
        var image = "http://sandbox.bittsdevelopment.com/code1/employeepics/id.jpg"; 
        var empImg = image.replace("id", value.employeeid);
        //debugging line to see the refined value of url
        console.log(empImg); 
        employeeImage.setAttribute('src', empImg);
        employeeCard.appendChild(employeeImage);

        //STEPS to get and print the EMPLOYEE NAME
        //create h2 to store the name of employee
        //access the values and concatenate them
        //append Name to the employeeCard
        var employeeName = document.createElement('h2');
        employeeName.innerHTML = (value.employeefname + " " + value.employeelname);
        employeeCard.appendChild(employeeName);

        //STEPS to get and print the BIO of EMPLOYEE
        //Same as employee name
        var employeeBio = document.createElement('p');
        employeeBio.innerHTML = (value.employeebio);
        employeeCard.appendChild(employeeBio);

        //STEPS to access, style and print the ROLES
        //loop through all the roles of individual employee
        //then create div to store that role and assign class and id to it using setAttribute method
        //set the color of role by fetching data from json object and assign the value to div
        //at the end append the child element(employeeRole) to the parent element(employeeCard)
        for(var role of value.roles){
            var employeeRole = document.createElement('div');
            employeeRole.setAttribute('class', 'empRole'); 
            employeeRole.setAttribute('id', role.roleid);
            employeeRole.setAttribute("style","background-color:" + role.rolecolor);
            employeeRole.innerHTML +=(role.rolename);  
            employeeCard.appendChild(employeeRole); 
        }
    });
}
//send the request to server
request.send();

//REFERENCE : https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/