var common = document.getElementById('common');
var different = document.getElementById('different');


common.onclick = function() {
    var client = new HttpClient();
    client.get('/common', function(res) {
        var rows = JSON.parse(res);
        for (var i in rows) {
            console.log(rows[i].firstname);
        }
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