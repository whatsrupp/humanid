import Expo, { SQLite } from 'expo';


const db = SQLite.openDatabase('humanId');

const executeSql = async (sql, params = []) => {

    return new Promise((resolve, reject) => db.transaction(tx => {
        tx.executeSql(
            sql, 
            params,
            (_, result) => resolve(result),
            (_, error) => reject(error)
        )
    }))
}

const deserializeStringArray = (list) => {
    console.log(list)
    const test = list.split(';')
    console.log(test)
    return test
}

export const getEntryByQrCode = async (qrCode) =>{
    const sql =`SELECT * FROM entries
    WHERE qrCode = ?
    LIMIT 1`

    const parameters = [qrCode]
    const data = await executeSql(sql, parameters)
    const entry = data.rows._array[0]
    entry.physicalEvidenceEntries = deserializeStringArray(entry.physicalEvidence)
    entry.photoUrls = deserializeStringArray(entry.photoUrls)    
    return entry
}
