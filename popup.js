// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// let changeColor = document.getElementById('changeColor');

// chrome.storage.sync.get('color', function(data) {
//     changeColor.style.backgroundColor = data.color;
//     changeColor.setAttribute('value', data.color);
// });

// changeColor.onclick = function(element) {
//     let color = element.target.value;
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//         chrome.tabs.executeScript(tabs[0].id, {
//             code: 'document.body.style.backgroundColor = "' + color + '";'
//         });
//     });
// };

var isExtensionOn = true;

function disableButton() {
    var disableButton = document.getElementById("disableButton");
    if (disableButton.innerHTML === "Disable") {
        isExtensionOn = false;
    } else if (disableButton.innerHTML === "Enable") {
        isExtensionOn = true;
    } else {
        alert("Error");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var disableButton = document.getElementById("disableButton");
    var br1 = document.getElementById("br1");
    var br2 = document.getElementById("br2");

    chrome.extension.sendMessage({cmd: "setOnOffState", data: {value: isExtensionOn}});

    chrome.extension.sendMessage({cmd: "getOnOffState"}, function (response) {
        if (response !== undefined) {
            if (response) {
                disableButton.innerHTML = "Disable";
                disableButton.className = "button button3";
                disableButton.style.display = "";
                br1.style.display = "";
                br2.style.display = "";
            }
            else {
                disableButton.innerHTML = "Enable";
                disableButton.className = "button button1";
                disableButton.style.display = "";
                br1.style.display = "";
                br2.style.display = "";
            }
        }
    });
});