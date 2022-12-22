import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import 'firebase/firestore';
import firebase, {firestore} from "firebase/compat";
import 'firebase/auth';
import CustomButton from '../../Components/CustomButton';
import CustomInput from '../../Components/CustomInput';
import { v4 as uuidv4 } from 'uuid';

const ApartmentScreen = () => {
  const [user, setUser] = useState({ loggedIn: false });
  const [groupName, setGroupName] = useState('');
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [hasCreatedGroup, setHasCreatedGroup] = useState(false);
  const [groups, setGroups] = useState([]);
  const [groupRequests, setGroupRequests] = useState([]);
  const [currentGroup, setCurrentGroup] = useState({});
  const [currentGroupRequest, setCurrentGroupRequest] = useState({});
  const [hasBeenInvited, setHasBeenInvited] = useState(false);


  const firestore = firebase.firestore;
  const db = firebase.firestore();
  const navigation = useNavigation();

  function onAuthStateChange(callback) {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback({ loggedIn: true, user: user });
      } else {
        callback({ loggedIn: false });
      }
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const subscriber = firebase.firestore()
      .collection('users')
      .onSnapshot((querySnapshot) => {
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setUsers(documents);
      });

    return () => subscriber();
  }, []);

  useEffect(() => {
    if (user.loggedIn) {
      const groupSubscriber = firebase.firestore()
        .collection('groups')
        .where('members', 'array-contains', user.user.email)
        .onSnapshot((querySnapshot) => {
          const groupDocs = [];
          querySnapshot.forEach((doc) => {
            groupDocs.push({ ...doc.data(), id: doc.id });
          });
          setGroups(groupDocs);
        });
      return () => groupSubscriber();
    }
  }, [user]);

  useEffect(() => {
    if (user.loggedIn) {
      const requestSubscriber = firebase.firestore()
        .collection('groupRequests')
        .where('email', '==', user.user.email)
        .onSnapshot((querySnapshot) => {
          const requestDocs = [];
          querySnapshot.forEach((doc) => {
            requestDocs.push({ ...doc.data(), id: doc.id });
          });
          setGroupRequests(requestDocs);
        });
      return () => requestSubscriber();
    }
  }, [user]);

  const createGroup = () => {
    firebase
      .firestore()
      .collection('groups')
      .add({ name: groupName, members: [user.user.email] })
      .then((docRef) => {
        setHasCreatedGroup(true);
        setCurrentGroup({ id: docRef.id, name: groupName });
        console.log('Group created');
      });
  };

  
  const inviteUser = (user) => {
    firebase
      .firestore()
      .collection('groupRequests')
      .add({
        email: user.email,
        groupId: currentGroup.id,
        groupName: currentGroup.name,
      })
      .then(() => {
        console.log('Invitation sent');
        setHasBeenInvited(true);
      });
  };


  const acceptInvite = (groupRequests) => {
    // Add user's email to the list of members in the group document
    firebase
      .firestore()
      .collection('groups')
      .doc(groupRequests.groupId)
      .update({
        members: firebase.firestore.FieldValue.arrayUnion(user.user.email)
      });
    // Delete the group request document
    firebase
      .firestore()
      .collection('groupRequests')
      .doc(groupRequest.id)
      .delete();
    // Set the current group to the group the user accepted the invite for
    setCurrentGroup({ id: groupRequests.groupId, name: groupRequests.groupName });
    // Set hasBeenInvited to false
    setHasBeenInvited(false);
  };

  
  const declineInvitation = () => {
    // Delete the group request
    firebase.firestore()
      .collection('groupRequests')
      .doc(currentGroupRequest.id)
      .delete()
      .then(() => {
        console.log('Group request deleted');
        setHasBeenInvited(false);
      });
  };

  return (
<SafeAreaView>
      {!hasCreatedGroup && (
        <View>
          <Text>Create a group</Text>
          <CustomInput
            placeholder="Group name"
            onChangeText={setGroupName}
            value={groupName}
          />
          <CustomButton onPress={createGroup} title="Create" />
        </View>
      )}
      {hasCreatedGroup && (
        <View>
          <Text style={styles.InviteUsersToYourGroupText}>Invite users to your group</Text>
          <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <Text style = {styles.UsersDisplayText} >{item.email}</Text>
                <Button style = {styles.inv} onPress={() => inviteUser(item)} title="Invite" />
              </View>
            )}
          />
        </View>
      )}
      {hasBeenInvited && (
        <View>
          <Text style = {styles.InvitedToGroupText} >You have been invited to join a group: {currentGroupRequest.groupName}</Text>
          <Button style = {styles.acceptButton} onPress={() => acceptInvite()} title="Accept" />
          <Button style = {styles.declineButton} onPress={() => declineInvitation()} title="Decline" />
        </View>
      )}
      {groups.length > 0 && (
        <View>
          <Text style = {styles.YourGroupsText}>Your groups:</Text>
          <FlatList
            data={groups}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ApartmentScreen;


 /*   <SafeAreaView>
      {!hasCreatedGroup ? (
        <View>
          <CustomInput
            placeholder="Enter group name"
            value={groupName}
            onChangeText={(text) => setGroupName(text)}
            setValue = {setGroupName}
          />

          <CustomButton 
            title ="Create Group" 
            text = "Create a group"
            onPress ={createGroup}
            type ='PRIMARY'
            textStyle = {styles.createGroupButtonText}
            />

          <Text style={styles.groupRequestText}>Group Requests:</Text>

          <FlatList
          data={groupRequests}
          renderItem={({ item }) => (
            <View style={styles.requestContainer}>
              <Text style={styles.requestText}>
                {item.email} has invited you to join group {item.groupName}
              </Text>
              <CustomButton
                title="Accept"
                onPress={() => acceptInvitation(item)}
                buttonStyle={styles.acceptButton}
                textStyle={styles.buttonText}
              />
              <CustomButton
                title="Decline"
                onPress={() => declineInvitation(item)}
                buttonStyle={styles.declineButton}
                textStyle={styles.buttonText}
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
          
        </View>
      ) : (

        <View>
          <Text>{currentGroup.name}</Text>
          <FlatList
            data={users}
            renderItem={({ item }) => (
              <CustomButton
                title={item.email}
                onPress={() => inviteUser(item)}
                text = {item.email}
              />
            )}
            keyExtractor={(item) => item.id}
          />
          <Text>Invited Users:</Text>
          <FlatList
            data={invitedUsers}
            renderItem={({ item }) => <Text style = {styles.invitedUsersText}>{item.email}</Text>}
            keyExtractor={(item) => item.id}
          />
          <FlatList
          data={groups}
          renderItem={({ item }) => <Text style={styles.groupText}>{item.name}</Text>}
          keyExtractor={(item) => item.id}
          />
        <Text style={styles.groupRequestText}>Group Requests:</Text>
        <FlatList
          data={groupRequests}
          renderItem={({ item }) => (
            <View style={styles.requestContainer}>
              <Text style={styles.requestText}>
                {item.email} has invited you to join group {item.groupName}
              </Text>
              <CustomButton
                title="Accept"
                onPress={() => acceptInvitation(item)}
                buttonStyle={styles.acceptButton}
                textStyle={styles.buttonText}
              />
              <CustomButton
                title="Decline"
                onPress={() => declineInvitation(item)}
                buttonStyle={styles.declineButton}
                textStyle={styles.buttonText}
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    )}
  </SafeAreaView>
);
};*/

const styles = StyleSheet.create({
  createGroupButtonText: {
    color: '#000000',
    fontSize: 16,
    textAlign: 'center'
  },

  InviteUsersToYourGroupText:{
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  UsersDisplayText:{
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 16,
  },

  InviteButton:{
    justifyContent: 'center',
    marginTop: 15,
    width: '50%',
    padding: 10,
    backgroundColor: '#8ad24e',
    marginRight: 2,
    marginLeft: 2,
  },

InvitedToGroupText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },

YourGroupsText: {
  fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },







  groupRequestText: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold',
    color: 'Black'
  },
  requestContainer: {
    alignItems: 'center',
    
  },
  requestText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black'
  },
  invitedUsersText: {
    color: '#000000',
    fontSize: 16,
    textAlign: 'center'
  },
  acceptButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
    width: 20,
  },
  declineButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
    width: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

//export default ApartmentScreen;















