var common = document.getElementById('common');
var different = document.getElementById('different');


different.onclick = function() {
    clearTeams();
    different.classList.add('is-loading');
    var client = new HttpClient();
    client.get('/different', function(res) {
        var rows = JSON.parse(res);

        var business_students = [];
        var software_students = [];
        var hardware_students = [];
        var extras = [];

        // seperate each name into respective arrays based on category
        console.log("TEST: Brought in " + rows.length);
        for (var i in rows) {
            // if (rows[i].whatareyouinterestedinworkingon == 'Business') {
            //     business_students.push(rows[i].firstname + " " + rows[i].lastname);
            // }
            // if (rows[i].whatareyouinterestedinworkingon == 'Software') {
            //     software_students.push(rows[i].firstname + " " + rows[i].lastname);
            // }
            // if (rows[i].whatareyouinterestedinworkingon == 'Hardware') {
            //     hardware_students.push(rows[i].firstname + " " + rows[i].lastname);
            // }
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
        num_teams = Math.floor(num_teams / 3);
        var team = [];


        for (var i = 0; i < num_teams; i++) {
            team = [];
            while (team.length < 3 && business_students.length + software_students.length + hardware_students.length > 0) {
                if (business_students.length > 0 && team.length != 3) team.push([business_students.pop(), "Business"]);
                if (software_students.length > 0 && team.length != 3) team.push([software_students.pop(), "Software"]);
                if (hardware_students.length > 0 && team.length != 3) team.push([hardware_students.pop(), "Hardware"]);
            }
            console.log(team);
            makeCards(team);
            different.classList.remove('is-loading');
        }
        while (business_students.length + software_students.length + hardware_students.length > 0) {
            if (business_students.length > 0) extras.push([business_students.pop(), "Business"]);
            if (software_students.length > 0) extras.push([software_students.pop(), "Software"]);
            if (hardware_students.length > 0) extras.push([hardware_students.pop(), "Hardware"]);
        }
        console.log(extras);
    });
};
common.onclick = function() {
    clearTeams();
    common.classList.add('is-loading');
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
        num_teams = Math.floor(num_teams / 3);
        var team = [];
        var extras = [];

        for (var i = 0; i < num_teams; i++) {
            team = [];
            while (team.length < 3 && business_students.length + software_students.length + hardware_students.length >= 3) {
                while (business_students.length > 0 && team.length != 3) team.push([business_students.pop(), "Business"]);
                while (software_students.length > 0 && team.length != 3) team.push([software_students.pop(), "Software"]);
                while (hardware_students.length > 0 && team.length != 3) team.push([hardware_students.pop(), "Hardware"]);
            }
            console.log(team);
            makeCards(team);
            common.classList.remove('is-loading');
        }
        while (business_students.length + software_students.length + hardware_students.length > 0) {
            if (business_students.length > 0) extras.push([business_students.pop(), "Business"]);
            if (software_students.length > 0) extras.push([software_students.pop(), "Software"]);
            if (hardware_students.length > 0) extras.push([hardware_students.pop(), "Hardware"]);
        }
        console.log(extras);
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