module.exports = function(req, res, next) {
  if (req.headers['favorite-color'] !== 'blue') {
    return res.send(401);
  }

  next();
}
