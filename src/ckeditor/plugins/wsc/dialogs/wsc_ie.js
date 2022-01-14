﻿/*
 Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.html or http://ckeditor.com/license
*/
CKEDITOR.dialog.add('checkspell', function (a) {
    function b(a, b) {
        var d = 0;
        return function () {
            'function' == typeof window.doSpell
                ? ('undefined' != typeof c && window.clearInterval(c), l(a))
                : 180 == d++ && window._cancelOnError(b);
        };
    }
    function l(b) {
        var f = new window._SP_FCK_LangCompare(),
            c = CKEDITOR.getUrl(a.plugins.wsc.path + 'dialogs/'),
            e = c + 'tmpFrameset.html';
        window.gFCKPluginName = 'wsc';
        f.setDefaulLangCode(a.config.defaultLanguage);
        window.doSpell({
            ctrl: g,
            lang: a.config.wsc_lang || f.getSPLangCode(a.langCode),
            intLang: a.config.wsc_uiLang || f.getSPLangCode(a.langCode),
            winType: d,
            onCancel: function () {
                b.hide();
            },
            onFinish: function (c) {
                a.focus();
                b.getParentEditor().setData(c.value);
                b.hide();
            },
            staticFrame: e,
            framesetPath: e,
            iframePath: c + 'ciframe.html',
            schemaURI: c + 'wsc.css',
            userDictionaryName: a.config.wsc_userDictionaryName,
            customDictionaryName:
                a.config.wsc_customDictionaryIds &&
                a.config.wsc_customDictionaryIds.split(','),
            domainName: a.config.wsc_domainName,
        });
        CKEDITOR.document.getById(h).setStyle('display', 'none');
        CKEDITOR.document.getById(d).setStyle('display', 'block');
    }
    var e = CKEDITOR.tools.getNextNumber(),
        d = 'cke_frame_' + e,
        g = 'cke_data_' + e,
        h = 'cke_error_' + e,
        c,
        k = a.lang.wsc.notAvailable,
        m =
            '\x3ctextarea style\x3d"display: none" id\x3d"' +
            g +
            '" rows\x3d"10" cols\x3d"40"\x3e \x3c/textarea\x3e\x3cdiv id\x3d"' +
            h +
            '" style\x3d"display:none;color:red;font-size:16px;font-weight:bold;padding-top:160px;text-align:center;z-index:11;"\x3e\x3c/div\x3e\x3ciframe src\x3d"" style\x3d"width:100%;background-color:#f1f1e3;" frameborder\x3d"0" name\x3d"' +
            d +
            '" id\x3d"' +
            d +
            '" allowtransparency\x3d"1"\x3e\x3c/iframe\x3e',
        n =
            a.config.wsc_customLoaderScript ||
            'https://loader.webspellchecker.net/sproxy_fck/sproxy.php?plugin\x3dfck2\x26customerid\x3d' +
                a.config.wsc_customerId +
                '\x26cmd\x3dscript\x26doc\x3dwsc\x26schema\x3d22';
    a.config.wsc_customLoaderScript &&
        (k +=
            '\x3cp style\x3d"color:#000;font-size:11px;font-weight: normal;text-align:center;padding-top:10px"\x3e' +
            a.lang.wsc.errorLoading.replace(
                /%s/g,
                a.config.wsc_customLoaderScript,
            ) +
            '\x3c/p\x3e');
    window._cancelOnError = function (b) {
        if ('undefined' == typeof window.WSC_Error) {
            CKEDITOR.document.getById(d).setStyle('display', 'none');
            var c = CKEDITOR.document.getById(h);
            c.setStyle('display', 'block');
            c.setHtml(b || a.lang.wsc.notAvailable);
        }
    };
    return {
        title: a.config.wsc_dialogTitle || a.lang.wsc.title,
        minWidth: 485,
        minHeight: 380,
        buttons: [CKEDITOR.dialog.cancelButton],
        onShow: function () {
            var d = this.getContentElement('general', 'content').getElement();
            d.setHtml(m);
            d.getChild(2).setStyle('height', this._.contentSize.height + 'px');
            'function' != typeof window.doSpell &&
                CKEDITOR.document.getHead().append(
                    CKEDITOR.document.createElement('script', {
                        attributes: { type: 'text/javascript', src: n },
                    }),
                );
            d = a.getData();
            CKEDITOR.document.getById(g).setValue(d);
            c = window.setInterval(b(this, k), 250);
        },
        onHide: function () {
            window.ooo = void 0;
            window.int_framsetLoaded = void 0;
            window.framesetLoaded = void 0;
            window.is_window_opened = !1;
        },
        contents: [
            {
                id: 'general',
                label: a.config.wsc_dialogTitle || a.lang.wsc.title,
                padding: 0,
                elements: [{ type: 'html', id: 'content', html: '' }],
            },
        ],
    };
});
CKEDITOR.dialog.on('resize', function (a) {
    a = a.data;
    var b = a.dialog;
    'checkspell' == b._.name &&
        ((b =
            (b = b.getContentElement('general', 'content').getElement()) &&
            b.getChild(2)) && b.setSize('height', a.height),
        b && b.setSize('width', a.width));
});
