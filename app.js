'use strict';
var _ = require('lodash');
const fs = require('fs');

let holdersJson = fs.readFileSync('gib-holders.json');
let holders = JSON.parse(holdersJson);

let dbJson = fs.readFileSync('oikattoi-default-rtdb-export.json');
let db = JSON.parse(dbJson);

let votes = [0, 0, 0, 0, 0, 0, 0, 0];

for (const wallet in db.wallets) {
    if (Object.hasOwnProperty.call(db.wallets, wallet)) {
        const element = db.wallets[wallet];
        const nfts = _.pick(holders, [wallet]);
        if (nfts && nfts[wallet]) {
            const amount = nfts[wallet].amount;
            if (votes[element.choiceId]) {
                votes[element.choiceId] += amount;
            } else {
                votes[element.choiceId] = amount;
            }
        } else {
            console.log("Wallet not found", wallet);
        }
    }
}

console.log(votes);