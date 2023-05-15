(() => {
    if (window.hasRun) {
        console.log("already run");

        return;
    }

    window.hasRun = true;

    console.log("enter the page");
    console.log("enter the page2");

    let keyListener;

    browser.runtime.onMessage.addListener((message) => {
        window.aa = (e) => {
            console.log("enter the anonymous function");
            console.log("testing the message " + message.px);
        };

        if (message.px === -1) {
            console.log(message.px);
            console.log("listener is " + keyListener);

            // document.removeEventListener("keydown", (e) => {
            //     console.log("enter the key listener");

            //     if (e.key === "ArrowDown") {
            //         e.preventDefault();

            //         console.log(message.px);
            //         window.scrollBy(0, message.px);
            //     }
            // });

            // document.getElementsByTagName("body")[0].removeEventListener("keydown", window.aa);
            document.getElementsByTagName("body")[0].replaceWith(document.getElementsByTagName("body")[0].cloneNode(true));


            // if (keyListener) {
            //     console.log("remove the key listener");

            //     keyListener.remove();
            // }
        } else {
            // document.addEventListener("keydown", (e) => {
            //     console.log("enter the key listener");

            //     if (e.key === "ArrowDown") {
            //         e.preventDefault();

            //         console.log(message.px);
            //         window.scrollBy(0, message.px);
            //     }
            // });
            document.getElementsByTagName("body")[0].addEventListener("keydown", window.aa);
        }

        console.log(message.px);
        console.log(message.px === -1);
        console.log("testing");

        aa();
        // if (message.command === "100") {

        // } else {

        // }
    });
})();