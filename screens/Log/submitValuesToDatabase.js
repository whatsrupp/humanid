import Expo, { SQLite } from 'expo';

const db = SQLite.openDatabase('humanId');

const executeSql = async (sql, params = []) => {

    return new Promise((resolve, reject) => db.transaction(tx => {
        tx.executeSql(
            sql, 
            params,
            (_, result) => resolve(result),
            reject
        )
    }))
}


const submitForm = async (values)=> {
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
    )`

    await executeSql(createTableString);

    const insertEntryString = `INSERT INTO entries (
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
        'abc123',
        12345,
        0.12346,
        0.12345,
        'male',
        true,
        true,
        true,
        'bones;skulls;',
        'url1;url2'
        )`

    const resultSetInsert = await executeSql(insertEntryString);
    const getEntriesString = `SELECT * FROM entries`
    const resultSet = await executeSql(getEntriesString)
      
}

export default submitForm