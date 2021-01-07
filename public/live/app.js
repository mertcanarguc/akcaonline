$(function () {
    $(".tabItem").click(function () {
        let getId = $(this).data("id");
        $(".tabItem").removeClass("tabActive");
        $(this).addClass("tabActive");
        $(".tabContent").hide();
        $("#" + getId).show();
    });
});

if (!window.appSettings.isTeacher) {
    $(".managerScreen").html("");
    $(".controller").remove();
    $(".userList").css("height", "100%");
}

if (DetectRTC.browser.name == "Safari" || DetectRTC.browser.name == "Edge") {
    alert("Bu tarayıcı uygunsuz");
}

window.isMobil = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

let webRtc = new SimpleWebRTC({
    localVideoEl: window.appSettings.isTeacher ? 'managerScreen' : '',
    enableDataChannels: true,
    autoRequestMedia: true,
    nick: window.appSettings,
    debug: false,
    media: { audio: true, video: true }
});

window.webRtc = webRtc;

webRtc.on('connectionReady', function (sessionId) {
    webRtc.on('readyToCall', function () {
        webRtc.joinRoom(window.appSettings.room);
        webRtc.sendDirectlyToAll(window.appSettings.room, window.appSettings.guest.uuid, {});
        webRtc.sendDirectlyToAll(window.appSettings.room, window.appSettings.guest.uuid, {});
        webRtc.sendDirectlyToAll(window.appSettings.room, window.appSettings.guest.uuid, {});
        if (!window.appSettings.isTeacher) {
            webRtc.pause();
        }
    });
    webRtc.on('localMediaError', function (err) {
        console.log(err);
    });
    webRtc.on('videoAdded', function (video, peer) {
        if (peer && peer.pc) {
            if (peer.nick) {
                if (peer.nick.isTeacher) {
                    if (peer.type === "screen") {
                        $(".managerScreen > video").hide();
                        $(".managerScreen").append($(video).attr("video-type", peer.type));
                        $("video").attr("playsinline", true);
                        $("video").attr("muted", true);
                        $(".managerScreen > video").css("transform", "scaleX(-1)");
                    } else {

                        $(".managerScreen").append($(video).attr("video-type", peer.type));
                        $("video").attr("playsinline", true);
                        $("video").attr("muted", true);
                        $(".managerScreen > video").css("transform", "scaleX(-1)");
                    }
                }
                // $(".managerScreen > video").attr("controls", true);
                if (peer.type !== "screen") {
                    if (window.appSettings.isTeacher) {
                        $(".userList").append('<div data-id="container-' + peer.nick.guest.uuid + '" class="tabItemChild"> <div class="icon">CA</div> <div class="name">' + peer.nick.guest.name + ' ' + peer.nick.guest.surname + ' </div> <span></span> <div class="function"> MENÜ <div class="dropdown"> <button class="userVoice" data-id="' + peer.nick.guest.uuid + '">SES AÇ/KAPAT</button> <button class="userCamera" data-id="' + peer.nick.guest.uuid + '">KAMERA AÇ/KAPAT</button> </div> </div> </div>');
                    } else {
                        $(".userList").append('<div data-id="container-' + peer.nick.guest.uuid + '" class="tabItemChild"> <div class="icon">CA</div> <div class="name">' + peer.nick.guest.name + ' ' + peer.nick.guest.surname + ' </div> <span></span> </div>');
                    }

                }
            }
        }
    });
});

$(document).on("click", ".microphoneToggle", function () {
    let status = $(this).data("status");
    if (status === "mute") {
        $(this).data("status", "unmute");
        webRtc.mute();
        $(this).css("background", "red");
    }
    if (status === "unmute") {
        $(this).data("status", "mute");
        webRtc.unmute();
        $(this).css("background", "#607D8B");
    }
});

$(document).on("click", ".videoToggle", function () {
    let status = $(this).data("status");
    if (status === "mute") {
        $(this).data("status", "unmute");
        webRtc.pauseVideo();
        $(this).css("background", "red");
    }

    if (status === "unmute") {
        $(this).data("status", "mute");
        webRtc.resumeVideo();
        $(this).css("background", "#607D8B");
    }
});

$(document).on("click", ".screenToggle", function () {
    if (webRtc.getLocalScreen() !== undefined) {
        webRtc.stopScreenShare();
        $(this).css("background", "#607D8B");
    } else {
        webRtc.shareScreen((err) => {
            if (err) {
                $(this).css("background", "#607D8B");
            } else {
                $(this).css("background", "#4caf50");
                $(".screenToggle").hide();
            }
        });
    }
});

webRtc.on('localScreenStopped', function (video, peer) {
    $(".screenToggle").css("background", "#607D8B");
    $(".screenToggle").show();
    webRtc.stopScreenShare();
});

webRtc.on('videoRemoved', function (video, peer) {
    if (peer.pc.iceConnectionState === "closed") {
        if (peer.type === "screen") {
            $(".managerScreen > video").show();
        }
        $(video).remove();
        $('#guest_' + webRtc.getDomId(peer)).remove();
    }
});

$('textarea').keyup(function (e) {
    if (e.keyCode == 13) {
        $(this).trigger("enterKey");
    }
});

$('textarea').bind("enterKey", function (e) {
    if ($(this).val().length > 0) {
        let message = $("textarea").val().replace("\n", "").replace(/(<([^>]+)>)/ig, "");
        webRtc.sendDirectlyToAll(window.appSettings.room, window.appSettings.guest.uuid, {
            type: "chat",
            content: message
        });
        $(".userChatContainer").append('<div class="chat"> <span class="leftIcon" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" width="8" height="13"><path opacity=".13" fill="#0000000" d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path><path fill="currentColor" d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"></path></svg></span> <p> ' + message + ' </p> <div class="chatUser"> ' + window.appSettings.guest.name + ' ' + window.appSettings.guest.surname + ' </div> </div>');
        $("textarea").val("");
    }
});

webRtc.on('channelMessage', function (peer, label, data) {
    if (peer.nick.isTeacher) {
        $(".userChatContainer").append('<div class="chat"> <span class="leftIcon" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" width="8" height="13"><path opacity=".13" fill="#0000000" d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path><path fill="currentColor" d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"></path></svg></span> <p style="background: #213fad;"> ' + data.payload.content + ' </p> <div class="chatUser"> ' + peer.nick.guest.name + ' ' + peer.nick.guest.surname + ' </div> </div>');
    } else {
        $(".userChatContainer").append('<div class="chat"> <span class="leftIcon" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" width="8" height="13"><path opacity=".13" fill="#0000000" d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path><path fill="currentColor" d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"></path></svg></span> <p> ' + data.payload.content + ' </p> <div class="chatUser"> ' + peer.nick.guest.name + ' ' + peer.nick.guest.surname + ' </div> </div>');
    }
});

window.setInterval(function () {
    let elem = document.getElementById('userChatContainer');
    elem.scrollTop = elem.scrollHeight;
}, 1000);