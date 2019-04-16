import { SQLite } from 'expo';

const db = SQLite.openDatabase('humanId');

const executeSql = async (sql, params = []) => {
  return new Promise((resolve, reject) =>
    db.transaction(tx => {
      tx.executeSql(
        sql,
        params,
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    })
  );
};

const serializeStringArray = list => {
  return list.join(';');
};

const insertEntry = async values => {
  const sqlString = `INSERT INTO entries (
        qrCode,
        dateOfEntry,
        latitude,
        longitude,
        gender,
        fingerprint,
        skin,
        hair,
        physicalEvidence,
        photoUrls
        )
        VALUES
        (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
        )`;

  const parameters = [
    values.qrCode,
    new Date().toUTCString(),
    values.latitude,
    values.longitude,
    values.gender,
    values.fingerprint,
    values.skin,
    values.hair,
    serializeStringArray(values.physicalEvidenceEntries),
    serializeStringArray(values.photos)
  ];
  try {
    await executeSql(sqlString, parameters);
  } catch (err) {
    throw new Error(err);
  }
};

const submitForm = async values => {
  const createTableString = `CREATE TABLE IF NOT EXISTS entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        qrCode TEXT NOT NULL,
        dateOfEntry DATE NOT NULL,
        latitude DOUBLE NOT NULL,
        longitude DOUBLE NOT NULL,
        gender TEXT NOT NULL,
        fingerprint BOOL NOT NULL,
        skin BOOL NOT NULL,
        hair BOOL NOT NULL,
        physicalEvidence TEXT,
        photoUrls TEXT
    )`;

  await executeSql(createTableString);

  await insertEntry(values);
};

export default submitForm;
