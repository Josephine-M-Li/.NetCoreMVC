var BackendWebSiteRoot = "";
var loadingSource = "";
var Utility = Utility || {}; //建立全域物件，若未定義，則預設空物件。
Utility.Page = {
    BlockUI: function (message) {
        var browerType = _Private.Common.GetBrowserType();
        var loadingMessage = '<img src="' + loadingSource + 'loading.svg"/>';
        if (browerType == "IE") {
            loadingMessage = '<img src="' + loadingSource + 'loading.gif"/>';
        }
        $.blockUI({
            message: loadingMessage + '<h3>' + message + '</h3>',
            css: {
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            },
            baseZ: 2000
        });
    },
    SetContentPage: function (page) { 
        $("#ContentPage").html(page);
        Utility.Page.Initial(); //初始化View
    },
    Initial: function () {
        //此目的為讓顯示驗證失敗的錯誤訊息
        $.validator.unobtrusive.parse("form");

        ////月曆元件
        //$(document).find('.date:not([readonly])').attr("data-date-format", "YYY/MM/DD").datetimepicker({
        //    language: 'zh-TW',
        //    pickTime: false,
        //    showTodayButton: true,
        //    showClear: true,
        //    showClose: true,
        //    maxDate: new Date(getTomorrowAD())
        //});
        //$(document).find('.daterangs:not([readonly])').attr("data-date-format", "YYY/MM/DD").datetimepicker({
        //    language: 'zh-TW',
        //    pickTime: false,
        //    showTodayButton: true,
        //    showClear: true,
        //    showClose: true,
        //    maxDate: new Date(getTodayAD()),
        //}).unbind('dp.change').on("dp.change", function (e) {
        //    var sdt = e.date;
        //    $(this).siblings('.daterange').data("DateTimePicker").setMinDate(sdt);
        //    var dt = $(this).siblings('.daterange').data("DateTimePicker");
        //    if (dt < sdt) { $(this).siblings('.daterange').data("DateTimePicker").setDate(sdt); }
        //});

        //$(document).find('.daterange:not([readonly])').attr("data-date-format", "YYY/MM/DD").datetimepicker({
        //    language: 'zh-TW',
        //    pickTime: false,
        //    showTodayButton: true,
        //    showClear: true,
        //    showClose: true,
        //    maxDate: new Date(getTomorrowAD()),
        //    useCurrent: false
        //}).unbind('dp.change').on("dp.change", function (e) {
        //    var edt = e.date;
        //    $(this).siblings('.daterangs').data("DateTimePicker").setMaxDate(edt);
        //    var dt = $(this).siblings('.daterangs').data("DateTimePicker");
        //    if (dt > edt) { $(this).siblings('.daterangs').data("DateTimePicker").setDate(edt); }
        //});

        //$(document).find('.dateall:not([readonly])').attr("data-date-format", "YYY/MM/DD").datetimepicker({
        //    language: 'zh-TW',
        //    pickTime: false,
        //    showTodayButton: true,
        //    showClear: true,
        //    showClose: true
        //});

        //$(document).find('.dateallrangs:not([readonly])').attr("data-date-format", "YYY/MM/DD").datetimepicker({
        //    language: 'zh-TW',
        //    pickTime: false,
        //    showTodayButton: true,
        //    showClear: true,
        //    showClose: true
        //}).on("dp.change", function (e) {
        //    var sdt = e.date;
        //    $(this).siblings('.dateallrange').data("DateTimePicker").setMinDate(sdt);
        //    var dt = $(this).siblings('.dateallrange').data("DateTimePicker");
        //    if (dt < sdt) { $(this).siblings('.dateallrange').data("DateTimePicker").setDate(sdt); }
        //});

        //$(document).find('.dateallrange:not([readonly])').attr("data-date-format", "YYY/MM/DD").datetimepicker({
        //    language: 'zh-TW',
        //    pickTime: false,
        //    showTodayButton: true,
        //    showClear: true,
        //    showClose: true
        //}).on("dp.change", function (e) {
        //    var edt = e.date;
        //    $(this).siblings('.dateallrangs').data("DateTimePicker").setMaxDate(edt);
        //    var dt = $(this).siblings('.dateallrangs').data("DateTimePicker");
        //    if (dt > edt) { $(this).siblings('.dateallrangs').data("DateTimePicker").setDate(edt); }
        //});

        //$(document).find('.time:not([readonly])').attr("data-date-format", "HH:mm").datetimepicker({
        //    language: 'zh-TW',
        //    pick12HourFormat: true,
        //    pickDate: false,
        //    pickSeconds: true
        //});

    },
    RedirectToLogin: function (page, loginPage) {
        if (page && (typeof page === 'string') && page.indexOf('value="LoginPage"') > 0) {
            Utility.Modal.OpenModalOk("逾時", "登入逾時，將導回登入頁面!", function () {
                window.location = loginPage;
            });
            return true;
        } else {
            return false;
        }
    },
    OpenReport: function (data) {
        window.open(BackendWebSiteRoot + "Report/ReportViewerWebForm.aspx?data=" + data, "",
            "location=no,menubar=no,status=no,toolbar=no,resizable=yes,scrollbars=yes");
    },
    ShowReportInFrame: function (data) {
        var Load = function () {
            Utility.Page.BlockUI(Message["Content.Processing"]);
            $('#ReportViewerFrame').attr("src", BackendWebSiteRoot + "Report/ReportViewerWebForm.aspx?data=" + data)
        }
        setTimeout(Load, 100);
    }
};

Utility.Modal = {
    OpenModalOk: function (title, content, okCallBack, parentIModalId) {
        _Private.Common.OpenModalBase('', title, '', content, true, okCallBack, false, okCallBack, parentIModalId);
    },
    OpenModalOkCancel: function (title, content, okCallBack, cancelCallBack, parentIModalId) {
        _Private.Common.OpenModalBase('', title, '', content, true, okCallBack, true, cancelCallBack, parentIModalId);
    },
    OpenView: function (id, title, viewContent, parentIModalId) {
        _Private.Common.OpenModalBase(id, title, '', viewContent, false, null, false, null, parentIModalId);
    },
    OpenSmallView: function (id, title, viewContent, parentIModalId) {
        _Private.Common.OpenModalBase(id, title, 'sm', viewContent, false, null, false, null, parentIModalId);
    },
    OpenLargeView: function (id, title, viewContent, parentIModalId) {
        _Private.Common.OpenModalBase(id, title, 'lg', viewContent, false, null, false, null, parentIModalId);
    },
    OpenExtraLargeView: function (id, title, viewContent, parentIModalId, triggeredElement) {
        _Private.Common.OpenModalBase(id, title, 'xl', viewContent, false, null, false, null, parentIModalId, triggeredElement);
    },
    OpenFullScreenView: function (id, title, viewContent, parentIModalId, triggeredElement) {
        _Private.Common.OpenModalBase(id, title, 'full', viewContent, false, null, false, null, parentIModalId, triggeredElement);
    },
    CloseView: function (id) {
        if (id && typeof id !== 'undefined') {
            try {
                $('#' + id).modal('hide');
            } catch (e) { }
        }
    }
}

Utility.Ajax = {
    Post: function (url, args, callbackFunc, isAsync) {
        _Private.Common.AjaxBase(url, args, callbackFunc, isAsync, 'POST');
    },
    Get: function (url, args, callbackFunc, isAsync) {
        _Private.Common.AjaxBase(url, args, callbackFunc, isAsync, 'GET');
    },
    Export: function (url, args, callbackFunc, parentIModalId) {
        Utility.Modal.OpenModalOkCancel("匯出", '請問是否確定要匯出?',
            function () {
                Utility.Ajax.Post(url, args, function (data) {
                    if (data.Status) {
                        Utility.Toastr.Success(Message["Content.Exporting"]);
                        window.location = url + "?fileName=" + data.Data;
                        if (typeof callbackFunc !== 'undefined' && $.isFunction(callbackFunc)) {
                            callbackFunc();
                        }
                    } else {
                        if (data.Message) {
                            Utility.Toastr.Erorr(Message["Content.ExportFail"] + "<br/>" + data.Message);
                        } else {
                            Utility.Toastr.Erorr(Message["Content.ExportFail"]);
                        }
                    }
                });
            }
            , null, parentIModalId);
    }
}

Utility.Toastr = {
    Info: function (title, context) {
        _Private.Common.ShowToastrBase("info", title, context);
    },
    Success: function (title, context) {
        _Private.Common.ShowToastrBase("success", title, context);
    },
    Warning: function (title, context) {
        _Private.Common.ShowToastrBase("warn", title, context);
    },
    Erorr: function (title, context) {
        _Private.Common.ShowToastrBase("error", title, context);
    }
};

Utility.JsGrid = {
    CreateItemTemplate: function (itemTemplate, width) {
        if (!width) {
            width = "40";
        }
        var _itemTemplate = {
            title: "操作",
            align: "center",
            width: width,
            itemTemplate: itemTemplate
        };

        return _itemTemplate;
    },
    CustomButton: function (clickEvent, title) {
        var btn = $('<button/>').attr('type', 'button')
            .addClass("btn btn-outline-primary btn-sm")
            .text(title)
            .on('click', clickEvent);
        return btn;
    },
    DeleteButton: function (clickEvent, title) {
        if (title == undefined) {
            title = "刪除";
        }
        var btn = $('<i>').addClass("jsgrid-fa-button fas fa-trash-alt")
            .attr('title', title)
            .on('click', clickEvent);
        return btn;
    },
    UserButton: function (clickEvent, title) {
        var btn = $('<i>').addClass("jsgrid-fa-button fas fa-user")
            .attr('title', title)
            .on('click', clickEvent);
        return btn;
    },
    UserTagButton: function (clickEvent, title) {
        var btn = $('<i>').addClass("jsgrid-fa-button fas fa-user-tag")
            .attr('title', title)
            .on('click', clickEvent);
        return btn;
    },
    ContactViewButton: function (clickEvent, title) {
        var btn = $('<i>').addClass("jsgrid-fa-button fas fa-people-arrows")
            .attr('title', title)
            .on('click', clickEvent);
        return btn;
    },
    ListButton: function (clickEvent, title) {
        var btn = $('<i>').addClass("jsgrid-fa-button fas fa-list")
            .attr('title', title)
            .on('click', clickEvent);
        return btn;
    },
    EditButton: function (clickEvent, title) {
        if (title == undefined) {
            title = "編輯";
        }
        var btn = $('<i>').addClass("jsgrid-fa-button far fa-edit")
            .attr('title', title)
            .on('click', clickEvent);
        return btn;
    },
    DetailButton: function (clickEvent) {
        var btn = $('<i>').addClass("jsgrid-fa-button far fa-file-alt")
            .attr('title', "明細")
            .on('click', clickEvent);
        return btn;
    },
    LoadData: function (filter, frmId, url, showNotFound) {
        debugger;
        var result = $.Deferred();
        var frm = $("#" + frmId);
        if (typeof showNotFound == 'undefined' || showNotFound == null) {
            showNotFound = true;
        }
        var browerType = _Private.Common.GetBrowserType();
        if (browerType == "IE") {
            frm.find('#Paging_PageIndex').val(filter.pageIndex);
            frm.find('#Paging_PageSize').val(filter.pageSize);
        } else {
            frm.find(Paging_PageIndex).val(filter.pageIndex);
            frm.find(Paging_PageSize).val(filter.pageSize);
        }

        $.ajax({
            'type': 'POST',
            'url': url,
            'data': frm.serialize(),
            'async': true,
            'success': function (data) {
                //判斷回傳的View，是否需要回到到登入頁面
                if (!Utility.Page.RedirectToLogin(data, $("#LoginUrl").val())) {
                    if (data.Status) {
                        if (data.Data.length == 0 && showNotFound == true) {
                            Utility.Toastr.Warning(Message['Content.QueryNotFound']);
                        }
                        result.resolve({
                            status: data.Status,
                            message: data.Message,
                            data: data.Data,
                            itemsCount: data.ItemsCount
                        });
                        if (data.Message != "" && data.Message != null) Utility.Toastr.Info(data.Message);
                    } else {
                        result.resolve({
                            data: [],
                            itemsCount: 0
                        });
                        Utility.Toastr.Erorr(data.Message);
                    }
                }
            },
            'error': function (data) {
                ajaxError(data);
                result.resolve({
                    data: [],
                    itemsCount: 0
                });
            }
        });
        return result.promise();
    },
    LoadDataSimple: function (filter, url, data, showNotFound) {
        debugger;
        var result = $.Deferred();
        if (typeof showNotFound == 'undefined' || showNotFound == null) {
            showNotFound = true;
        }
        //var browerType = _Private.Common.GetBrowserType();
        //if (browerType == "IE") {
        //    frm.find('#Paging_PageIndex').val(filter.pageIndex);
        //    frm.find('#Paging_PageSize').val(filter.pageSize);
        //} else {
        //    frm.find(Paging_PageIndex).val(filter.pageIndex);
        //    frm.find(Paging_PageSize).val(filter.pageSize);
        //}

        $.ajax({
            'type': 'POST',
            'url': url,
            'data': data,
            'async': true,
            'success': function (data) { 
                //判斷回傳的View，是否需要回到到登入頁面
                if (!Utility.Page.RedirectToLogin(data, $("#LoginUrl").val())) {
                    if (data.Status) {
                        if (data.Data.length == 0 && showNotFound == true) {
                            Utility.Toastr.Warning(Message['Content.QueryNotFound']);
                        }
                        result.resolve({
                            status: data.Status,
                            message: data.Message,
                            data: data.Data,
                            itemsCount: data.ItemsCount
                        });
                        if (data.Message != "" && data.Message != null) Utility.Toastr.Info(data.Message);
                    } else {
                        result.resolve({
                            data: [],
                            itemsCount: 0
                        });
                        Utility.Toastr.Erorr(data.Message);
                    }
                }
            },
            'error': function (data) {
                ajaxError(data);
                result.resolve({
                    data: [],
                    itemsCount: 0
                });
            }
        });
        return result.promise();
    }
}

Utility.DateTime = {
    DateTimePicker: function (id) {
        $("#" + id).datetimepicker({
            format: 'L LTS'
        });
    },
    TimePicker: function (id) {
        $("#" + id).datetimepicker({
            format: 'LTS'
        });
    },
    Between: function (startId, endId) {
        $("#" + startId).on("change.datetimepicker", function (e) {
            $('#' + endId).datetimepicker('minDate', e.date);
        });
        $("#" + endId).on("change.datetimepicker", function (e) {
            $('#' + startId).datetimepicker('maxDate', e.date);
        });
    }
}

Utility.FileUpload = {
    Initial: function () {
        bsCustomFileInput.init();
    }
}

Utility.Select = {
    DualListBox: function (id, showFilter) {
        if (typeof showFilter != "boolean") {
            showFilter = false;
        }
        $("#" + id).bootstrapDualListbox({
            preserveSelectionOnMoveL: 'moved',
            moveOnSelect: false,
            filterTextClear: '顯示全部',
            filterPlaceHolder: '過濾搜尋',
            moveSelectedLabel: "新增",
            moveAllLabel: '新增全部',
            removeSelectedLabel: "移除",
            removeAllLabel: '移除全部',
            infoText: '共{0}筆',
            infoTextFiltered: '搜尋到{0}筆 ,共{1}筆',
            infoTextEmpty: '列表為空',
            showFilterInputs: showFilter
        });
    }
}

var _triggeredElement
var _Private = _Private || {};
_Private.Common = {
    GetBrowserType: function () {
        var explorer = window.navigator.userAgent,
            compare = function (s) { return (explorer.indexOf(s) >= 0); },
            ie11 = (function () { return ("ActiveXObject" in window) })();
        if (compare("MSIE") || ie11) { return 'IE'; }
        else if (compare("Firefox") && !ie11) { return 'Firefox'; }
        else if (compare("Chrome") && !ie11) {
            if (explorer.indexOf("Edge") > -1) {
                return 'IE';
            } else {
                return 'Chrome';
            }
        }
        else if (compare("Opera") && !ie11) { return 'Opera'; }
        else if (compare("Safari") && !ie11) { return 'Safari'; }
    },
    AjaxBase: function (url, args, callbackFunc, isAsync, ajaxType) {
        if (ajaxType !== undefined && ajaxType != null) {
            ajaxType = ajaxType.toUpperCase();
        } else {
            ajaxType = 'POST';
        }
        if (typeof isAsync !== "boolean") {
            isAsync = true;
        }
        if (typeof args == 'undefined' || args == null) {
            args = {};
        }
        $.ajax({
            'type': ajaxType,
            'url': url,
            'data': args,
            'async': isAsync,
            'success': function (data) {
                //判斷回傳的View，是否需要回到到登入頁面
                if (!Utility.Page.RedirectToLogin(data, $("#LoginUrl").val())) {
                    if (typeof callbackFunc !== 'undefined' && $.isFunction(callbackFunc)) {
                        callbackFunc(data);
                    }
                }
            },
            'error': ajaxError
        });
    },
    FtoH: function (text) {
        var result = "";
        for (i = 0; i <= text.length - 1; i++) {
            if (text.charCodeAt(i) == 12288) {
                result += " ";
            }
            else {
                if (text.charCodeAt(i) > 65280 && text.charCodeAt(i) < 65375) {
                    result += String.fromCharCode(text.charCodeAt(i) - 65248);
                }
                else {
                    result += String.fromCharCode(text.charCodeAt(i));
                }
            }
        }
        return result;
    },
    ConvertInput: function (inputs) {
        var result = inputs.val();
        var inputID = inputs.attr("id");
        if (/^cke./.test(inputID)) {
            return;
        }
        //全形轉半形
        //result = _Private.Common.FtoH(result);    //因為會有輸入全形逗號問題，這邊會自動轉成半形，所以先註解掉。
        //自動濾空白&濾Tab
        if (inputID != undefined) {
            result = $.trim(result);
            inputs.val(result);
            inputs.valid();
        }
    },
    OpenModalBase: function (id, title, size, content, showOkBtn, okCallBack, showCancelBtn, cancelCallBack, parentIModalId, triggeredElement) {
        if (parentIModalId && parentIModalId != "") {
            $("#" + parentIModalId).hide();
        }

        if (id && typeof id !== 'undefined') {
            $('#' + id).remove();
        }
        if (id == '') {
            id = GetUid();
        }
        modalSize = "";

        if (size == "sm") {
            modalSize = " modal-sm";
        } else if (size == "lg") {
            modalSize = " modal-lg";
        } else if (size == "xl") {
            modalSize = " modal-xl";
        } else if (size == 'full') {
            modalSize = " modal-fullscreen";
        }

        var dialogDiv = $('<div tabindex="-1" id="' + id + '"></div>').addClass('modal fade');
        var modalDialog = $('<div />').addClass('modal-dialog' + modalSize).appendTo(dialogDiv);
        var modalContent = $('<div />').addClass('modal-content').appendTo(modalDialog);
        var header = $('<div />').addClass('modal-header').appendTo(modalContent);
        var body = $('<div />').addClass('modal-body').appendTo(modalContent);
        var footer = $('<div />').addClass('modal-footer justify-content-end')
            .appendTo(modalContent);
        $('<h5 />').addClass('modal-title').text(title).appendTo(header);
        var closeBtn = $('<button />').addClass('close').attr('data-dismiss', 'modal')
            .attr('aria-label', 'Close').appendTo(header);
        $('<span />').attr('aria-hidden', 'true').html('&times;').appendTo(closeBtn);

        if (showOkBtn) {
            var okBtn = $('<button />').addClass('btn btn-default').attr('data-dismiss', 'modal')
                .text('確定').appendTo(footer);
            if (typeof okCallBack !== 'undefined' && $.isFunction(okCallBack)) {
                okBtn.bind('click', okCallBack);
            }
        }

        if (showCancelBtn) {
            var cancelBtn = $('<button />').addClass('btn btn-default')
                .attr('data-dismiss', 'modal').text('取消').appendTo(footer);

            if (typeof cancelCallBack !== 'undefined' && $.isFunction(cancelCallBack)) {
                cancelBtn.bind('click', cancelCallBack);
            }
        }

        if (typeof cancelCallBack !== 'undefined' && $.isFunction(cancelCallBack)) {
            closeBtn.bind('click', cancelCallBack);
        }

        dialogDiv.modal(
            {
                backdrop: 'static', //空白處不關閉
                keyboard: false      //按esc不關閉
            })
        //Modal顯示完後的觸發事件
        dialogDiv.on('shown.bs.modal', function (e) {
            _triggeredElement = triggeredElement;
            //等modal顯示後，再把html塞入，這樣才會執行到html內的script
            body.html(content);
            dialogDiv.overlayScrollbars({ className: "os-theme-light" });
        });
        dialogDiv.on('hidden.bs.modal', function (e) {
            dialogDiv.remove();
            if (parentIModalId && parentIModalId != "") {
                $("#" + parentIModalId).show();
            }
        });
    },
    ShowToastrBase: function (type, title, context) {
        toastr.options = {
            "closeButton": true,                // 顯示關閉按鈕
            "debug": false,                      // 除錯
            "newestOnTop": false,                // 最新一筆顯示在最上面
            "progressBar": true,                 // 顯示隱藏時間進度條
            "positionClass": "toast-top-full-width", // 位置的類別
            "preventDuplicates": false,          // 隱藏重覆訊息
            "onclick": null,                     // 當點選提示訊息時，則執行此函式
            "showDuration": "300",               // 顯示時間(單位: 毫秒)
            "hideDuration": "1000",              // 隱藏時間(單位: 毫秒)
            "timeOut": "3000",                   // 當超過此設定時間時，則隱藏提示訊息(單位: 毫秒)
            "extendedTimeOut": "3000",           // 當使用者觸碰到提示訊息時，離開後超過此設定時間則隱藏提示訊息(單位: 毫秒)
            "showEasing": "swing",               // 顯示動畫時間曲線
            "hideEasing": "linear",              // 隱藏動畫時間曲線
            "showMethod": "fadeIn",              // 顯示動畫效果
            "hideMethod": "fadeOut"              // 隱藏動畫效果
        }
        switch (type) {
            case "info":
                toastr.info(context, title);
                break;
            case "success":
                toastr.success(context, title);
                break;
            case "warn":
                toastr.warning(context, title);
                break;
            case "error":
                toastr.options.timeOut = "15000";
                toastr.options.extendedTimeOut = "15000";
                toastr.error(context, title);
                break;
        }
    }
};


/*
* Init Common Settings
*/
(function ($) {
    $.ajaxSetup({ cache: false });

    //解除block
    $(document).bind("ajaxStop", function () {
        $.unblockUI();
    });

    //ajax post一律加上反仿冒驗證權杖
    $.ajaxPrefilter(function (options) {
        if (options.type.toUpperCase() === 'POST') {
            options.beforeSend = function (xhr) {
                xhr.setRequestHeader("__RequestVerificationToken", $('[name=__RequestVerificationToken]').val());
            }
        }
    });

    //jsGrid切換成中文
    jsGrid.locale("zh-tw");

    //全形轉半形，自動濾白
    $(document).delegate('input[type=text],textarea', 'blur', function () {
        _Private.Common.ConvertInput($(this));
    });
    $(document).delegate('form', 'submit', function () {
        //全形轉半形，自動濾白，讓直接按下Enter也能先去處理blur事件做的事
        $('input[type=text],textarea').each(function () {
            _Private.Common.ConvertInput($(this));
        });
    });

    //針對匯入框，自動顯示上傳檔名
    $(document).delegate('input[type=file]', 'change', function (e) {
        var fileName = e.target.files[0].name;
        $('.custom-file-label').html(fileName);
    });
})(jQuery);

function AjaxPostFunFail(data) {
    var msg = '';
    if (data.status === 0) {
        msg = '無法連線';
    } else if (data.status == 400) {
        msg = "錯誤的請求，請確認輸入資料無包含指令碼[400]";
    } else if (data.status == 403) {
        msg = "您未被授權使用此功能[403]";
    } else if (data.status == 404) {
        msg = '找不到資源[404]';
    } else if (data.status == 500) {
        msg = '系統錯誤[500]';
    } else {
        msg = '出現非預期錯誤';
    }
    Utility.Toastr.Erorr('網頁錯誤', msg);
}

function ajaxError(jqXHR, exception) {
    var msg = '';
    if (jqXHR.status === 0) {
        msg = '無法連線';
    } else if (jqXHR.status == 400) {
        msg = "錯誤的請求，請確認輸入資料無包含指令碼[400]";
    } else if (jqXHR.status == 401) {
        msg = "認證逾時，請重新登入[401]";
    } else if (jqXHR.status == 404) {
        msg = '找不到資源[404]';
    } else if (jqXHR.status == 403) {
        msg = "您未被授權使用此功能[403]";
    } else if (jqXHR.status == 500) {
        msg = '系統錯誤[500].';
    } else if (exception === 'parsererror') {
        msg = 'Json解析失敗';
    } else if (exception === 'timeout') {
        msg = '逾時錯誤';
    } else if (exception === 'abort') {
        msg = 'Ajax異常中止.';
    } else {
        msg = '出現非預期錯誤.\n' + jqXHR.responseText;
    }
    Utility.Toastr.Erorr('網頁錯誤', msg);
}

function GetBoolean(value) {
    if (value === true) {
        return true;
    }
    switch (value.toUpperCase()) {
        case "TRUE":
        case 1:
        case "1":
        case "ON":
        case "YES":
        case "OK":
            return true;
        default:
            return false;
    }
}

function GetUid(prefixId) {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    if (prefixId == undefined) {
        prefixId = "";
    }
    return prefixId + '_' + Math.random().toString(36).substr(2, 9);
}

function SetWebSiteRoot(root) {
    BackendWebSiteRoot = root;
}

function ReportChildCallback(height) {
    $("#ReportViewerFrame").height(height + 40);
    $.unblockUI();
}


//#region Date、Time函式

function getToday() {
    var currentdate = new Date();
    var _Year = (currentdate.getFullYear() - 1911)
    var _Month = (currentdate.getMonth() + 1)
    if (_Month < 10) {
        _Month = "0" + _Month;
    }
    var _Date = currentdate.getDate()
    if (_Date < 10) {
        _Date = "0" + _Date;
    }
    var _Today = _Year + "/" + _Month + "/" + _Date
    return _Today;
}

function getTodayAD() {
    var currentdate = new Date();
    var _Year = (currentdate.getFullYear())
    var _Month = (currentdate.getMonth() + 1)
    if (_Month < 10) {
        _Month = "0" + _Month;
    }
    var _Date = currentdate.getDate()
    if (_Date < 10) {
        _Date = "0" + _Date;
    }
    var _Today = _Year + "/" + _Month + "/" + _Date
    return _Today;
}

function getTomorrowAD() {
    var currentdate = new Date();
    var tomorrowdate = new Date();
    tomorrowdate.setDate(currentdate.getDate() + 1);
    var _Year = (tomorrowdate.getFullYear())
    var _Month = (tomorrowdate.getMonth() + 1)
    if (_Month < 10) {
        _Month = "0" + _Month;
    }
    var _Date = tomorrowdate.getDate()
    if (_Date < 10) {
        _Date = "0" + _Date;
    }
    var _Today = _Year + "/" + _Month + "/" + _Date
    return _Today;
}

function getTimeNow() {
    var currentdate = new Date();
    var Minutes = "";
    var Hours = "";
    if (currentdate.getHours() < 10) {
        Hours = "0" + currentdate.getHours()
    }
    else { Hours = currentdate.getHours() }

    if (currentdate.getMinutes() < 10) {
        Minutes = "0" + currentdate.getMinutes()
    }
    else { Minutes = currentdate.getMinutes() }
    var _Time = Hours + ":" + Minutes
    return _Time;
}

function getFormattedDate(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return year + '/' + month + '/' + day;
}

//日期時間檢核的function
//取得選取的時間
function GetDtSelect(TwD, TwT) {
    var date = TwD.split("/");
    var a = parseInt(date[0]) + 1911 + "/" + date[1] + "/" + date[2] + " " + TwT;
    return Date.parse(a).valueOf();
}

//取得西元時間
function GetADDt(ADDT) {
    if (ADDT != null && checkDate(ADDT)) {
        var tempDT = ADDT.split(" ");   //分為日期和時間部分
        var date = tempDT[0].split("/");
        var a = date[0] + "/" + date[1] + "/" + date[2] + " " + tempDT[1];
        return Date.parse(a).valueOf();
    }
    else
        return 0;
}

//民國年日期轉西元年日期(字串)
function RocTranADDtStr(ADDT) {
    if (ADDT != null && checkDate(ADDT)) {
        var tempDT = ADDT.split(" ");   //分為日期和時間部分
        var date = tempDT[0].split("/");
        var a = (parseInt(date[0]) + 1911) + "/" + date[1] + "/" + date[2];
        return a;
    }
    else
        return "";
}

//取得一天之後的西元時間
function GetOneMoreDayADDt(ADDT) {
    if (ADDT != null && checkDate(ADDT)) {
        var tempDT = ADDT.split(" ");   //分為日期和時間部分
        var date = tempDT[0].split("/");
        var a = date[0] + "/" + date[1] + "/" + (parseInt(date[2]) + 1) + " " + tempDT[1];
        return Date.parse(a).valueOf();
    }
    else
        return 0;
}

//取得一小時後的日期時間
function GetDtValidation() {
    var now = new Date();
    var a = now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate() + " " + (now.getHours() + 1) + ":" + now.getMinutes();
    return Date.parse(a).valueOf();
}

//檢查日期格式是否正確
function checkDate(str) {
    if (str.length > 0) {
        var re = new RegExp("^\\d{2,3}[/](0?[1-9]|1[012])[/](0?[1-9]|[12][0-9]|3[01])$");
        if (re.exec(str)) {
            var datelist = str.split('/');
            str = (parseInt(datelist[0]) + 1911) + "/" + datelist[1] + "/" + datelist[2];
            var t = Date.parse(str);
            if (!isNaN(t))
                return true;
        }
        return false;
    }
    return true;
}

//檢查時間格式是否正確
function checkTime(str) {
    if (str.length > 0) {
        var a = str.match(/^(\d{1,2})(:)?(\d{1,2})$/);
        if (a == null) { return false; }
        if (a[1] > 24 || a[3] > 60) {
            return false
        }
        else
            return true;
    }
    else
        return true;
}

///彈出報表視窗
function createPopupWin(pageURL, pageTitle, popupWinWidth, popupWinHeight) {
    var left = (screen.width - popupWinWidth) / 2;
    var top = (screen.height - popupWinHeight) / 4;

    var myWindow = window.open(pageURL, pageTitle,
        'scrollbars=yes, resizable=yes, width=' + popupWinWidth
        + ', height=' + popupWinHeight + ', top=' + top + ', left=' + left);
    myWindow.focus;
}