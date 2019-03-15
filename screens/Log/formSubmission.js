import Expo, { SQLite } from 'expo';

const submitForm = ()=> {
    const db = SQLite.openDatabase('humanId');
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE if not exists items (id integer primary key not null, done int, value text);'
        );
    });
}

// INSERT INTO entries (
//     qrCode,
//     dateOfEntry,
//     latitude,
//     longitude,
//     gender,
//     fingerprint,
//     skin,
//     hair,
//     physicalEvidence,
//     photoUrls
//   )
//   VALUES
//   (
//     'abc123',
//     12345,
//     0.12346,
//     0.12345,
//     'male',
//     true,
//     true,
//     true,
//     'bones;skulls;',
//     'url1;url2'
//   )


// CREATE TABLE IF NOT EXISTS entries (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     qrCode TEXT NOT NULL,
//     dateOfEntry DATE NOT NULL,
//     latitude DOUBLE NOT NULL,
//     longitude DOUBLE NOT NULL,
//     gender TEXT NOT NULL,
//     fingerprint BOOL NOT NULL,
//     skin BOOL NOT NULL,
//     hair BOOL NOT NULL,
//     physicalEvidence TEXT,
//     photoUrls TEXT
// )
  
  