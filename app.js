function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    let cname = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

function updateLastLogin() {
    const lastLoginElement = document.getElementById("last-login");
    const lastLogin = getCookie("lastLogin");

    if (lastLogin !== "") {
        const date = new Date(lastLogin);
        const options = {
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            timeZoneName: 'short'
        };
        lastLoginElement.textContent = "Last login: " + date.toLocaleString('en-US', options);
    } else {
        lastLoginElement.textContent = "First time login";
    }

    const now = new Date();
    setCookie("lastLogin", now.toString(), 365);
}

function toggleCursor() {
    const cursor = document.querySelector('.blinking-cursor');
    cursor.style.visibility = (cursor.style.visibility === 'visible') ? 'hidden' : 'visible';
}

setInterval(toggleCursor, 500);
window.onload = updateLastLogin;