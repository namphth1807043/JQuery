document.addEventListener('DOMContentLoaded', function () {
    loadSongs();
});

function loadSongs() {
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var listSong = JSON.parse(this.responseText);
            var content = '';
            for (var i = 0; i < listSong.length; i++) {
                content += '<div class="song-item">';
                content += '<div class="song-index">' + (i + 1) + '</div>';
                content += '<div class="song-thumbnail">';
                content += '<img src="' + listSong[i].thumbnail + '" alt="">';
                content += '</div>';
                content += '<div class="song-infor">';
                content += '<div class="song-name">' + listSong[i].name + '</div>';
                content += '<div class="song-singer">' + listSong[i].singer + '</div>';
                content += '</div>';
                content += '<div class="song-control" onclick="playSong(\'' + listSong[i].link + '\', \'' + listSong[i].name + '\', \'' + listSong[i].singer + '\')">Play</div>';
                content += '<div class="song-control"><a href="song-detail.html?id=' + listSong[i].id + '">Detail</a></div>';
                content += '</div>';
            }
            document.getElementById('list-song').innerHTML = content;
        } else if (this.readyState == 4 && (this.status == 401 || this.status == 403)) {
            alert('This page required logged in to continue!')
            window.location.href = "login.html";
        }
    }
    xmlHttpRequest.open('GET', MY_SONG_API, true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Basic ' + localStorage.getItem('token-key'));
    xmlHttpRequest.send();
}

function playSong(link, name, singer) {
    document.getElementById('my-mp3').src = link;
    document.getElementById('current-play-title').innerHTML = 'Current playing: ' + name + " - " + singer;
}


