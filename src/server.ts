import app from "./app";

const start = (port?: number) => {
  const PORT = port || process.env.PORT || 5000;
  try {
    app.listen(PORT, () => {
      console.log(`Listening to port ${PORT}`);
    });
  } catch(err) {
    console.log(err);
    process.exit();
  }
  
}

start();