Template.conversationList.helpers({
    //add you helpers here
    conversations : function () {
        return Meteor.user().profile.conversations
    },
    height : function () {
        let valeur_clientWidth = document.body.clientWidth
        if(valeur_clientWidth >1284 || valeur_clientWidth >601){
            return "100vh"
        }else {
            return toString(document.body.clientHeight -75) + "px"
        }
    }
});

Template.conversationList.events({
    //add your events here
});

Template.conversationList.onCreated(function () {
    //add your statement here
});

Template.conversationList.onRendered(function () {
    //add your statement here
    resetTooltips()
});

Template.conversationList.onDestroyed(function () {
    //add your statement here
});

