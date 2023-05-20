// default 2px.
const DEFAULT_PX = 2;

setPopupBackColor();
initialize();

// set the popup window background color to the theme frame color.
async function setPopupBackColor() {
    const theme_info = await browser.theme.getCurrent();

    document.body.style.backgroundColor = theme_info.colors.popup;
}

// initialize the popup window.
// load data from the locally storage to the popup window.
function initialize() {
    // when popup window is loaded, get the focus on the input text box.
    let px_box = document.getElementById("px_input");
    px_box.focus();
    px_box.select();

    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        browser.storage.local.get(tabs[0].id.toString()).then((result) => {
            let keys = Object.keys(result);

            if (keys.length >= 1) {
                let px_value = result[keys[0]];

                if (px_value) {
                    document.getElementById("px_input").value = px_value;
                    document.getElementById("arrow_chb").checked = true;
                }
            }
        });
    });
}

// add click listener to the arrow button.
function listenArrowBtn() {
    let arrow_chb = document.getElementById("arrow_chb");
    let px_box = document.getElementById("px_input");

    arrow_chb.addEventListener("change", () => {
        if (arrow_chb.checked) {
            let px_value = px_box.value;

            // if the input value is not a number, set it to the default value.
            if (!parseInt(px_value)) {
                px_value = DEFAULT_PX;
                px_box.value = px_value;
            }

            browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
                let id = tabs[0].id;

                let storing_px = browser.storage.local.set({ [id]: px_value });
                storing_px.then(() => {
                    browser.tabs.sendMessage(id, { px: px_value });
                });
            });
        } else {
            // -1 is the magic number. It means that the arrow button is disabled.
            browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
                browser.storage.local.remove(tabs[0].id.toString()).then(() => {
                    browser.tabs.sendMessage(tabs[0].id, { px: -1 });
                });
            });
        }
    });
}

browser.tabs.executeScript({ file: "/content_scripts/content.js" }).then(listenArrowBtn);