import EventEmitter from 'node:events';
import { WebSocket } from 'ws';

export const Memory = new EventEmitter()

const wss = new WebSocket('ws://127.0.0.1:24050/ws');

const events = {
    SONG_CHANGE: "songChange",
    SCORE_SUBMIT: "scoreSubmit",
    OPENED_CHAT: "openedChat",
    ENTERED_GAMEPLAY: "enteredGameplay",
    UPDATE: "update"
}

export const Events = events

wss.on('error', console.error);

let lastPacket = null
let packet = null

wss.on('message', function message(data) {
    packet = JSON.parse(data)

    if (lastPacket == null) {
        lastPacket = packet
    }

    if (lastPacket.menu.bm.md5 != packet.menu.bm.md5) {
        Memory.emit(events.SONG_CHANGE, packet)
    }

    Memory.emit(events.UPDATE, packet)

    lastPacket = packet
});

export function getCurrentPacket() {
    return packet
}