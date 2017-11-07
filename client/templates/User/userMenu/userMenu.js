import User from '/imports/classes/User';

/********************************
 * ensemble des helpers permettant de renvoyer des
 * valeurs particulières au menu contextuel
 */
Template.userMenu.helpers({
    //titre affiché
    userId : function () {
        return Template.currentData()._id
    },
    title: function () {

        return Template.currentData().username
    },
    //nom de la page pour pouvoir utiliser le "is active path"
    contextualHomepage : function () {
        return 'userMainPage'
    },
    //couleur du sous menu
    color: function () {
        return 'green'
    },
    //image a faire afficher
    imgUrl: function () {
        let url = Template.currentData().user.profile.imgUrl;
        //si c'est pas l'image par défault, on fais une requete de miniature vers l'api d'imgur
        if (url !== "/images/icon/user_icon.png") {
            return Imgur.toThumbnail(url, Imgur.SMALL_THUMBNAIL)
        } else {
            return url
        }
    },
    //on transmet le path  vers lequel ca doir renvoyer
    path: function () {
        return Router.path("userMainPage", {_id: Template.currentData().user._id})
    },
    //tableau des elements a renvoyer a la barre de navigation
    navBarItems: function () {
        if(Template.currentData().user._id === Meteor.userId()) {

            let navBarItems = [
                {
                    title: "Editer profil",
                    color: "green",
                    routeName: "userSelfProfile",
                    path: function () {
                        return Router.path("userSelfProfile")
                    }
                },
                {
                    title: "Projets",
                    color: "green",
                    routeName: "userSelfProjects",
                    path: function () {
                        return Router.path("userSelfProjects")
                    }
                },
                {
                    title: "Blog",
                    color: "green",
                    routeName: "userSelfBlog",
                    path: function () {
                        return Router.path("userSelfBlog")
                    }
                }

            ]
            return navBarItems
        }
    },
    //helper verifiant si on doit aficher la navbar ou les boutons d'interaction
    showNavbar : function () {
        return Meteor.userId() === Template.instance().user._id
    }


});

Template.projectMenu.events({
    //add your events here

});

Template.projectMenu.onCreated(function () {

});

Template.projectMenu.onRendered(function () {
    //add your statement here

});

Template.projectMenu.onDestroyed(function () {
    //add your statement here
});



