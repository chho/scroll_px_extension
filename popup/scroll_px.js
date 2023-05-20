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
    console.log("initialize");

    // todo: clean up all the locally storage data that is not today.
    // browser.storage.local.clear();

    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        console.log("tabs: " + tabs[0].id);
        console.log("tabs type: " + typeof tabs[0].id);

        browser.storage.local.get(tabs[0].id.toString()).then((result) => {
            let keys = Object.keys(result);

            if (keys.length >= 1) {
                let px_value = result[keys[0]];
                console.log("px_value: " + px_value);

                if (px_value) {
                    document.getElementById("px_input").value = px_value;
                    document.getElementById("arrow_chb").checked = true;
                }
            }
            console.log("result: " + result);
            console.log("keys: " + Object.keys(result));
        });
    });

    // browser.storage.local.get(null).then((result) => {
    //     let keys = Object.keys(result);

    //     console.log("key: " + keys);

    //     for (let key of keys) {
    //         console.log("key: " + key);
    //         console.log("value: " + result[key]);
    //     }
    // });
}

// add click listener to the arrow button.
function listenArrowBtn() {
    // when popup window is loaded, get the focus on the input text box.
    let px_box = document.getElementById("px_input");
    px_box.focus();
    px_box.select();

    let arrow_chb = document.getElementById("arrow_chb");
    // let arrow_btn = document.getElementById("arrow_btn");
    // let arrow_close_btn = document.getElementById("arrow_close_btn");

    arrow_chb.addEventListener("change", () => {
        console.log("arrow checkbox is " + arrow_chb.checked);

        if (arrow_chb.checked) {
            let px_value = px_box.value;

            // if the input value is not a number, set it to the default value.
            if (!parseInt(px_value)) {
                px_value = DEFAULT_PX;
                px_box.value = px_value;
            }

            document.getElementById("px_output").innerHTML = px_value;

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
                    console.log("remove the px value from the local storage.");

                    browser.tabs.sendMessage(tabs[0].id, { px: -1 });
                });
            });
        }
    });

    // arrow_btn.addEventListener("click", function () {
    //     let px_value = px_box.value;

    //     if (isNaN(px_value)) {
    //         px_value = DEFAULT_PX;
    //     }

    //     document.getElementById("px_output").innerHTML = px_value;

    //     browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    //         browser.tabs.sendMessage(tabs[0].id, { px: px_value });
    //     });
    // });

    // arrow_close_btn.addEventListener("click", function () {
    //     browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    //         browser.tabs.sendMessage(tabs[0].id, { px: -1 });
    //     });
    // });
}

browser.tabs.executeScript({ file: "/content_scripts/content.js" }).then(listenArrowBtn);