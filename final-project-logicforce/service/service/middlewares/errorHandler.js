const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).send({ error: err.message }); // expose error message to client for development purpose
  };
  
  export default errorHandler;
  