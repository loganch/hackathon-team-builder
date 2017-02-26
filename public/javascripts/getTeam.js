var common = document.getElementById('common');
var different = document.getElementById('different');


common.onclick = function() {
    var client = new HttpClient();
    client.get('/common', function(res) {
        var rows = JSON.parse(res);

        var business_students = [];
        var software_students = [];
        var hardware_students = [];

        // seperate each name into respective arrays based on category
        for (var i in rows) {
            if (rows[i].whatareyouinterestedinworkingon == 'Business') {
              business_students.push(rows[i].firstname + " " + rows[i].lastname);
            }
            if (rows[i].whatareyouinterestedinworkingon == 'Software') {
              software_students.push(rows[i].firstname + " " + rows[i].lastname);
            }
            if (rows[i].whatareyouinterestedinworkingon == 'Hardware') {
              hardware_students.push(rows[i].firstname + " " + rows[i].lastname);
            }
            console.log(rows[i].firstname);
        }

        num_teams = business_students.length + software_students.length + hardware_students.length;
        num_teams = Math.floor(num_teams/3);
        var team = [];
        var extras = [];

        for (var i = 0; i < num_teams; i++) {
          while (team.length < 3 && business_students.length + software_students.length + hardware_students.length > 0) {
            if (business_students.length > 0) team.push(business_students.pop());
            if (software_students.length > 0) team.push(software_students.pop());
            if (hardware_students.length > 0) team.push(software_students.pop());
          }
        }
        while (business_students.length + software_students.length + hardware_students.length > 0) {
          if (business_students.length > 0) extras.push(business_students.pop());
          if (software_students.length > 0) extras.push(software_students.pop());
          if (hardware_students.length > 0) extras.push(software_students.pop());
        }

        console.log(num_teams);

        console.log(business_students);
        console.log(software_students);
        console.log(hardware_students);
    });
};
different.onclick = function() {
    var client = new HttpClient();
    client.get('/different', function(res) {
        alert('Responded with ' + res);
    });
};

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    }
}
