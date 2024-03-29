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

const deserializeStringArray = list => {
  const desrializedArray = list.split(';');
  return desrializedArray;
};

export const getEntryByQrCode = async qrCode => {
  const sql = `SELECT * FROM entries
    WHERE qrCode = ?
    ORDER BY dateOfEntry DESC`;
  const parameters = [qrCode];
  const data = await executeSql(sql, parameters);
  const sortedData = data.rows._array.sort((a, b) => {
    return new Date(b.dateOfEntry) - new Date(a.dateOfEntry);
  });
  const entry = sortedData[0];

  entry.physicalEvidenceEntries = deserializeStringArray(
    entry.physicalEvidence
  );
  entry.photoUrls = deserializeStringArray(entry.photoUrls);
  return entry;
};
