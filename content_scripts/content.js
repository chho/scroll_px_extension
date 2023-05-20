(() => {
    if (window.hasRun) {
        return;
    }

    window.hasRun = true;
    window.controller = new AbortController();

    browser.runtime.onMessage.addListener((message) => {
        let body_el = document.getElementsByTagName("body")[0];

        // if px = -1, remove keydown listener.
        if (message.px === -1) {
            window.controller.abort();
        } else {
            if (window.controller.signal.aborted) {
                window.controller = new AbortController();
            }

            // set the keydown listner.
            body_el.addEventListener("keydown", (e) => {
                if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                    let x, y = 0;

                    switch (e.key) {
                        case "ArrowUp": y = -message.px; break;
                        case "ArrowDown": y = message.px; break;
                        case "ArrowLeft": x = -message.px; break;
                        case "ArrowRight": x = message.px; break;
                    }

                    e.preventDefault();

                    window.scrollBy(x, y);
                }
            }, { signal: window.controller.signal });
        }
    });
})();