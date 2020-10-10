export const dataSample = {
    course: {
        name: "Idlewild",
        holeCount: 18,
        distance: '3000ft',
        headerImage: ''
    },
    holes: [
        {
            details: { //wont change after initial set
                strokeAvg: 3,
                number: 1,
                distance: 315,

            },
            map: { //wont change after initial set
                tee: { height: 8, width: 4 },
                basket: { x: -30, y: 300 },
                trees: [
                    { x: -40, y: 150, r: 10 },
                ],
                viewBox: '-200 -50 400 400',
                zones: [
                    {
                        //id name type(color/fill with color or lines/etc) shape z-index(if needed)
                    }
                ]
            },
            entries: [ //wont change during viewing, but during editing will be aded to
                {
                    uid: '1-1',
                    playerId: 1,
                    round: 1,
                    score: 2,
                    throws: [
                        {
                            uid: '1-1-1',
                            throw: 1,
                            svg: 'M 0,0 C 50,75 75,50 50,300',
                            offTee: true,
                            circle1: true
                        },
                        {
                            uid: '1-1-2',
                            throw: 2,
                            svg: 'M 50,300 C 0,280 0,280 -30,300',
                            inBasket: true
                        },
                    ]
                },
                {
                    uid: '1-2',
                    playerId: 1,
                    round: 2,
                    score: 3,
                    throws: [
                        {
                            uid: '1-2-1',
                            throw: 1,
                            svg: 'M 0,0 C 0,75 -80,200 -80,200',
                            offTee: true,
                        },
                        {
                            uid: '1-2-2',
                            throw: 2,
                            svg: 'M -80,200 C -80,200 -20,300 -20,280',
                            circle1: true
                        },
                        {
                            uid: '1-2-3',
                            throw: 3,
                            svg: 'M -20,280 C -20,300 -30,300 -30,300',
                            putt: true,
                            inBasket: true,
                        },
                    ]
                },
                {
                    uid: '2-1',
                    playerId: 2,
                    round: 1,
                    score: 2,
                    throws: [
                        {
                            uid: '2-1-1',
                            throw: 1,
                            svg: ['path', 'path'],
                            circle1: true
                        },
                        {
                            uid: '2-1-2',
                            throw: 2,
                            svg: 'path',
                            putt: true,
                            inBasket: true,
                        },
                    ]
                }
            ],
            extras: [
                // for non player throw lines / alternate options/ cameo throws / throws from other tournaments
            ],
            zones: []
            //teeOrder: {} //round-card order (helps enter data)
        }
    ]
}

//dynamically changing during runtime
//will likely need to use uid's to make finding easier
export const visibleState = {
    showing: { //types listed here with bool
        trees: true,
        tee: true,
        basket: true,
        circle1: false,
        circle2: false,
        zones: [],
        throws: [],
        extras: [],
        //throws: {[uid]:true}, //may use object for easier controls
    }
}

//potentially long list, not dynamically changing during run time
export const playersSample = [
    {
        name: 'Paul McBeth',
        nickname: 'Paul',
        pic: '',
        id: 1,
    },
    {
        name: 'Nate Sexton',
        nickname: 'Sexton',
        pic: '',
        id: 2,
    },
    {
        name: 'Jeremy Koling',
        nickname: 'Big Jerm',
        pic: '',
        id: 3,
    },
    {
        name: 'Paul Ulibarri',
        nickname: 'Berry',
        pic: '',
        id: 4,
    },
]

export const playerObjectSample = {
    "1": {
        name: 'Paul McBeth',
        nickname: 'Paul',
        pic: '',
        id: 1,
    },
    "2": {
        name: 'Nate Sexton',
        nickname: 'Sexton',
        pic: '',
        id: 2,
    },
    "3": {
        name: 'Jeremy Koling',
        nickname: 'Big Jerm',
        pic: '',
        id: 3,
    },
    "4": {
        name: 'Paul Ulibarri',
        nickname: 'Berry',
        pic: '',
        id: 4,
    },
    "5": {
        name: 'Ricky Wysocki',
        nickname: 'SockiBomb',
        pic: '',
        id: 5,
    },
    "6": {
        name: 'Eagle McMahon',
        nickname: 'Eagle',
        pic: '',
        id: 6,
    },
}

export const sampleText = {
    holes: [
        {
            text: ''
        }
    ]
}

//may need hole-round-throw order
//  and hole-round-stats (for scoring avg for the round)


export const cardsSample = {
    "uid0001" : {
        uid: 'uid0001',
        players: [1,2,3,4], //in order of start
        round: 1,
    },
}