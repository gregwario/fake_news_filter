'use strict';

const addButton = `<button class="button--add"><span class="visually-hidden">Add URL</span><span aria-hidden="true">+</span></button>`;

const urlsContainer = document.querySelector('.url-lists');
urlsContainer.innerHTML = `<h1>Fake News Filter</h1>

<h2>Fake URLs</h2>
<ul class="urls urls--fake"></ul>
<form class="form--fake">
    <legend class="visually-hidden">Add a new fake domain:</legend>
    <label class="visually-hidden" for="new-url--fake">Fake domain name</label><input id="new-url--fake" type="text" placeholder="Add fake domain name"/>
    ${addButton}
</form>

<h2>Real URLs</h2>
<ul class="urls urls--real"></ul>
<form class="form--real">
    <legend class="visually-hidden">Add a new real domain:</legend>
    <label class="visually-hidden" for="new-url--real">Real domain name</label><input id="new-url--real" type="text" placeholder="Add real domain name" />
    ${addButton}
</form>

<h2>Satire URLs</h2>
<ul class="urls urls--satire"></ul>
<form class="form--satire">
    <legend class="visually-hidden">Add a new satire domain:</legend>
    <label class="visually-hidden" for="new-url--satire">Satire domain name</label><input id="new-url--satire" type="text" placeholder="Add satire domain name" />
    ${addButton}
</form>`;

const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const type = e.target.className.substring(6);
        chrome.storage.sync.get('urls', function(data) {
            const newURLs = data.urls;
            const newURL = document.getElementById(`new-url--${type}`);
            if (
                newURL.value.length &&
                newURLs[type].indexOf(newURL.value) == -1
            ) {
                newURLs[type].push(newURL.value);
                chrome.storage.sync.set({ urls: newURLs }, function() {
                    console.log('The new URL has been added:', newURLs);
                    document.querySelector(
                        `.urls--${type}`
                    ).innerHTML += `<li><span class="url">${
                        newURL.value
                    }</span> ${removeButton}</li>`;
                    newURL.value = '';
                    applyRemoveButtonListeners();
                });
            }
        });
        return false;
    });
});

const removeButton = `<button class="button--remove"><span class="visually-hidden">Remove URL</span><span aria-hidden="true">X</span></button>`;

const fakeUrlsContainer = document.querySelector('.urls--fake');
const realUrlsContainer = document.querySelector('.urls--real');
const satireUrlsContainer = document.querySelector('.urls--satire');

chrome.storage.sync.get('urls', function(data) {
    data.urls.fake.forEach(
        url =>
            (fakeUrlsContainer.innerHTML += `<li><span class="url">${url}</span> ${removeButton}</li>`)
    );
    data.urls.real.forEach(
        url =>
            (realUrlsContainer.innerHTML += `<li><span class="url">${url}</span> ${removeButton}</li>`)
    );
    data.urls.satire.forEach(
        url =>
            (satireUrlsContainer.innerHTML += `<li><span class="url">${url}</span> ${removeButton}</li>`)
    );
    applyRemoveButtonListeners();
});

function applyRemoveButtonListeners() {
    const removeButtons = document.querySelectorAll('.button--remove');
    removeButtons.forEach(removeButton => {
        removeButton.addEventListener('click', e => {
            const removedParent = e.target.parentNode.parentNode;
            const type = removedParent.parentNode.className.substring(11);
            const removedURL = removedParent.querySelector('.url').innerHTML;
            removedParent.style.display = 'none';
            const newURLs = data.urls;
            newURLs[type] = newURLs[type].filter(item => item !== removedURL);
            chrome.storage.sync.set({ urls: newURLs }, function() {
                console.log('The URL has been removed:', removedURL);
            });
        });
    });
}
