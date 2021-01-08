const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.selectAll = async (mailbox1) => {
  const ret = [];
  const map = new Map();
  const select = 'SELECT id, mailbox, mail FROM mail';
  const select1 = 'SELECT id, mailbox, mail FROM mail WHERE mailbox = $1';

  if (mailbox1) {
    const query = {
      text: select1,
      values: [mailbox1],
    };

    const {rows} = await pool.query(query);
    if (Object.entries(rows).length === 0) {
      return undefined;
    }

    map.set(mailbox1, []);
    for (const row of rows) {
      row.mail.id = row.id;
      map.get(mailbox1).push(row.mail);
    }
    for (const key of map.keys()) {
      ret.push({'name': key, 'mail': map.get(key)});
    }
    return ret;
  } else {
    const query = {
      text: select,
      values: [],
    };

    const {rows} = await pool.query(query);

    for (const row of rows) {
      if (!map.has(row.mailbox)) {
        map.set(row.mailbox, []);
      }
      row.mail.id = row.id;
      delete row.mail.content;
      map.get(row.mailbox).push(row.mail);
    }

    for (const key of map.keys()) {
      ret.push({'name': key, 'mail': map.get(key)});
    }
    return ret;
  }
};

// 'WHERE mail->>'mailbox' ~* $1'
exports.selectEmail = async (id) => {
  const select = 'SELECT id, mail FROM mail WHERE id = $1';
  const query = {
    text: select,
    values: [id],
  };

  const {rows} = await pool.query(query);
  if (rows.length == 1) {
    for (const row of rows) {
      row.mail.id = row.id;
    }
    return rows[0].mail;
  } else {
    return undefined;
  }
};

exports.placeEmail = async (body) => {
  // eslint-disable-next-line
  const insert = 'INSERT INTO mail(mailbox, mail) VALUES($1, $2) RETURNING id, mail';
  const date = new Date();

  const query = {
    text: insert,
    values: ['sent', {
      'from': {'name': 'CSE183 Student',
        'email': 'cse183student@ucsc.edu'},
      'to': {'name': body.to.name, 'email': body.to.email},
      'received': date.toISOString(),
      'sent': date.toISOString(),
      'content': body.content,
      'subject': body.subject,
    },
    ],
  };

  const {rows} = await pool.query(query);
  for (const row of rows) {
    row.mail.id = row.id;
  }
  return rows[0].mail;
};

exports.putemail = async (id, mailboxin) => {
  const select = 'SELECT id, mail, mailbox FROM mail WHERE id = $1';
  const query = {
    text: select,
    values: [id],
  };

  const {rows} = await pool.query(query);
  if (rows.length == 0) {
    return undefined;
  } else {
    if (mailboxin === 'sent' && rows[0].mailbox !== 'sent') {
      return 0;
    } else {
      const update = 'UPDATE mail SET mailbox = $1 WHERE id = $2';
      const query2 = {
        text: update,
        values: [mailboxin, id],
      };

      await pool.query(query2);
      return 1;
    }
  }
};
