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
          var random = Math.floor(Math.random() * (10));
          if (rows[i].whatareyouinterestedinworkingon == 'Business') {
            if (random % 2 == 0) business_students.push(rows[i].firstname + " " + rows[i].lastname);
            if (random % 2 != 0) business_students.unshift(rows[i].firstname + " " + rows[i].lastname);
          }
          if (rows[i].whatareyouinterestedinworkingon == 'Software') {
            if (random % 2 == 0) software_students.push(rows[i].firstname + " " + rows[i].lastname);
            if (random % 2 != 0) software_students.unshift(rows[i].firstname + " " + rows[i].lastname);
          }
          if (rows[i].whatareyouinterestedinworkingon == 'Hardware') {
            if (random % 2 == 0) hardware_students.push(rows[i].firstname + " " + rows[i].lastname);
            if (random % 2 != 0) hardware_students.unshift(rows[i].firstname + " " + rows[i].lastname);
          }
        }
        console.log(business_students);
        console.log(software_students);
        console.log(hardware_students);

        num_teams = business_students.length + software_students.length + hardware_students.length;
        num_teams = Math.floor(num_teams/3);
        var team = [];
        var extras = [];

        for (var i = 0; i < num_teams; i++) {
          team = [];
          while (team.length < 3 && business_students.length + software_students.length + hardware_students.length > 0) {
            if (business_students.length > 0 && team.length != 3) team.push([business_students.pop(), "Business"]);
            if (software_students.length > 0 && team.length != 3) team.push([software_students.pop(), "Software"]);
            if (hardware_students.length > 0 && team.length != 3) team.push([hardware_students.pop(), "Hardware"]);
          }
          console.log(team);
        }
        while (business_students.length + software_students.length + hardware_students.length > 0) {
          if (business_students.length > 0) extras.push([business_students.pop(), "Business"]);
          if (software_students.length > 0) extras.push([software_students.pop(), "Software"]);
          if (hardware_students.length > 0) extras.push([hardware_students.pop(), "Hardware"]);
        }
        console.log(extras);
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
