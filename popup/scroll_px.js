// default px value.
const DEFAULT_PX = 2;

// add click listener to the arrow button.
function listenArrowBtn() {
    // when popup window is loaded, get the focus on the input text box.
    let px_box = document.getElementById("px_input");
    px_box.focus();
    px_box.select();

    let arrow_btn = document.getElementById("arrow_btn");
    let arrow_close_btn = document.getElementById("arrow_close_btn");

    arrow_btn.addEventListener("click", function () {
        let px_value = px_box.value;

        if (isNaN(px_value)) {
            px_value = DEFAULT_PX;
        }

        document.getElementById("px_output").innerHTML = px_value;

        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
            browser.tabs.sendMessage(tabs[0].id, { px: px_value });
        });
    });

    arrow_close_btn.addEventListener("click", function () {
        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
            browser.tabs.sendMessage(tabs[0].id, { px: -1 });
        });
    });
}

browser.tabs.executeScript({ file: "/content_scripts/content.js" }).then(listenArrowBtn);