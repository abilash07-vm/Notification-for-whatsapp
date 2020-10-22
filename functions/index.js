'use strict'

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendNotification = functions.database.ref('/Notifications/{receiver_user_id}/{notification_id}')
.onWrite((data, context) =>
{
 	const receiver_user_id = context.params.receiver_user_id;
 	const notification_id = context.params.notification_id;

	console.log('We have a notification to send to :' , receiver_user_id);

	if (!data.after.val())
 	{
  	console.log('A notification has been deleted :' , notification_id);
  	return null;
 	}

	const sender_user_id = admin.database().ref(`/Notifications/${receiver_user_id}/${notification_id}/from`).once('value');
 	return sender_user_id.then(result =>
  	{
   		const senderId = result.val();
   		console.log('notification from:' ,senderId);
   		const userQuery = admin.database().ref(`/User/${senderId}/name`).once('value');
   		return userQuery.then(result =>
    	{
     		const userName = result.val();
			console.log('username:' ,userName);
  			const DeviceToken = admin.database().ref(`/User/${receiver_user_id}/device_token`).once('value');
			
		 	return DeviceToken.then(result =>
 			{
  				const token_id = result.val();
				  
				  const payload =
  					{
   						notification:
   						{
    						title: "New Chat Request",
    						body: `${userName} send to a Friend Request.`,
    						icon: "default"
   						}
  					};


  				return admin.messaging().sendToDevice(token_id, payload)
  				.then(response =>
   				{
    				console.log('This was a notification feature.');
   				});
 			});
    	});
  	});
})
exports.sendMessageNotification = functions.database.ref('/MessageNotifications/{receiver_user_id}/{notification_id}')
.onWrite((data, context) =>
{
 	const receiver_user_id = context.params.receiver_user_id;
 	const notification_id = context.params.notification_id;

	console.log('We have a notification to send to :' , receiver_user_id);

	if (!data.after.val())
 	{
  	console.log('A notification has been deleted :' , notification_id);
  	return null;
 	}

	const sender_user_id = admin.database().ref(`/MessageNotifications/${receiver_user_id}/${notification_id}/from`).once('value');
 	return sender_user_id.then(result =>
  	{
   		const senderId = result.val();
   		console.log('notification from:' ,senderId);
   		const userQuery = admin.database().ref(`/User/${senderId}/name`).once('value');
   		return userQuery.then(result =>
    	{
     		const userName = result.val();
			console.log('username:' ,userName);

			const userQuery2 = admin.database().ref(`/MessageNotifications/${receiver_user_id}/${notification_id}/message`).once('value');
   			return userQuery2.then(result =>
    		{
     			const message = result.val();
				console.log('message:' ,message);

  				const DeviceToken = admin.database().ref(`/User/${receiver_user_id}/device_token`).once('value');
			
		 		return DeviceToken.then(result =>
 				{
  					const token_id = result.val();
				  
				  	const payload =
  					{
   						notification:
   						{
    						title: `New Message from ${userName}`,
    						body: `${message}`,
    						icon: "default"
   						}
  					};


  					return admin.messaging().sendToDevice(token_id, payload)
  					.then(response =>
   					{
    					console.log('This was a notification feature.');
					});
				});
 			});
    	});
  	});
})
exports.sendGroupMessageNotification = functions.database.ref('/GroupNotifications/{receiver_user_id}/{notification_id}')
.onWrite((data, context) =>
{
 	const receiver_user_id = context.params.receiver_user_id;
 	const notification_id = context.params.notification_id;

	console.log('We have a notification to send to :' , receiver_user_id);

	if (!data.after.val())
 	{
  	console.log('A notification has been deleted :' , notification_id);
  	return null;
 	}

	const sender_user_id = admin.database().ref(`/GroupNotifications/${receiver_user_id}/${notification_id}/from`).once('value');
 	return sender_user_id.then(result =>
  	{
   		const senderId = result.val();
   		console.log('notification from:' ,senderId);
   		const userQuery = admin.database().ref(`/User/${senderId}/name`).once('value');
   		return userQuery.then(result =>
    	{
     		const userName = result.val();
			console.log('username:' ,userName);

			const userQuery2 = admin.database().ref(`/GroupNotifications/${receiver_user_id}/${notification_id}/message`).once('value');
   			return userQuery2.then(result =>
    		{
     			const message = result.val();
				console.log('message:' ,message);
				const userQuery3 = admin.database().ref(`/GroupNotifications/${receiver_user_id}/${notification_id}/grpName`).once('value');
				return userQuery3.then(result => 
					{
						const grpName=result.val();
						console.log('group Name',grpName);
						const DeviceToken = admin.database().ref(`/User/${receiver_user_id}/device_token`).once('value');
			
		 		return DeviceToken.then(result =>
 				{
  					const token_id = result.val();
				  
				  	const payload =
  					{
   						notification:
   						{
    						title: `New Message from ${userName} in ${grpName} Group`,
    						body: `${message}`,
    						icon: "default"
   						}
  					};


  					return admin.messaging().sendToDevice(token_id, payload)
  					.then(response =>
   					{
    					console.log('This was a notification feature.');
					});
				});
					})

  				
 			});
    	});
  	});
})
exports.sendFeedBackNotification = functions.database.ref('/FeedbackNotifications/{receiver_user_id}/{notification_id}')
.onWrite((data, context) =>
{
 	const receiver_user_id = context.params.receiver_user_id;
 	const notification_id = context.params.notification_id;

	console.log('We have a notification to send to :' , receiver_user_id);

	if (!data.after.val())
 	{
  	console.log('A notification has been deleted :' , notification_id);
  	return null;
 	}

	const sender_user_id = admin.database().ref(`/FeedbackNotifications/${receiver_user_id}/${notification_id}/from`).once('value');
 	return sender_user_id.then(result =>
  	{
   		const senderId = result.val();
   		console.log('notification from:' ,senderId);
   		const userQuery = admin.database().ref(`/User/${senderId}/name`).once('value');
   		return userQuery.then(result =>
    	{
     		const userName = result.val();
			console.log('username:' ,userName);

			const DeviceToken = admin.database().ref(`/User/${receiver_user_id}/device_token`).once('value');
						return DeviceToken.then(result =>
							{
								 const token_id = result.val();
							 
								 const payload =
								 {
									  notification:
									  {
									   title: `New Feedback `,
									   body: `from ${userName}`,
									   icon: "default"
									  }
								 };
		   
		   
								 return admin.messaging().sendToDevice(token_id, payload)
								 .then(response =>
								  {
								   console.log('This was a notification feature.');
							   });
						   });
		 		
    	});
  	});
})
