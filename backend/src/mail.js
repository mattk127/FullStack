const db = require('./db');

exports.getAll = async (req, res) => {
  if (req.query.mailbox) {
    const allmail = await db.selectAll(req.query.mailbox);
    if (allmail === undefined) {
      res.status(404).send();
    }
    res.status(200).send(allmail);
  } else {
    const allmail = await db.selectAll();
    res.status(200).send(allmail);
  }
};

exports.getbyID = async (req, res) => {
  // if req.body.id valid uuid, do below
  // console.log(req.params.id);
  const email = await db.selectEmail(req.params.id);
  if (email) {
    res.status(200).send(email);
  } else {
    res.status(404).send();
  }
};

exports.postemail = async (req, res) => {
  const email = await db.placeEmail(req.body);
  res.status(201).send(email);
};

exports.putemail = async (req, res) => {
  const has = await db.putemail(req.params.id, req.query.mailbox);
  if (has === undefined) {
    res.status(404).send();
  } else if (has === 0) {
    res.status(409).send();
  } else {
    res.status(204).send();
  }
};
