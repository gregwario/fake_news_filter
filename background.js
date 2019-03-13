// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const defaultURLs = {
    fake: [
        'nationalreport.net',
        'nbcnews.com.co',
        'now8news.com',
        'usatoday.com.co',
        'washingtonpost.com.co',
        'cnn-trending.com',
        'bizstandardnews.com',
        '70news.wordpress.com',
        'abcnews.com.co',
        'alarabiya.net',
        'americannews.com',
        'beforeitsnews.com',
        'bients.com',
        'bloomberg.ma',
        'thebostontribune.com',
        'breaking-cnn.com',
        'bva.co.uk',
        'celebtricity.com',
        'conservativefrontline.com',
        'countynewsroom.info',
        'dailybuzzlive.com',
        'stuppid.com'
    ],
    real: [
        'cnn.com',
        'nytimes.com',
        'npr.org',
        'bbc.com',
        'nbcnews.com',
        'abcnews.go.com',
        'katu.com',
        'cnbc.com',
        'washingtonpost.com',
        'news.google.com',
        'msnbc.com',
        'sfchronicle.com',
        'oregonlive.com',
        'komonews.com',
        'seattletimes.com',
        'king5.com',
        'nbcwashington.com',
        'houstonpress.com',
        'latimes.com'
    ],
    satire: [
        'theonion.com',
        'cracked.com',
        'thedailyshow.com',
        'weeklyworldnews.com',
        'reductress.com',
        'satirewire.com',
        'babylonbee.com',
        'bbspot.com',
        'newyorker.com/humor/borowitz-report',
        'clickhole.com',
        'christwire.org',
        'thedailywtf.com',
        'thedailyer.com',
        'duffelblog.com',
        'freewoodpost.net',
        'thehardtimes.net',
        'huzlers.com',
        'islamicanews.com',
        'landoverbaptist.org',
        'nationalreport.net',
        'scrappleface.com'
    ]
};

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({ urls: defaultURLs }, function() {
        console.log('The default URLs have been added:', defaultURLs);
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { hostEquals: 'www.google.com' },
                        css: ['div.r']
                    })
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
});

var isExtensionOn = true;

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.cmd === "setOnOffState") {
            isExtensionOn = request.data.value;
        }

        if (request.cmd === "getOnOffState") {
            sendResponse(isExtensionOn);
        }
    });

/*var toggle = false;
chrome.browserAction.onClicked.addListener(function(tab){
    toggle = !toggle;
    if(toggle){
        chrome.tabs.executeScript(tab.id, {file:"contentScript.js"});
    }
    else{
        chrome.tabs.executeScript(tab.id, {code:"alert()"});
    }
});*/