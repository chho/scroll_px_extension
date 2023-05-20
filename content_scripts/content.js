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

            console.log("abort the key listener");

            window.controller.abort();

            // if (keyListener) {
            //     console.log("remove the key listener");

            //     keyListener.remove();
            // }
        } else {
            console.log("signal is " + window.controller.signal.aborted);

            if (window.controller.signal.aborted) {
                console.log("new controller");

                window.controller = new AbortController();
            }

            // set the keydown listner.
            body_el.addEventListener("keydown", (e) => {
                console.log("enter the key listener");

                if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                    let x, y = 0;

                    switch (e.key) {
                        case "ArrowUp": y = -message.px; break;
                        case "ArrowDown": y = message.px; break;
                        case "ArrowLeft": x = -message.px; break;
                        case "ArrowRight": x = message.px; break;
                    }

                    e.preventDefault();

                    console.log(message.px);
                    window.scrollBy(x, y);
                }

                // if (e.key === "ArrowDown") {
                //     e.preventDefault();

                //     console.log(message.px);
                //     window.scrollBy(0, message.px);
                // }
            }, { signal: window.controller.signal });
        }

        // console.log(message.px);
        console.log(message.px === -1);
    });
})();