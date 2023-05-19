(() => {
    if (window.hasRun) {
        console.log("already run");

        return;
    }

    window.hasRun = true;
    window.controller = new AbortController();
    console.log("enter the page");

    browser.runtime.onMessage.addListener((message) => {
        let body_el = document.getElementsByTagName("body")[0];

        // if px = -1, remove keydown listener.
        if (message.px === -1) {
            console.log(message.px);
            // document.removeEventListener("keydown", (e) => {
            //     console.log("enter the key listener");

            //     if (e.key === "ArrowDown") {
            //         e.preventDefault();

            //         console.log(message.px);
            //         window.scrollBy(0, message.px);
            //     }
            // });

            // document.getElementsByTagName("body")[0].removeEventListener("keydown", window.aa);
            // document.getElementsByTagName("body")[0].replaceWith(document.getElementsByTagName("body")[0].cloneNode(true));
            window.controller.abort();

            // if (keyListener) {
            //     console.log("remove the key listener");

            //     keyListener.remove();
            // }
        } else {
            // set the keydown listner
            body_el.addEventListener("keydown", (e) => {
                window.controller = new AbortController();

                console.log("enter the key listener");

                if (e.key === "ArrowDown") {
                    e.preventDefault();

                    console.log(message.px);
                    window.scrollBy(0, message.px);
                }
            }, { signal: window.controller.signal });
            // document.getElementsByTagName("body")[0].addEventListener("keydown", window.aa);
        }

        // console.log(message.px);
        console.log(message.px === -1);
    });
})();