import fs from 'fs';

//#region data handling

export const sortByPlayer = (entries, players = null) => {
    let result = {};

    if (players) {
        players.forEach(player => {
            result[player.id] = {
                ...player,
                rounds: {}
            };
        })
    }
    
    entries.forEach(entry => {
        if (result[entry.playerId] === undefined) {
            result[entry.playerId] = { rounds: {} }
        }
        result[entry.playerId].rounds[entry.round]= {
            'score': entry.score,
            'roundNum': entry.round,
        }
        
        entry.throws.forEach(singleThrow => {
            result[entry.playerId].rounds[entry.round][singleThrow.throw] = singleThrow;
        })
    })
    
    return result;
}

export const createVisibleState = (singleHoleData) => {
    let temp = {
        showing: { //types listed here with bool
            trees: true,
            tee: true,
            basket: true,
            circle1: false,
            circle2: false,
            zones: {},
            throws: {},
            extras: {},
        }
    }
    singleHoleData.map.zones.forEach(zone=> {
        temp.zones[zone.uid] = false;
    })
    singleHoleData.entries.forEach(entry=> {
        entry.throws.forEach(singleThrow => {
            temp.throws[singleThrow.uid] = false;
        })
    })
    singleHoleData.extras.forEach(extra=> {
        temp.extras[extra.uid] = false;
    })
}

export const sortByCard = (cards, players, entries) => {
    let result = {};
    Object.values(cards).map(card=>{

    })

    //join players to cards
    //add entries to players for the hole
}

//#endregion

//#region SVG 

export const parseSinglePath = (str) => {
    try {
        let values = str.trim().split(' ');
        let [m, startStr, c, handle1Str, handle2Str, endStr] = values;

        function strCommaStrToInts(string) {
            return string.split(',').map(e=> parseInt(e))
        }

        return {
            startPoint: strCommaStrToInts(startStr),
            handle1: strCommaStrToInts(handle1Str), 
            handle2: strCommaStrToInts(handle2Str), 
            endPoint: strCommaStrToInts(endStr),
        }
    } catch (ex) {
        return undefined;
    }
    
};

export const constructSinglePath = (startPoint, handle1, handle2, endPoint) => {
    return `
        M ${startPoint.join(',')}
        C ${handle1.join(',')} ${handle2.join(',')} ${endPoint.join(',')}
    `;
};

//#endregion



//#region JSON

const jsonLoc = './src/data.json';

export async function readJson() {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(jsonLoc, (err, fileData) => {
                if (err) {
                    reject(err)
                }
                try {
                    const object = JSON.parse(fileData);
                    resolve(object)
                } catch (err) {
                    reject(err)
                }
            })
        }
    )
}
export async function updateJson(data) {
    return readJson().then(object => {
        let newObj = {
            ...object,
            ...data,
        }
        fs.writeFile(jsonLoc, JSON.stringify(newObj), err => {
            if(err) console.log("error writing to file", err)
        })
    })
}

//#endregion
