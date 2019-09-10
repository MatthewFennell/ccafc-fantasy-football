const admin = require('firebase-admin');
const functions = require('firebase-functions');
const commonFunctions = require('./common');

const db = admin.firestore();

exports.addPlayerToActiveTeam = functions
    .region('europe-west2')
    .https.onCall((data, context) => {
        commonFunctions.isAuthenticated(context);
        const usersActiveTeam = db.collection('active-teams')
            .where('user_id', '==', context.auth.uid);
        const playerRef = db.collection('players').doc(data.playerId);
        return playerRef.get().then(player => (player.exists ? usersActiveTeam.get()
            .then(querySnapshot => {
                querySnapshot.docs.map(doc => db.collection('active-teams').doc(doc.id)
                    .update({
                        player_ids: admin.firestore.FieldValue.arrayUnion(data.playerId)
                    })
                    .then(() => db.collection('active-teams').doc(doc.id).collection('players').add({
                        name: player.data().name,
                        position: player.data().position,
                        price: player.data().price,
                        team: player.data().team,
                        player_id: data.playerId
                    })));
            })
            : false));
    });
