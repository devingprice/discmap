export const dataSample = {
    //course:{},
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
                            svg: 'path',
                            offTee: true,
                        },
                        {
                            uid: '1-2-2',
                            throw: 2,
                            svg: ['path', 'path'],
                            circle1: true
                        },
                        {
                            uid: '1-2-3',
                            throw: 3,
                            svg: 'path',
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

export const sampleText = {
    holes: [
        {
            text: ''
        }
    ]
}

//may need hole-round-throw order
//  and hole-round-stats (for scoring avg for the round)


export const cards = {
    "uid" : {
        uid: '',
        players: [1,2,3,4], //in order of start
        round: 1,
    },
}