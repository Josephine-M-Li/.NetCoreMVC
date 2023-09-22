var ws;

function InitWebSocket() {
    ws = new ReconnectingWebSocket("wss://localhost:7775/echo");
    ws.onmessage = function (event) {
        console.log(event);
        if (event.data.startsWith("hisGetBasicData")) {
            let txthisGetBasicData = event.data.replace("hisGetBasicData:", "");
            let strToByte = txthisGetBasicData.replace(/[^\x00-\xff]/g, "xx");
            let name = txthisGetBasicData
                .replace(strToByte.substring(0, 12), "")
                .replace(strToByte.substring(32, 72), "")
                .trim();
            //$("#PatInfoSection_Name").val(name);
            $("#PatInfoSection_IDNo").val(strToByte.substring(32, 42).trim());
            //$("#PatInfoSection_Tel").val(strToByte.substring(58, 72).trim());
        } else if (event.data.startsWith("其他開頭的回傳值")) {
            //
        } else if (event.data.length == 4) {
            alert(GetErrorMessage(event.data));
        }
    };
}

function ReadIC() {
    if (ws.readyState == "2" || ws.readyState == "3") {
        alert("健保卡讀取失敗!\r\n尚未與讀卡機控制軟體建立連線，請確認讀卡機控制軟體已開啟並重新整理此頁面。");
    } else if (ws.readyState == "0") {
        alert("健保卡讀取失敗!\r\n與讀卡機控制軟體建立連線中，請稍後再試。");
    } else {
        ws.send("OpenCom?COM=1");
        setTimeout(function () {
            ws.send("hisGetBasicData");
        }, 1000);
    }
}

function substr(str, len) {
    if (!str || !len) {
        return "";
    }
    var a = 0;
    var i = 0;
    var temp = "";
    for (i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 255) {
            a += 2;
        } else {
            a++;
        }
        if (a > len) {
            return temp;
        }
        temp += str.charAt(i);
    }
    return str;
}

function GetErrorMessage(ErrCode) {
    var msg = "";
    switch (ErrCode) {
        case "4000":
            msg = '[' + ErrCode + '] 讀卡機timeout';
            break;
        case "4012":
            msg = '[' + ErrCode + '] 未置入安全模組卡';
            break;
        case "4013":
            msg = '[' + ErrCode + '] 未置入健保IC卡';
            break;
        case "4014":
            msg = '[' + ErrCode + '] 未置入醫事人員卡';
            break;
        default:
            msg = '[' + ErrCode + ']';
            break;
    }
    return msg;
}