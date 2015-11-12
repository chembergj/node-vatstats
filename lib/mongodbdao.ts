/// <reference path='../typings/mongodb/mongodb.d.ts' />

import mongodb = require("mongodb");

var url = 'mongodb://localhost:27017/vatstats';
var collection_onlineclients = 'onlineclients';

export interface OnlineClient {
    _id: string;
    callsign: string;
    CID: number;
    realname: string;
    clienttype: string;
    frequency: string;
    latitude: number;
    longitude: number;
    rating: number;
    facilitytype: number;
    time_logon: number;
};

export interface OnlinePilot extends OnlineClient {
    altitude: number;
    groundspeed: number;
    planned_aircraft: string;
    planned_depairport: string;
    planned_altitude: number;
    planned_destairport: string;
    planned_flighttype: string;
    planned_altairport: string;
    planned_remarks: string;
    planned_route: string;
    heading: string;
}

export interface OnlineAtc extends OnlineClient {
    atis_message: string;
}

export function getOnlineClients(callback: (err: Error, clients: OnlineClient[]) => void) {

    mongodb.MongoClient.connect(url, (err, db) => {
        if (err != null) {
            callback(err, null);
        }

        db.collection(collection_onlineclients, (error, clients_collection) => {
            clients_collection.count((error, result) => { console.log(result); });
            if (error) { console.log('getOnlineClients error'); callback(error, null); }
            clients_collection.find().toArray(callback);
        });
    });
}
    
// For unittest usage
export function deleteAllOnlineClients(callback: () => void) {

    mongodb.MongoClient.connect(url, (err, db) => {
        if (err != null) {
            console.error(err); return;
        }
        db.collection('onlineclients', (error, clients_collection) => {
            if (error) { console.error(error); return; }
            clients_collection.drop(function(error, result) {
                if (error) { console.error(error); return; }
                callback();
            });
        });
    });
}
