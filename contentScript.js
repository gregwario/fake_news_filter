'use strict';

chrome.storage.sync.get('urls', function(data) {
    const createImg = type => {
        const img = new Image();
        img.src = chrome.runtime.getURL(`images/veracity-${type}.png`);
        img.alt = type;
        img.className = 'veracity-icon';
        return img;
    };
    let hideFakes = false;
    chrome.storage.sync.get('hideFakes', hideFakeData => {
        if (hideFakeData.hideFakes) {
            hideFakes = true;
        }
    let hideSatire = false;
    chrome.storage.sync.get('hideSatire', hideSatireData => {
        if (hideSatireData.hideSatire) {
            hideSatire = true;
        }

        const red = 'rgba(255,0,0,0.3)';
        const green = 'rgba(0,255,0,0.3)';
        const orange = 'rgba(255,165,0,0.35)';
        const purple = 'rgba(160, 144, 240, .5)';
        const linkContainers = [...document.querySelectorAll('div.r')];

        linkContainers.forEach(container => {
            const link = container.firstElementChild;
            if (data.urls.fake.some(src => link.href.includes(src))) {
                console.log(`Fake: ${link.href}`);
                if (hideFakes) {
                    container.parentElement.style.display = 'none';
                } else {
                    container.style.backgroundColor = red;
                    container.appendChild(createImg('fake'));
                }
            } else if (data.urls.real.some(src => link.href.includes(src))) {
                console.log(`Real: ${link.href}`);
                container.style.backgroundColor = green;
                container.appendChild(createImg('real'));
            } else if (data.urls.satire.some(src => link.href.includes(src))) {
                console.log(`Satire: ${link.href}`);
                if (hideSatire) {
                    container.parentElement.style.display = 'none';
                } else {
                    container.style.backgroundColor = purple;
                    container.appendChild(createImg('satire'));
                }
            } else {
                console.log(`Indeterminate: ${link.href}`);
                container.style.backgroundColor = orange;
                container.appendChild(createImg('indeterminate'));
            }
            container.style.display = 'flex';
        });
    });
});
