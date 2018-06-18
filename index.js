import initializeApp from "./setup"
import initializeSubscriptions from "./src/subscriptions"

const main = initializeApp()
initializeSubscriptions(main)
