import ExpressApp from "./express-app";

const PORT = process.env.PORT || 8002;

export const StartServer = async () => {
    ExpressApp.listen(PORT, () => {
        console.log(`App is running on port ${PORT}`);
    })

    process.on("uncaughtException", (err) => {
        console.log("Uncaught Exception! Shutting down...");
        console.log(err.name, err.message);
        process.exit(1);
    })
}

StartServer().then(() => {
    console.log('Server started successfully');
})