"use strict";

var Pushover = require('pushover-notifications');

const MESSAGE_RETRY = 60;
const MESSAGE_EXPIRE = 3600;

module.exports = class PushOverMessenger {
    constructor(pushoverUser, pushoverToken, messageTitle, messageText, messagePriority, messageSound) {
        this.pushover_user = pushoverUser
        this.pushover_token = pushoverToken
        this.message_title = messageTitle
        this.message_text = messageText
        this.message_priority = messagePriority
        this.message_sound = messageSound

        if (!this.pushover_user)
            throw new Error(this.message_title + " : User cannot be empty");

        if (!this.pushover_token)
            throw new Error(this.message_title + " : Token cannot be empty");

        if (!this.message_title)
            throw new Error(this.message_title + " : Message title cannot be empty");

        if (!this.message_text)
            throw new Error(this.message_title + " : Message text cannot be empty");

        if (![-2, -1, 0 , 1, 2].includes(this.message_priority))
            throw new Error(this.message_title + " : Invalid priority value " + this.message_priority);

        if (!["pushover", "bike", "bugle", "cashregister", "classical", "cosmic", "falling", "gamelan", 
                "incoming", "intermission", "magic", "mechanical", "pianobar", "siren", "spacealarm", "tugboat", 
                "alien", "climb", "persistent", "echo", "updown", "none"].includes(this.message_sound))
            this.message_sound = "pushover";
    }

    getRecipient() {
        return this.pushover_token
    }

    sendMessage() {
        var p = new Pushover( {
            user: this.pushover_user,
            token: this.pushover_token,
        })
        
        var msg = {
            message: this.message_text,
            title: this.message_title,
            priority: this.message_priority,
            sound : this.message_sound,
            retry : MESSAGE_RETRY,
            expire: MESSAGE_EXPIRE
        }

        p.send(msg, function(error, result) {
            if (error)
                throw new Error(error);
        })   
    }     
    
}