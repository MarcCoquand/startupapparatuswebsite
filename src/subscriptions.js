/** 
 * Subscriptions
 * This is where all event listeners go. If you're using Firebase then this is where you want 
 * database subscriptions.
 * @param {app} main - A tapped hyperapp app
 * @return void
 * @example
 * db.get('users').then(main.addUsers)
 **/

export default main => {
    // if (process.env.NODE_ENV === "production") 
        setInterval(() => {main.terminal.step()}, 50)
    main.updateWindowWidth(window.innerWidth)
    main.updateWindowHeight(window.innerHeight)
    window.addEventListener("resize", 
        () => {
            main.updateWindowWidth(window.innerWidth)
            main.updateWindowHeight(window.innerHeight)
        });
};
